<footer class="px-4 py-6 bg-gray-800 text-gray-400 flex flex-row items-center text-xs">
  <div class="flex-1 ellipsis">{mainNameShort} - {mainName}, 08/2025, Svelte 5, fetch requests are mocked</div>
  <div class="flex-1 ellipsis">
    <a href="/page/about" class="text-primary hover:underline px-2">Read more</a>
  </div>
  <IconButton
    href="https://github.com/pikil/articles-editor-example"
    icon={biGithub}
    target="_blank"
  />
</footer>

<script>
  import { mainName, mainNameShort } from '$data/strings';
  import { biGithub } from '$lib/vendor/icons/bootstrap-icons';
  import IconButton from '$components/ui/buttons/IconButton.svelte';
</script>
