<div class={pageClasses}>
  <PageTitle text={title} />
  <!-- eslint-disable-next-line max-len -->
  This is a showcase project to provide an idea on how articles management can be done. Please refer to the <a href={linkGithub} class="text-primary hover:underline">repo</a> file for more information.
</div>

<script>
  import PageTitle from '$components/PageTitle.svelte';
  import { pageClasses } from '$data/css-classes';
  import { linkGithub } from '$data/links';
  import { mainNameShort } from '$data/strings';
  import { setPageData } from '$lib/stores/layout-store';

  const title = 'About ' + mainNameShort;

  setPageData(
    [{ label: title, href: '' }]
  );
</script>
