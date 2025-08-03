{#if showing}
  <div
    use:portal
    transition:fade={transitionParams}
    id="backdrop"
    role="button"
    tabindex="0"
    class="fixed z-40 inset-0 backdrop-brightness-85 dark:backdrop-brightness-50 backdrop-blur-md transition-[backdrop-filter] duration-600"
    {onclick}
    onkeypress={onclick}
  ></div>
{/if}
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { portal } from '$lib/utils/dom';
  import { quintInOut } from 'svelte/easing';
  import { noop } from '$lib/utils';

  const transitionParams = Object.freeze({
    duration: 150,
    easing: quintInOut
  });

  interface Props {
    showing?: boolean;
    onclick?: () => void;
  }

  let { showing = false, onclick = noop }: Props = $props();

</script>
