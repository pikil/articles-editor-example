<svg viewBox={viewBox || defViewbox} class={iconClasses}>
  {#each paths as [d, style, transform], i (i)}
    <path {d} {style} {transform} />
  {/each}
</svg>

<script lang="ts">
  import { defViewbox } from '$data/strings';

  interface Props {
    name: string;
    class?: string;
  }

  let { name, class: klass }: Props = $props();

  let [def, viewBox] = $derived(name.split('|'));
  let paths = $derived(def.split('&&').map(path => path.split('@@')));
  let iconClasses = $derived('fill-current inline' + (klass ? ' ' + klass : ''));
</script>
