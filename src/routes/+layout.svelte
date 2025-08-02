<svelte:head>
  <title>{title}</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<LeftSidebar />
<div class="flex flex-col min-h-svh">
  <Header />
  <Breadcrumbs />
  <Main>
    {#if $userRole}
      {@render children?.()}
    {:else}
      <div class="grid place-items-center h-56">
        <Icon name={mdiLoading} class="h-10 w-10 animate-spin text-faded/50" />
      </div>
    {/if}
  </Main>
  <Footer />
</div>
<div id="modals"></div>

<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.ico';
  import Header from '$themes/main/Header.svelte';
  import Breadcrumbs from '$themes/main/Breadcrumbs.svelte';
  import Main from '$themes/main/Main.svelte';
  import Footer from '$themes/main/Footer.svelte';
  import LeftSidebar from '$themes/main/LeftSidebar.svelte';
  import { breadcrumbs } from '$lib/stores/layout-store';
  import { mainNameShort } from '$data/strings';
  import Icon from '$components/ui/Icon.svelte';
  import { mdiLoading } from '$lib/vendor/icons/mdi7-icons';
  import { userRole } from '$lib/stores/user-store';

  interface Props {
    children?: import('svelte').Snippet<[]>;
  }

  let { children }: Props = $props();

  let title = $derived(mainNameShort
    + ($breadcrumbs.length > 0 ? ' | ' + $breadcrumbs[$breadcrumbs.length - 1].label : '')
  );
</script>
