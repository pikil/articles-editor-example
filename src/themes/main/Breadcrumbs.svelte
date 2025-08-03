<div class="flex flex-row items-center text-sm text-faded ellipsis w-full max-w-3xl mx-auto mt-4">
  <Button label="Dashboard" href="/" icon={biChevronLeft} iconClass="h-3 w-3" />
  {#each $breadcrumbs as { label, href }, i (label)}
    <div class="text-xs">/</div>
    {#if i < maxLinks}
      <Button {label} {href} class="ellipsis" />
    {:else}
      <div class="ellipsis px-4">{label}</div>
    {/if}
  {/each}
</div>

<script lang="ts">
  import Button from '$components/ui/buttons/Button.svelte';
  import { breadcrumbs } from '$lib/stores/layout-store';
  import { biChevronLeft } from '$lib/vendor/icons/bootstrap-icons';

  let maxLinks = $derived($breadcrumbs.length - 1);
</script>
