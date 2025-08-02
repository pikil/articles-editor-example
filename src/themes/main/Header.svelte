<header class={classes}>
  <div class="flex flex-row items-center rounded-lg bg-lime-400/30 p-4 shadow-md shadow-gray-300">
    <div class="flex-1 flex flex-row items-center ellipsis">
      <a href="/" title="Main page" class="font-bold">{mainNameShort}</a>
      <Icon name={biChevronRight} class="text-faded h-3 w-3 mx-4" />
      <div class="flex-1 text-faded ellipsis text-sm">{subtitle}</div>
    </div>
    <IconButton icon={fasBars} />
  </div>
</header>

<script lang="ts">
  import { mainNameShort } from '$data/strings';
  import { pageTitle } from '$lib/stores/layout-store';
  import { biChevronRight } from '$lib/vendor/icons/bootstrap-icons';
  import { fasBars } from '$lib/vendor/icons/fontawesome6-icons';
  import IconButton from '$ui/buttons/IconButton.svelte';
  import Icon from '$ui/Icon.svelte';

  let classes = $derived('p-2 transition-padding');
  let subtitle = $derived($pageTitle === mainNameShort ? 'Dashboard' : $pageTitle);
</script>
