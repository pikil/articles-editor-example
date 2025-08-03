import { mainNameShort } from '$data/strings';
import { writable } from 'svelte/store';

export interface LinkData {
  label: string;
  href: string;
}

export const pageTitle: import('svelte/store').Writable<string> = writable(mainNameShort);

export const breadcrumbs: import('svelte/store').Writable<LinkData[]> = writable([]);

export const setPageData = (_breadcrumbs: LinkData[]) => {
  breadcrumbs.set(_breadcrumbs || []);
  pageTitle.set(_breadcrumbs.length > 0 ? _breadcrumbs[_breadcrumbs.length - 1].label : mainNameShort);
};

/**
 * Used for identifying the current dialog to close first
 * No need to be writable, as noone is listening for it
 */
export const currentDialogs: { id: string; close: () => void; }[] = [];
