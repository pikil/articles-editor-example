<div class={pageClasses}>
  <PageTitle text={title} />
  This is a test example to show how Svelte 5 works with datasets and stores.
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
