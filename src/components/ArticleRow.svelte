<div class="article-row">
  {#if !isFirst}
    <hr class="border-gray-500/30" />
  {/if}
  <div class="p-4 flex flex-row items-center gap-2">
    <div class="ellipsis flex-1">
      <div class="flex flex-row gap-2 items-center">
        <p class="text-faded text-xs">#{article.id}</p>
        <p class="font-bold ellipsis">
          <a href={viewLink}>{article.title}</a>
        </p>
      </div>
      <p class="ellipsis text-faded">{article.text}</p>
    </div>
    <IconButton href={viewLink} icon={fasEye} class="text-primary" />
    {#if isEditor}
      <IconButton href={editLink} icon={fasPencil} class="text-gray-700 dark:text-gray-300" />
      <IconButton icon={fasTrash} class="text-red-500/80" loading={removing} onclick={removeArticle} />
    {/if}
  </div>
</div>

<script lang="ts">
  import type { Article } from '$lib/utils/db';
  import { userRole, userSid } from '$lib/stores/user-store';
  import IconButton from './ui/buttons/IconButton.svelte';
  import { fasEye, fasPencil, fasTrash } from '$lib/vendor/icons/fontawesome6-icons';
  import { post } from '$lib/http';
  import { role } from '$data/user-values';

  interface Props {
    article: Article;
    isFirst: boolean;
    onremove: () => void;
  }

  let { article, isFirst, onremove }: Props = $props();

  let removing = $state<boolean>();

  let isEditor = $derived(article.author === $userSid || $userRole === role.EDITOR );
  let viewLink = $derived('/articles/view/' + article.id);
  let editLink = $derived('/articles/edit/' + article.id);

  const removeArticle = async () => {
    if (removing)
      return;

    removing = true;

    const { success, message } = await post('article/delete', { id: String(article.id) });

    if (success)
      onremove();
    else
      console.error(message); // eslint-disable-line no-console

    removing = false;
  };
</script>
