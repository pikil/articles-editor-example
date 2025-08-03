<h3 class={classes}>{text}</h3>

<script lang="ts">
  interface Props {
    text: string;
    class?: string;
  }

  let { text, class: klass }: Props = $props();

  let classes = $derived('text-2xl font-bold mb-6'
    + (klass ? ' ' + klass : '')
  );
</script>
