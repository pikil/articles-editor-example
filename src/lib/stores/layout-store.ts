import { mainNameShort } from '$data/strings';
import { writable } from 'svelte/store';

interface LinkData {
  label: string;
  href: string;
}

export const pageTitle: import('svelte/store').Writable<string> = writable(mainNameShort);

export const breadcrumbs: import('svelte/store').Writable<LinkData[]> = writable([]);

export const setPageData = (_breadcrumbs: LinkData[]) => {
  breadcrumbs.set(_breadcrumbs || []);
  pageTitle.set(_breadcrumbs.length > 0 ? _breadcrumbs[_breadcrumbs.length - 1].label : mainNameShort);
};
