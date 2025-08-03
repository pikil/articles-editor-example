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
  {#if icon}
    <Icon name={icon} class={iconClass} />
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
    icon?: string;
    iconClass?: string;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    onclick?: () => void;
    class?: string;
    children?: import('svelte').Snippet<[]>;
  }

  let {
    label,
    title,
    icon,
    iconClass = 'h-4 w-4',
    href,
    disabled = false,
    loading = false,
    onclick = noop,
    class: klass,
    children
  }: Props = $props();

  let btn = $state<HTMLButtonElement | HTMLAnchorElement | null>(null);

  let loadingClasses = $derived(loading ? ' btn-loading relative' : '');
  let classes = $derived('transition-colors rounded-lg select-none py-2 px-4 cursor-pointer'
    + (icon ? ' flex flex-row items-center gap-2' : '')
    + (disabled ? ' opacity-50 pointer-events-none cursor-not-allowed' : '')
    + (klass ? ' ' + klass : '')
    + loadingClasses
  );
</script>
