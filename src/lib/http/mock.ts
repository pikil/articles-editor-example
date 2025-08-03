import { maxTitleLen, maxTxtLen, minTxtLen, perPage } from '$data/numbers';
import { role, statuses } from '$data/user-values';
import { userRole, userSid } from '$lib/stores/user-store';
import { db } from '$lib/utils/db';

let sid = '';
let rid = 0;

userSid.subscribe((v) => { sid = v; });
userRole.subscribe((v) => { rid = v; });

const roleAllows = () => rid >= role.MODERATOR;

interface FetchData {
  [key: string]: string;
}

interface Input {
  method?: 'GET' | 'POST';
  body?: FetchData | FormData;
  headers?: FetchData;
}

interface Result {
  success: boolean;
  message: string;
}

export const getMockData = async (url: string, { method, body }: Input): Promise<Result> => {
  switch (true) {
    case method === 'GET' && url.startsWith('/user/get-auth'): {
      const role = localStorage.getItem('rid');
      const sid = localStorage.getItem('sid');

      return { success: true, message: (role || 0) + ',' + (sid || '-') };
    }

    case method === 'POST' && url.startsWith('/user/sign-in'): {
      if (body instanceof FormData) {
        const sid = body.get('sid');
        const role = body.get('role');

        if (sid && role) {
          localStorage.setItem('sid', String(sid));
          localStorage.setItem('rid', String(role));
        }

        return { success: true, message: 'Signed in' };
      } else {
        return { success: false, message: 'Incorrect parameters passed...' };
      }
    }

    case method === 'POST' && url.startsWith('/user/sign-out'): {
      localStorage.clear();
      return { success: true, message: 'Signed out' };
    }

    case method === 'POST' && url.startsWith('/user/update-role'): {
      if (body instanceof FormData) {
        const role = body.get('role');

        if (role)
          localStorage.setItem('rid', String(role));

        return { success: true, message: 'Updated!' };
      } else {
        return { success: false, message: 'Incorrect role parameter passed...' };
      }
    }

    case method === 'POST' && url.startsWith('/article/save'): {
      if (body instanceof FormData) {
        const title = body.get('title');
        const text = body.get('text');

        if (typeof title !== 'string'
          || typeof text !== 'string'
          || title.length < minTxtLen
          || text.length < minTxtLen
          || title.length > maxTitleLen
          || text.length > maxTxtLen)
          return { success: false, message: 'Text values are incorrect...' };

        const id = await db.articles.add({
          title,
          text,
          author: sid,
          createdAt: Date.now(),
          status: 0
        });

        return { success: true, message: String(id) };
      } else {
        return { success: false, message: 'Incorrect article parameters passed...' };
      }
    }

    // Only moderators can update the status
    case method === 'POST' && url.startsWith('/article/update-status'): {
      if (body instanceof FormData) {
        const id = parseInt((body.get('id') as string) || '0');
        const status = parseInt((body.get('status') as string) || '0');

        if (statuses[status] === undefined)
          return { success: false, message: 'Incorrect status passed...' };

        const existing = await db.articles.get(id);

        if (!existing || (existing.author !== sid && rid !== role.MODERATOR))
          return { success: false, message: 'Cannot edit this article...' };

        const saved = await db.articles.update(id, { status });

        return { success: true, message: String(saved) };
      } else {
        return { success: false, message: 'Incorrect article parameters passed...' };
      }
    }

    // Only editors oe owners can update Title and Text
    case method === 'POST' && url.startsWith('/article/update'): {
      if (body instanceof FormData) {
        const id = parseInt((body.get('id') as string) || '0');
        const title = body.get('title');
        const text = body.get('text');

        const existing = await db.articles.get(id);

        if (!existing || (existing.author !== sid && rid !== role.EDITOR))
          return { success: false, message: 'Cannot edit this article...' };

        if (typeof title !== 'string'
          || typeof text !== 'string'
          || title.length < minTxtLen
          || text.length < minTxtLen
          || title.length > maxTitleLen
          || text.length > maxTxtLen)
          return { success: false, message: 'Text values are incorrect...' };

        const saved = await db.articles.update(id, { title, text });

        return { success: true, message: String(saved) };
      } else {
        return { success: false, message: 'Incorrect article parameters passed...' };
      }
    }

    case method === 'POST' && url.startsWith('/article/delete'): {
      if (body instanceof FormData) {
        const id = parseInt((body.get('id') as string) || '0');

        const existing = await db.articles.get(id);

        if (!existing || (existing.author !== sid && rid !== role.EDITOR))
          return { success: false, message: 'Cannot delete this article...' };

        await db.articles.delete(id);

        return { success: true, message: 'Removed!' };
      } else {
        return { success: false, message: 'Incorrect article parameters passed...' };
      }
    }

    case method === 'GET' && url.startsWith('/article/load'): {
      const params = new URLSearchParams(url.split('?')[1]);
      const id = parseInt(params.get('id') || '0');

      if (Number.isNaN(id))
        return { success: false, message: 'Incorrect id passed...' };

      const article = await db.articles.get(id);

      return (article && (article.author === sid || article.status === 1 || roleAllows()))
        ? { success: true, message: JSON.stringify(article) }
        : { success: false, message: 'Article is not found...' };
    }

    case method === 'GET' && url.startsWith('/articles/load-all'): {
      const params = new URLSearchParams(url.split('?')[1]);
      const page = parseInt(params.get('p') || '1');
      const offset = (page - 1) * perPage;

      const query = (rid === role.VIEWER)
        ? db.articles.orderBy('id').filter(article => article.status === 1 || article.author === sid)
        : db.articles.orderBy('id');

      const articles = await query.reverse().offset(offset).limit(perPage).toArray();

      return { success: true, message: JSON.stringify(articles) };
    }

    case method === 'GET' && url.startsWith('/articles/load-own'): {
      const params = new URLSearchParams(url.split('?')[1]);
      const page = parseInt(params.get('p') || '1');
      const offset = (page - 1) * perPage;

      const articles = await db.articles.where('author').equals(sid).reverse().offset(offset).limit(perPage).toArray();

      return { success: true, message: JSON.stringify(articles) };
    }

    default:
      return { success: false, message: 'Unknown request data' };
  }
};
