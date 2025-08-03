<div class={pageClasses}>
  <div class="flex flex-row">
    <PageTitle text={title} class="flex-1" />
    <div>
      <Select
        bind:value={filterStatus}
        options={statusOptions}
        placeholder="Status..."
        placeholderValue={-1}
        class="scale-75 relative -top-2"
        oninput={(e) => { onFilterInput.call(e); }}
      />
    </div>
    <div class="pt-1 relative">
      <Icon name={fasMagnifyingGlass} class="h-3.5 w-3.5 text-faded/60 absolute top-2.5 pointer-events-none" />
      <input
        bind:value={filterTxt}
        placeholder="Search..."
        class="text-sm outline-none w-30 pl-6 text-faded"
        oninput={(e) => { onFilterInput.call(e); }}
        maxlength="50"
      />
    </div>
  </div>
  <div class="rounded-lg border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
    {#if articles.length}
      {#each articles as article, i (article.id)}
        <ArticleRow {article} isFirst={!i} onremove={dropArticleFromList.bind(null, article.id || 0)} />
      {/each}
    {:else if allLoaded}
      <div class="text-center py-4">No articles found...</div>
      <div class="flex flex-row justify-center py-4">
        <Button href={linkArticlesNew} label="Add new" icon={fasPlus} class={primaryBtnClasses} />
      </div>
    {/if}
    {#if error}
      <div class="text-center text-red-500 py-4">{error}</div>
    {/if}
    <InfiniteFetcher class="py-4" onvisible={loadArticles} disabled={allLoaded} />
  </div>
</div>

<script lang="ts">
  import ArticleRow from '$components/ArticleRow.svelte';
  import PageTitle from '$components/PageTitle.svelte';
  import Button from '$components/ui/buttons/Button.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import InfiniteFetcher from '$components/ui/InfiniteFetcher.svelte';
  import Select from '$components/ui/Select.svelte';
  import { pageClasses, primaryBtnClasses } from '$data/css-classes';
  import { linkArticlesNew } from '$data/links';
  import { perPage } from '$data/numbers';
  import { statuses } from '$data/user-values';
  import { get } from '$lib/http';
  import { setPageData } from '$lib/stores/layout-store';
  import { type Article } from '$lib/utils/db';
  import debounce from '$lib/utils/debounce';
  import { fasMagnifyingGlass, fasPlus } from '$lib/vendor/icons/fontawesome6-icons';
  import { onMount } from 'svelte';

  interface Props {
    title: string;
    url: string;
  }

  const statusOptions = statuses.map((label, value) => {
    return { label, value };
  });

  let { title, url }: Props = $props();

  let articles = $state<Article[]>([]);
  let allLoaded = $state<boolean>(false);
  let loading = $state<boolean>(false);
  let error = $state<string>('');
  let page = $state<number>(1);
  let filterTxt = $state<string>('');
  let filterStatus = $state<number>(-1);

  const loadArticles = async () => {
    if (allLoaded || loading) {
      return;
    }

    loading = true;

    const { success, message } = await get(url
      + '?p=' + page
      + (filterTxt.length > 2 ? '&t=' + encodeURIComponent(filterTxt) : '')
      + (filterStatus >= 0 ? '&s=' + filterStatus : '')
    );

    if (!success) {
      allLoaded = true;
      error = 'Network error...';
    }

    loading = false;

    try {
      const arr = JSON.parse(message) || [];

      if (arr.length < perPage)
        allLoaded = true;

      articles.push(...arr);
      page++;
    } catch (e) {
      console.log('Response is incorrect...', e); // eslint-disable-line no-console
      allLoaded = true;
      error = 'Invalid data...';
    }
  };

  const resetList = () => {
    articles = [];
    allLoaded = false;
    page = 1;
    loadArticles();
  };

  const onFilterInput = debounce('search', () => {
    if (filterTxt.length > 2 || !filterTxt.length)
      resetList();
  }, 600);

  const dropArticleFromList = (id: number) => {
    articles = articles.filter(article => article.id !== id);
  };

  setPageData(
    [{ label: title, href: '' }]
  );

  onMount(loadArticles);
</script>
