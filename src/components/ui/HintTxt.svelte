<p class={classes}>{@render children?.()}</p>

<script lang="ts">
  interface Props {
    class?: string;
    children?: import('svelte').Snippet<[]>;
  }

  let { children, class: klass }: Props = $props();

  let classes = $derived('italic text-faded px-2 py-4 text-sm'
    + (klass ? ' ' + klass : '')
  );
</script>
