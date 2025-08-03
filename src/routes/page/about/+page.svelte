<div class={pageClasses}>
  <PageTitle text={title} />
  <!-- eslint-disable-next-line max-len -->
  This is a showcase project to provide an idea on how articles management can be done. Please refer to the <a href="https://github.com/pikil/articles-editor-example/README.md" class="text-primary hover:underline">README</a> file for more information.
</div>

<script>
  import PageTitle from '$components/PageTitle.svelte';
  import { pageClasses } from '$data/css-classes';
  import { mainNameShort } from '$data/strings';
  import { setPageData } from '$lib/stores/layout-store';

  const title = 'About ' + mainNameShort;

  setPageData(
    [{ label: title, href: '' }]
  );
</script>
