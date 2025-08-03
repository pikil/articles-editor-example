{#if label}
  <p class="font-bold pb-1 text-sm">{label}</p>
{/if}
<input bind:value type="text" {placeholder} class={classes} {maxlength} onkeydown={onkeydown} onkeypress={onkeydown} />

<script lang="ts">
  const defaultClasses = 'px-4 py-3 border-1 border-gray-200 rounded-lg';

  interface Props {
    value?: string;
    class?: string;
    label?: string;
    onenter?: () => void;
    placeholder?: string;
    maxlength?: number;
  }

  let {
    value = $bindable(''),
    class: klass,
    label,
    placeholder,
    maxlength,
    onenter
  }: Props = $props();

  const onkeydown = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case 'Enter':
        onenter?.call(null);
        evt.preventDefault();
        break;
      default:
        break;
    }
  };

  let classes = $derived(defaultClasses
    + (klass ? ' ' + klass : '')
  );
</script>
