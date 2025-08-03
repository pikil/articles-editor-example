<ArticleEditor title="Edt article" {id} />

<script>
  import { page } from '$app/state';
  import ArticleEditor from '$components/pages/ArticleEditor.svelte';

  let id = $derived(parseInt(page.params.articleId || '0'));
</script>
