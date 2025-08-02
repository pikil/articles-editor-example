{#snippet content()}
  {#if loading}
    <span class={loaderClass}>
      {#if typeof loading === 'string'}
        {loading}
      {:else}
        <Icon name={fasSpinner} class="h-4 w-4 animate-spin opacity-50" />
      {/if}
    </span>
  {/if}
  {#if label}
    <span>{label}</span>
  {:else}
    {@render children?.()}
  {/if}
{/snippet}

{#if href}
  <a bind:this={btn} {href} {title} class={classes} onclick={onclick.bind(null)}>
    {@render content()}
  </a>
{:else}
  <button bind:this={btn} {title} class={classes} {disabled} onclick={onclick.bind(null)}>
    {@render content()}
  </button>
{/if}
<script lang="ts">
  import { noop } from '$lib/utils';
  import { fasSpinner } from '$lib/vendor/icons/fontawesome6-icons';
  import Icon from '$components/ui/Icon.svelte';

  const loaderClass = 'loading-content absolute top-0 left-0 w-full h-full bg-inherit grid place-items-center rounded-lg';

  interface Props {
    label?: string;
    title?: string;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    onclick?: () => void;
    class?: string;
    children?: import('svelte').Snippet<[]>;
  }

  /** @type {Props} */
  let {
    label = '',
    title = '',
    href = '',
    disabled = false,
    loading = false,
    onclick = noop,
    class: klass,
    children
  }: Props = $props();

  let btn: HTMLButtonElement | HTMLAnchorElement | null = $state(null);

  let loadingClasses = $derived(loading ? ' btn-loading relative' : '');
  let classes = $derived('transition-colors rounded-lg select-none py-2 px-4 cursor-pointer'
    + (disabled ? ' opacity-50 pointer-events-none cursor-not-allowed' : '')
    + (klass ? ' ' + klass : '')
    + loadingClasses
  );
</script>
