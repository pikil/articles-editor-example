<header class={classes}>
  <div class="flex flex-row items-center rounded-lg bg-primary/20 p-4 shadow-md shadow-gray-300 dark:shadow-gray-700">
    <div class="flex-1 flex flex-row items-center ellipsis text-primary italic">
      <a href={path('/')} title="Main page" class="font-bold">{mainNameShort}</a>
      <Icon name={fasCircle} class="h-1 w-1 mx-4" />
      <div class="flex-1 ellipsis text-xs">{mainName}</div>
    </div>
    <div class="relative">
      <IconButton icon={fasBars} onclick={showMenu} />
      <Popup showing={showingMenu} class="top-[calc(100%+0.25rem)] right-2 z-30 min-w-[200px]" outsideclick={hideMenu}>
        {#each menuOptions as { label, href, icon } (label)}
          <Button {label} {href} class="block py-4 hover:bg-gray-500/10 transition-colors rounded-none" {icon} />
        {/each}
      </Popup>
    </div>
  </div>
</header>

<script lang="ts">
  import { mainName, mainNameShort } from '$data/strings';
  import { fasBars, fasCircle, fasList, fasPlus } from '$lib/vendor/icons/fontawesome6-icons';
  import IconButton from '$components/ui/buttons/IconButton.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import { path } from '$lib/utils';
  import Popup from '$components/ui/Popup.svelte';
  import Button from '$components/ui/buttons/Button.svelte';
  import { linkArticles, linkArticlesNew, linkGithub } from '$data/links';
  import { biGithub, biHouse } from '$lib/vendor/icons/bootstrap-icons';
  import { beforeNavigate } from '$app/navigation';

  let showingMenu = $state<boolean>(false);

  const showMenu = () => {
    showingMenu = true;
  };

  const hideMenu = () => {
    showingMenu = false;
  };

  let classes = $derived('px-2 pt-2 transition-padding');

  const menuOptions = [
    { label: 'Dashboard', href: path('/'), icon: biHouse },
    { label: 'New article', href: linkArticlesNew, icon: fasPlus },
    { label: 'All articles', href: linkArticles, icon: fasList },
    { label: 'Repository', href: linkGithub, icon: biGithub }
  ];

  beforeNavigate(hideMenu);
</script>
