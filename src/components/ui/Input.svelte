{#if label}
  <p class="font-bold pb-1 text-sm">{label}</p>
{/if}
<input bind:value type="text" {placeholder} class={classes} {maxlength} />

<script lang="ts">
  const defaultClasses = 'px-4 py-3 border-1 border-gray-200 rounded-lg';

  interface Props {
    value?: string;
    class?: string;
    label?: string;
    placeholder?: string;
    maxlength?: number;
  }

  let {
    value = $bindable(''),
    class: klass,
    label,
    placeholder,
    maxlength
  }: Props = $props();

  let classes = $derived(defaultClasses
    + (klass ? ' ' + klass : '')
  );
</script>
