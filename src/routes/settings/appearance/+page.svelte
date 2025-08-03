<div class={pageClasses}>
  <PageTitle text={title} />
  <div class="max-w-80">
    <Select bind:value={mode} label="Light mode" options={modeOptions} oninput={onModeInput} />
  </div>
</div>

<script lang="ts">
  import PageTitle from '$components/PageTitle.svelte';
  import Select from '$components/ui/Select.svelte';
  import { pageClasses } from '$data/css-classes';
  import { setPageData } from '$lib/stores/layout-store';
  import { onMount } from 'svelte';

  const title = 'Appearance settings';
  const dk = 'isDark';

  const modeOptions = [
    { label: 'Auto', value: 'auto' },
    { label: 'Light', value: '0' },
    { label: 'Dark', value: '1' }
  ];

  let mode = $state<string>('');

  const setMode = (value: string) => {
    mode = value;

    const isManualLight = value === '0';
    if (isManualLight || value === '1') {
      document.documentElement.dataset.mode = (isManualLight) ? 'light' : 'dark';
      localStorage.setItem(dk, value);
    } else {
      localStorage.removeItem(dk);
      document.documentElement.dataset.mode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
  };

  const onModeInput = (val: string | number) => {
    setMode(String(val));
  };

  setPageData(
    [{ label: title, href: '' }]
  );

  onMount(() => {
    const m = localStorage.getItem(dk);
    mode = (m === '0' || m === '1') ? m : 'auto';
  });
</script>
