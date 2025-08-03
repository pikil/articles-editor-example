<div class={pageClasses}>
  <PageTitle text={title} />
  <div class="py-4">
    <Button label="Add 100 articles" onclick={addArticles.bind(null, 100)} />
  </div>
  <div class="py-4">
    <Button label="Add 1000 articles" onclick={addArticles.bind(null, 1000)} />
  </div>
</div>

<script lang="ts">
  import PageTitle from '$components/PageTitle.svelte';
  import Button from '$components/ui/buttons/Button.svelte';
  import { pageClasses } from '$data/css-classes';
  import { setPageData } from '$lib/stores/layout-store';
  import { userSid } from '$lib/stores/user-store';
  import { db } from '$lib/utils/db';

  const title = 'System access';

  const randomStr = (len = 10) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLen = characters.length;

    for ( var i = 0; i < len; i++ )
      result += characters.charAt(Math.floor(Math.random() * charLen));

    return result;
  };

  const addArticles = (length: number) => {
    db.articles.bulkAdd(Array.from({ length }, () => {
      return {
        title: 'Article ' + randomStr(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' + randomStr(), // eslint-disable-line max-len
        createdAt: Date.now(),
        author: $userSid,
        status: 0
      };
    })).then(console.log.bind(console, 'done')); // eslint-disable-line no-console
  };

  setPageData([
    { label: title, href: '' }
  ]);
</script>
