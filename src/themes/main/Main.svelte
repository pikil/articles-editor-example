<main class="flex-1">
  {@render children?.()}
</main>
<SignIn />
<script lang="ts">
  import SignIn from '$components/SignIn.svelte';

  interface Props {
    children?: import('svelte').Snippet<[]>;
  }

  let { children }: Props = $props();
</script>
