import { writable } from 'svelte/store';

export const userRole: import('svelte/store').Writable<number> = writable(0);
