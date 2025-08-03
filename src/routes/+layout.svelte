<svelte:head>
  <title>{title}</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<LeftSidebar />
<div class="flex flex-col min-h-svh">
  <Header />
  {#if !onMain && $breadcrumbs.length}
    <Breadcrumbs />
  {/if}
  <Main>
    {#if $userRole}
      {@render children?.()}
    {:else}
      <PageLoader />
    {/if}
  </Main>
  <Footer />
</div>
<div id="modals"></div>
<dialog id="async-dialog"></dialog>

<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.ico';
  import Header from '$themes/main/Header.svelte';
  import Breadcrumbs from '$themes/main/Breadcrumbs.svelte';
  import Main from '$themes/main/Main.svelte';
  import Footer from '$themes/main/Footer.svelte';
  import LeftSidebar from '$themes/main/LeftSidebar.svelte';
  import { breadcrumbs, pageTitle } from '$lib/stores/layout-store';
  import { mainNameShort } from '$data/strings';
  import { userRole } from '$lib/stores/user-store';
  import PageLoader from '$components/PageLoader.svelte';
  import { onNavigate } from '$app/navigation';

  interface Props {
    children?: import('svelte').Snippet<[]>;
  }

  let { children }: Props = $props();

  let onMain = $derived($pageTitle === mainNameShort);
  let title = $derived(mainNameShort
    + (onMain ? ' | Dashboard' : ' | ' + $pageTitle)
  );

  onNavigate(() => {
    $breadcrumbs = [];
  });
</script>
