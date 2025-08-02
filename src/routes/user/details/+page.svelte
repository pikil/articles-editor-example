<div class={pageClasses}>
  {$pageTitle}
</div>

<script lang="ts">
  import { pageTitle, setPageData } from '$lib/stores/layout-store';
  import { pageClasses } from '$data/css-classes';

  const title = 'User details';

  setPageData(
    [{ label: title, href: '' }]
  );
</script>
