<Modal
  showing={showSignin}
  disabled={!signinEnabled}
  title="Sign in"
  disableBack
  okLabel="Sign in"
  onok={signIn}
>
  <Input bind:value={email} placeholder="Your email" class="w-full my-4" />
  <Select bind:value={role} placeholder="Your role" options={userRoles} class="mb-4" />
  {#if error}
    <div class="mb-4 text-red-500">{error}</div>
  {/if}
</Modal>
<script lang="ts">
  import Input from '$components/ui/Input.svelte';
  import { userRoles } from '$data/user-values';
  import { checkingAuth, userRole, userSid } from '$lib/stores/user-store';
  import { onMount } from 'svelte';
  import Select from '$components/ui/Select.svelte';
  import Modal from '$components/ui/Modal.svelte';
  import { get, post } from '$lib/http';
  import { isValidEmail } from '$lib/utils/validation';
  import { hashId } from '$lib/utils';

  let email = $state<string>('');
  let role = $state<number>(0);
  let error = $state<string>('');

  const checkAuth = async () => {
    const { success, message } = await get('user/get-auth');

    if (success) {
      const [role, sid] = message.split(',');

      // @ts-expect-error string defaults to 0
      $userRole = role | 0;
      $userSid = sid || '';
    }

    $checkingAuth = false;
  };

  const signIn = async () => {
    if (!signinEnabled)
      return;

    error = '';

    const sid = await hashId(email);

    const result = await post(
      'user/sign-in',
      {
        sid,
        role: String(role)
      }
    );

    if (!result) {
      error = 'Cannot sign in now... Please try again later';
      return;
    }

    $userRole = role;
    $userSid = sid;
  };

  let showSignin = $derived(!$checkingAuth && !$userRole);
  let signinEnabled = $derived(showSignin && isValidEmail(email) && role > 0);

  onMount(() => {
    role = $userRole;
    checkAuth();
  });
</script>
