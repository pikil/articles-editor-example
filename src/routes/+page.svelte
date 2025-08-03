{#snippet dashboardBlock({ title, links }: { title: string; links: Link[] })}
  <div class="border-2 border-gray-100 dark:border-gray-500 rounded-lg overflow-hidden">
    <p class="text-faded p-4">{title}</p>
    <div>
      {#each links as { label, href } (label)}
        <a {href} title={label} class="block p-4 hover:bg-gray-200/50 dark:hover:bg-gray-600/60 transition-colors">{label}</a>
      {/each}
    </div>
  </div>
{/snippet}

<div class={pageClasses}>
  <PageTitle text="Dashboard" class="mt-2" />
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {#each blocks as block (block.title)}
      {@render dashboardBlock(block)}
    {/each}
  </div>
</div>

<div class="flex justify-center pt-8">
  <Button label="Sign out" class="text-white bg-red-500" loading={signingOut} onclick={signOut} />
</div>

<script lang="ts">
  import PageTitle from '$components/PageTitle.svelte';
  import Button from '$components/ui/buttons/Button.svelte';
  import { pageClasses } from '$data/css-classes';
  import { linkArticles, linkArticlesNew } from '$data/links';
  import { mainNameShort } from '$data/strings';
  import { post } from '$lib/http';
  import { pageTitle } from '$lib/stores/layout-store';
  import { userRole, userSid } from '$lib/stores/user-store';

  interface Link {
    label: string;
    href: string;
  }

  const blocks = [
    {
      title: 'User profile',
      links: [
        { label: 'User details', href: '/user/details' },
        { label: 'My articles', href: '/user/articles' }
      ]
    },
    {
      title: 'Content',
      links: [
        { label: 'New article', href: linkArticlesNew },
        { label: 'All articles', href: linkArticles },
        { label: 'About', href: '/page/about' }
      ]
    },
    {
      title: 'System settings',
      links: [
        { label: 'Appearance', href: '/settings/appearance' },
        { label: 'System access', href: '/settings/system-access' }
      ]
    }
  ];

  $pageTitle = mainNameShort;

  let signingOut = $state<boolean>(false);

  const signOut = async () => {
    signingOut = true;

    await post('user/sign-out');

    $userRole = 0;
    $userSid = '';
  };
</script>
