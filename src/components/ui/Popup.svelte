{#if showing}
  <div bind:this={popup} class={classes} {style}>
    {#if outsideclick}
      <div
        role="button"
        tabindex="0"
        class="fixed w-screen h-screen top-0 left-0 z-50"
        onclick={outsideclick.bind(null)}
        onkeypress={outsideclick.bind(null)}
      ></div>
    {/if}
    <div class="relative z-60">{@render children?.()}</div>
  </div>
{/if}
<script lang="ts">
  interface Props {
    showing: boolean;
    outsideclick?: () => void;
    class?: string;
    children?: import('svelte').Snippet<[]>;
  }

  let {
    showing,
    outsideclick,
    class: klass,
    children
  }: Props = $props();

  let style = $state<string>('');
  let popup = $state<HTMLDivElement | null>(null);

  let classes = $derived('absolute pop-in border border-gray-100 dark:border-gray-700'
    + ' rounded-xl shadow-lg bg-surface shadow-gray-400/50 dark:shadow-gray-800 overflow-hidden'
    + (klass ? ' ' + klass : '')
  );

  $effect(() => {
    if (!popup)
      return;

    style = '';

    if (showing) {
      const { bottom, height, left } = popup.getBoundingClientRect();
      const { innerHeight } = window;

      setTimeout(() => {
        if (height > innerHeight) {
          style += 'max-height: calc(100vh - 20px);top:10px;position:fixed;left:' + left + 'px;overflow:scroll';
        } else if (bottom > innerHeight) {
          const maxHeight = height - (bottom - innerHeight);

          if (popup)
            style += (maxHeight < height / 3)
              ? 'bottom: ' + getComputedStyle(popup).getPropertyValue('top') + ';top:auto;'
              : 'max-height: calc(' + maxHeight + 'px);overflow:scroll';
        }
      }, 0);
    }
  });
</script>
