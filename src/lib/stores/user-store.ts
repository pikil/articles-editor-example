import { writable } from 'svelte/store';

export const userRole: import('svelte/store').Writable<number> = writable(0);

export const userSid: import('svelte/store').Writable<string> = writable('');

export const checkingAuth: import('svelte/store').Writable<boolean> = writable(true);
