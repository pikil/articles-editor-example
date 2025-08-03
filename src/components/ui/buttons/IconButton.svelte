{#snippet content()}
  {#if loading}
    <Icon name={fasSpinner} class={iconClass + ' animate-spin opacity-50'} />
  {:else if icon}
    <Icon name={icon} class={iconClass} />
  {/if}
{/snippet}

{#if href}
  <a bind:this={btn} {href} {title} {target} class={classes} onclick={onclick.bind(null)}>
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

  interface Props {
    icon: string;
    iconClass?: string;
    title?: string;
    href?: string;
    disabled?: boolean;
    loading?: boolean | string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    onclick?: () => void;
    class?: string;
  }

  let {
    icon,
    iconClass = 'h-4 w-4',
    title = '',
    href = '',
    disabled = false,
    loading = false,
    target,
    onclick = noop,
    class: klass
  }: Props = $props();

  let btn = $state<HTMLButtonElement | (HTMLAnchorElement | null)>(null);

  let loadingClasses = $derived(loading ? ' pointer-events-none' : '');
  let classes = $derived('transition-colors rounded-lg select-none cursor-pointer p-2 flex hover:bg-gray-300/30'
    + (disabled ? ' opacity-50 pointer-events-none cursor-not-allowed' : '')
    + (klass ? ' ' + klass : '')
    + loadingClasses
  );
</script>
