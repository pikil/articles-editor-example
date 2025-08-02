<footer class="px-4 py-6 bg-gray-800 text-gray-400 flex flex-row items-center">
  <div class="flex-1 ellipsis">{mainName}, 08/2025</div>
  <IconButton
    href="https://github.com/pikil/articles-editor-example"
    icon={biGithub}
    target="_blank"
  />
</footer>

<script>
  import { mainName } from '$data/strings';
    import { biGithub } from '$lib/vendor/icons/bootstrap-icons';
  import IconButton from '$ui/buttons/IconButton.svelte';
</script>
