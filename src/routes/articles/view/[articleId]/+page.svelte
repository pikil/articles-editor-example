{#if error}
  <div class="pt-6 text-center">{error}</div>
{:else if !article}
  <PageLoader />
{:else}
  <div class={pageClasses}>
    <div class="flex flex-row">
      <PageTitle text={article.title} class="flex-1 ellipsis" />
      {#if isEditor}
        <div>
          <IconButton href={'/articles/edit/' + article.id} icon={fasPencil} />
        </div>
      {/if}
    </div>
    <p class="bg-gray-500/10 rounded-lg p-3 italic mb-4">{article.text}</p>
    <div class={metaClasses}>
      <div>Created:</div>
      <div>{new Date(article.createdAt).toString()}</div>
    </div>
    <div class={metaClasses}>
      <div>Status:</div>
      {#if isModerator}
        <Select bind:value={article.status} options={statusOptions} oninput={updateStatus} />
      {:else}
        {status}
      {/if}
      {#if statusUpdated}
        <div transition:fade={transitionParams} class="text-green-500">Updated!</div>
      {/if}
    </div>
  </div>
{/if}

<script lang="ts">
  import { page } from '$app/state';
  import PageLoader from '$components/PageLoader.svelte';
  import PageTitle from '$components/PageTitle.svelte';
  import IconButton from '$components/ui/buttons/IconButton.svelte';
  import Select from '$components/ui/Select.svelte';
  import { pageClasses } from '$data/css-classes';
  import { linkArticles } from '$data/links';
  import { role, statuses } from '$data/user-values';
  import { get, post } from '$lib/http';
  import { setPageData } from '$lib/stores/layout-store';
  import { userRole, userSid } from '$lib/stores/user-store';
  import type { Article } from '$lib/utils/db';
  import { fasPencil } from '$lib/vendor/icons/fontawesome6-icons';
  import { onMount } from 'svelte';
  import { quintInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  const metaClasses = 'text-sm text-faded mt-2 flex flex-row items-center gap-2';
  const statusOptions = statuses.map((label, value) => {
    return { label, value };
  });
  const transitionParams = {
    duration: 200,
    easing: quintInOut
  };

  let article = $state<Article | null>(null);
  let error = $state<string>('');
  let statusUpdated = $state<boolean>(false);

  const loadArticle = async () => {
    const { success, message } = await get('article/load?id=' + page.params.articleId);

    if (success) {
      article = JSON.parse(message);

      if (article)
        setPageData([
          { label: 'Articles', href: linkArticles },
          { label: article.title, href: '' }
        ]);
    }
    else {
      error = message;
    }
  };

  const updateStatus = async (s: string | number) => {
    const { success, message } = await post('article/update-status', { id: String(article?.id), status: String(s) });

    if (success) {
      statusUpdated = true;

      setTimeout(() => {
        statusUpdated = false;
      }, 2500);
    }
    else {
      console.error(message); // eslint-disable-line no-console
    }
  };

  let isEditor = $derived(article?.author === $userSid || $userRole === role.EDITOR);
  let isModerator = $derived($userRole === role.MODERATOR);
  let status = $derived(article ? statuses[article.status] : 'Unknown');

  setPageData([
    { label: 'Articles', href: linkArticles },
    { label: 'Loading...', href: '' }
  ]);

  onMount(loadArticle);
</script>
