{#if label}
  <p class="text-lg font-bold pb-1">{label}</p>
{/if}
<input bind:value type="text" {placeholder} class={classes} />

<script lang="ts">
  const defaultClasses = 'px-4 py-3 border-1 border-gray-200 rounded-lg';

  interface Props {
    value?: string;
    class?: string;
    label?: string;
    placeholder?: string;
  }

  let {
    value = $bindable(''),
    class: klass,
    label,
    placeholder
  }: Props = $props();

  let classes = $derived(defaultClasses + (klass ? ' ' + klass : ''));
</script>
