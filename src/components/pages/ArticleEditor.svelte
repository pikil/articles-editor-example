{#if loading}
  <PageLoader />
{:else if loadError}
  <div class="pt-6 text-center">{loadError}</div>
{:else}
  <div class={pageClasses}>
    <PageTitle text={title} />
    <Input
      bind:value={articleTitle}
      maxlength={maxTitleLen}
      placeholder="Enter the article title..."
      label="Title" class="w-full"
      onenter={textarea?.focus.bind(textarea)}
    />
    <p class="mt-6 mb-2 text-sm font-bold">Text</p>
    <textarea
      bind:this={textarea}
      bind:value={articleText}
      class="w-full border-1 border-gray-200 dark:border-gray-400 rounded-lg min-h-56 p-3"
      placeholder="Enter article text..."
      onkeydown={onTextareaKey}
    ></textarea>
    <div class="pt-6">
      <Button label={saveLabel} class={primaryBtnClasses} {disabled} loading={saving} onclick={save} />
      {#if error}
        <span class="text-red-500 ml-4">{error}</span>
      {/if}
    </div>
  </div>
{/if}

<script lang="ts">
  import { goto } from '$app/navigation';
  import PageLoader from '$components/PageLoader.svelte';
  import PageTitle from '$components/PageTitle.svelte';
  import Button from '$components/ui/buttons/Button.svelte';
  import Input from '$components/ui/Input.svelte';
  import { pageClasses, primaryBtnClasses } from '$data/css-classes';
  import { get, post } from '$lib/http';
  import { maxTitleLen, maxTxtLen, minTxtLen } from '$data/numbers';
  import { setPageData } from '$lib/stores/layout-store';
  import { onMount } from 'svelte';
  import { linkArticles } from '$data/links';
  import { path } from '$lib/utils';

  interface Props {
    id?: number;
    title: string;
  }

  let {
    id,
    title
  }: Props = $props();

  let articleTitle = $state<string>('');
  let articleText = $state<string>('');
  let error = $state<string>('');
  let saving = $state<boolean>(false);
  let loading = $state<boolean>(false);
  let loadError = $state<string>('');
  let textarea = $state<HTMLTextAreaElement | null>(null);

  const save = async () => {
    saving = true;

    const { success, message } = await post(
      (id) ? 'article/update' : 'article/save',
      {
        id: String(id || 0),
        title: articleTitle,
        text: articleText
      }
    );

    if (success) {
      goto(path('/articles/view/' + (id ? id : message)));
      return;
    }

    saving = false;
    error = message;
  };

  const loadArticleData = async () => {
    if (loading)
      return;

    loading = true;
    const { success, message } = await get('article/load?id=' + id);

    if (success) {
      const article = JSON.parse(message);

      articleText = article.text;
      articleTitle = article.title;
    }
    else {
      loadError = message;
    }

    loading = false;
  };

  const onTextareaKey = (evt: KeyboardEvent) => {
    if (!evt.metaKey)
      return;

    switch (evt.key) {
      case 'Enter':
        save();
        evt.preventDefault();
        break;
      default:
        break;
    }
  };

  let disabled = $derived(saving
    || articleTitle.length < minTxtLen
    || articleText.length < minTxtLen
    || articleTitle.length > maxTitleLen
    || articleText.length > maxTxtLen
  );
  let saveLabel = $derived((id) ? 'Update' : 'Save');

  setPageData([
    { label: 'Articles', href: linkArticles },
    { label: title, href: '' }
  ]);

  onMount(() => {
    if (id)
      loadArticleData();
  });
</script>
