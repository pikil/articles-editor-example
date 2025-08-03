{#if label}
  <p class="font-bold pb-1 px-2 text-sm">{label}</p>
{/if}
<div class={containerClasses}>
  <Icon
    name={biCaretDown}
    class="h-5 w-5 text-gray-400 absolute left-1.5 top-3.5 cursor-pointer pointer-events-none"
  />
  <select
    bind:value
    bind:this={select}
    class={inputClasses}
    {onchange}
  >
    {#if !isChanged && placeholder}
      <option value={placeholderValue}>{placeholder}</option>
    {/if}
    {#each options as { value: v, label: l } (v)}
      <option value={v} selected={v === value}>{l}</option>
    {/each}
  </select>
</div>
<script lang="ts">
  import { biCaretDown } from '$lib/vendor/icons/bootstrap-icons';
  import Icon from '$components/ui/Icon.svelte';

  interface SelectOption {
    label: string;
    value: string | number;
  }

  interface Props {
    value: string | number;
    options: SelectOption[];
    label?: string;
    placeholder?: string;
    placeholderValue?: number | string;
    oninput?: (_: string | number) => void;
    class?: string;
  }

  const inputClasses = 'appearance-none m-0 block w-full px-8 font-normal'
    + ' bg-transparent bg-clip-padding bg-no-repeat rounded-xl cursor-pointer transition ease-in-out bg-transparent'
    + ' text-gray-700 dark:text-gray-300'
    + ' focus:border-blue-600 focus:outline-hidden';

  let {
    value = $bindable(0),
    options,
    placeholder = '',
    placeholderValue = 0,
    label = '',
    oninput,
    class: klass
  }: Props = $props();

  let isChanged = $state<boolean>(false);
  let select = $state<HTMLSelectElement | null>(null);

  const onchange = () => {
    isChanged = true;
    oninput?.call(null, value);
  };

  let containerClasses = $derived('relative border border-gray-200 dark:border-gray-400 rounded-lg py-3'
    + (klass ? ' ' + klass : '')
  );
</script>
