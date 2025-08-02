import Dexie from 'dexie';

export const db = new Dexie('data');

db.version(1).stores({
  friends: '++id, author, createdAt, status, title'
});
