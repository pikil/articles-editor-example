{#snippet dashboardBlock({ title, links }: { title: string; links: Link[] })}
  <div class="border-2 border-gray-100 rounded-lg">
    <p class="text-faded p-4">{title}</p>
    <div>
      {#each links as { label, href } (label)}
        <a {href} title={label} class="block p-4 hover:bg-gray-200/50 transition-colors">{label}</a>
      {/each}
    </div>
  </div>
{/snippet}

<div class={classes}>
  {#each blocks as block (block.title)}
    {@render dashboardBlock(block)}
  {/each}
</div>

<script lang="ts">
  import { pageClasses } from '$data/css-classes';
  import { mainNameShort } from '$data/strings';
  import { pageTitle } from '$lib/stores/layout-store';

  interface Link {
    label: string;
    href: string;
  }

  const classes = pageClasses + ' grid grid-cols-2 gap-6';

  const blocks = [
    {
      title: 'User profile',
      links: [
        { label: 'User details', href: '/user/details' },
        { label: 'Created articles', href: '/user/articles' }
      ]
    },
    {
      title: 'System',
      links: [
        { label: 'Appearance', href: '/settings/appearance' },
        { label: 'About', href: '/page/about' }
      ]
    }
  ];

  $pageTitle = mainNameShort;
</script>
