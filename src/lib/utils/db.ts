import Dexie, { type EntityTable } from 'dexie';

  interface Article {
    id?: number;
    author: string;
    createdAt: number;
    status: number;
    title: string;
    text: string;
  }

const db = new Dexie('ArtieDB') as Dexie & {
  articles: EntityTable<Article, 'id'>;
};

db.version(1).stores({
  articles: '++id, author, createdAt, status, title, text'
});

export type { Article };
export { db };
