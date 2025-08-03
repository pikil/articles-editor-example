<div class={pageClasses}>
  <PageTitle text={title} />
  <div class="max-w-80">
    <Select bind:value={$userRole} label="Role" options={userRoles} {oninput} />
    {#if successTxt}
      <div transition:fade class="text-green-500 p-2 absolute text-sm">{successTxt}</div>
    {/if}
    <HintTxt class="mt-6">Updating your user role allows to see different behaviours on the project's pages.</HintTxt>
  </div>
</div>

<script lang="ts">
  import { setPageData } from '$lib/stores/layout-store';
  import { pageClasses } from '$data/css-classes';
  import Select from '$components/ui/Select.svelte';
  import { userRoles } from '$data/user-values';
  import { userRole } from '$lib/stores/user-store';
  import { post } from '$lib/http';
  import { fade } from 'svelte/transition';
  import HintTxt from '$components/ui/HintTxt.svelte';
  import PageTitle from '$components/PageTitle.svelte';

  const title = 'User details';

  let successTxt = $state<string>('');

  const oninput = (role: string | number) => {
    post('user/update-role', { role: String(role) }).then(({ success }) => {
      if (success) {
        successTxt = 'Role updated!';

        setTimeout(() => {
          successTxt = '';
        }, 2500);
      }
    });
  };

  setPageData(
    [{ label: title, href: '' }]
  );
</script>
