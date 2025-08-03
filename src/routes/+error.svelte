<div class={pageClasses}>
  <div class="text-center w-full">Whoops... Nothing is found...</div>
  <div class="flex justify-center pt-6">
    <Button label="Go to Dashboard" href="/" icon={biChevronLeft} class={primaryBtnClasses} />
  </div>
</div>

<script>
  import Button from '$components/ui/buttons/Button.svelte';
  import { pageClasses, primaryBtnClasses } from '$data/css-classes';
  import { biChevronLeft } from '$lib/vendor/icons/bootstrap-icons';
</script>
