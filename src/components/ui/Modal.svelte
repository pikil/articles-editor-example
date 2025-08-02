<Backdrop {showing} onclick={onBackdrop} />
{#if showing}
  <div
      use:portal
      transition:scale|global={transitionParams}
      class="fixed w-full flex flex-col items-center z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 max-w-fit"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative transform rounded-2xl w-full sm:max-w-lg cursor-default shadow-md shadow-gray-400 dark:shadow-none text-left sm:my-8"
      >
        <div class="bg-surface py-2 w-screen max-w-full rounded-t-2xl">
          {#if title}
            <div id="modal-title" class="flex flex-row gap-3 items-center pl-4 pr-2 py-3">
              <div class="grow min-w-0 ellipsis text-faded select-none">{title}</div>
              {#if !disableBack}
                <IconButton icon={biX} iconClass="w-6 h-6 text-faded" onclick={ondismiss} />
              {/if}
            </div>
          {/if}
          <div class="px-4">
            {@render children?.()}
          </div>
        </div>
        <div class="flex flex-col-reverse gap-3 bg-gray-100 dark:bg-gray-800 p-6 sm:flex-row sm:justify-end rounded-b-2xl">
          {#if !disableBack}
            <Button
              label="Back"
            />
          {/if}
          <Button
            label={okLabel}
            class={primaryBtnClasses}
            {disabled}
            onclick={onok.bind(null)}
          />
        </div>
      </div>
    </div>
{/if}
<script lang="ts">
  import { noop } from '$lib/utils';
  import { portal } from '$lib/utils/dom';
  import Backdrop from '$components/ui/Backdrop.svelte';
  import { quintInOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import Button from './buttons/Button.svelte';
  import IconButton from './buttons/IconButton.svelte';
  import { biX } from '$lib/vendor/icons/bootstrap-icons';
  import { primaryBtnClasses } from '$data/css-classes';

  const transitionParams = {
    duration: 200,
    easing: quintInOut
  };

  interface Props {
    title: string;
    showing?: boolean;
    disableBack?: boolean;
    disabled?: boolean;
    ondismiss?: () => void;
    okLabel: string;
    onok?: () => void;
    children?: import('svelte').Snippet<[]>;
  }

  let {
    title,
    showing = false,
    disableBack,
    disabled = false,
    ondismiss = noop,
    okLabel = 'Confirm',
    onok = noop,
    children
  }: Props = $props();

  const onBackdrop = () => {
    if (disableBack)
      return;

    ondismiss();
  };
</script>
