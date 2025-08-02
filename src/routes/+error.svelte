<div class={pageClasses}>
  <div class="text-center w-full">Whoops... Nothing is found...</div>
  <div class="flex justify-center pt-6">
    <Button label="Go to Dashboard" class={primaryBtnClasses} href="/" />
  </div>
</div>

<script>
  import Button from '$components/ui/buttons/Button.svelte';
  import { pageClasses, primaryBtnClasses } from '$data/css-classes';
</script>
