{#if !disabled}
  <div bind:this={container} class={classes}>
    <Icon name={evaLoaderOutline} class="h-6 w-6 text-faded animate-spin" />
  </div>
{/if}
<script lang="ts">
  import { isInViewport } from '$lib/utils/dom';
  import { onDestroy, onMount, tick } from 'svelte';
  import Icon from '$components/ui/Icon.svelte';
  import { evaLoaderOutline } from '$lib/vendor/icons/eva-icons';

  interface Props {
    disabled?: boolean;
    onvisible?: () => void;
    class?: string;
  }

  let {
    disabled = false,
    onvisible,
    class: klass
  }: Props = $props();

  let container = $state<HTMLElement | null>(null);

  export const trigger = async () => {
    if (disabled)
      return;

    await tick();

    if (container && onvisible && isInViewport(container))
      onvisible();
  };

  let classes = $derived('flex flex-row justify-center'
    + (klass ? ' ' + klass : '')
  );

  onMount(() => {
    if (!container)
      return;

    document.addEventListener('scroll', trigger);
    document.addEventListener('resize', trigger);
  });

  onDestroy(() => {
    document.removeEventListener('scroll', trigger);
    document.removeEventListener('resize', trigger);
  });
</script>
