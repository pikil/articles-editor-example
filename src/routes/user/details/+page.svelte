<div class={pageClasses}>
  <Select bind:value={$userRole} options={userRoles} {oninput} />
  {#if successTxt}
    <div transition:fade class="text-green-500 p-2">{successTxt}</div>
  {/if}
</div>

<script lang="ts">
  import { setPageData } from '$lib/stores/layout-store';
  import { pageClasses } from '$data/css-classes';
  import Select from '$components/ui/Select.svelte';
  import { userRoles } from '$data/user-values';
  import { userRole } from '$lib/stores/user-store';
  import { post } from '$lib/http';
  import { fade } from 'svelte/transition';

  const title = 'User details';

  setPageData(
    [{ label: title, href: '' }]
  );

  let successTxt: string = $state('');

  const oninput = (role: string | number) => {
    post('user/update-role', { role: String(role) }).then(({ success }) => {
      if (success) {
        successTxt = 'Updated';

        setTimeout(() => {
          successTxt = '';
        }, 2500);
      }
    });
  };
</script>
