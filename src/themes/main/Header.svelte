<header class={classes}>
  <div class="flex flex-row items-center rounded-lg bg-primary/20 p-4 shadow-md shadow-gray-300 dark:shadow-gray-700">
    <div class="flex-1 flex flex-row items-center ellipsis text-primary italic">
      <a href="/" title="Main page" class="font-bold">{mainNameShort}</a>
      <Icon name={fasCircle} class="h-1 w-1 mx-4" />
      <div class="flex-1 ellipsis text-xs">{mainName}</div>
    </div>
    <IconButton icon={fasBars} />
  </div>
</header>

<script lang="ts">
  import { mainName, mainNameShort } from '$data/strings';
  import { fasBars, fasCircle } from '$lib/vendor/icons/fontawesome6-icons';
  import IconButton from '$components/ui/buttons/IconButton.svelte';
  import Icon from '$components/ui/Icon.svelte';

  let classes = $derived('px-2 pt-2 transition-padding');
</script>
