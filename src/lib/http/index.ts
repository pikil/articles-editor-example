import { browser } from '$app/environment';

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

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

if (browser && import.meta.env.DEV) {
  const randomInterval = (m: number, gap: number = 200) => Math.floor(Math.random() * ((m + gap) - (m - gap) + 1)) + (m - gap);

  const getMockData = (url: string, { method, body }: Input) => {
    switch (true) {
      case method === 'GET' && url.startsWith('/user/get-auth'): {
        const role = localStorage.getItem('rid');
        const sid = localStorage.getItem('sid');

        return { success: true, message: (role || 0) + ',' + (sid || '-') };
      }
      case method === 'POST' && url.startsWith('/user/sign-in'): {
        if (body instanceof FormData) {
          const sid = body?.get('sid');
          const role = body?.get('role');

          if (sid && role) {
            localStorage.setItem('sid', String(sid));
            localStorage.setItem('rid', String(role));
          }

          return { success: true, message: 'Signed in' };
        } else {
          return { success: false, message: 'Incorrect parameters passed' };
        }
      }
      case method === 'POST' && url.startsWith('/user/sign-out'): {
        localStorage.clear();
        return { success: true, message: 'Signed out' };
      }
      case method === 'POST' && url.startsWith('/user/update-role'): {
        if (body instanceof FormData) {
          const role = body?.get('role');

          if (role)
            localStorage.setItem('rid', String(role));

          return { success: true, message: 'Updated!' };
        } else {
          return { success: false, message: 'Incorrect role parameter passed' };
        }
      }
      default:
        return { success: false, message: 'Unknown request data' };
    }
  };

  // @ts-expect-error mock fetch
  window.fetch = async (url: string, init: Input) => {
    console.log('Intercepted fetch:', url, init); // eslint-disable-line

    await new Promise(resolve => setTimeout(resolve, randomInterval(parseInt(import.meta.env.VITE_FETCH_MOCK_TIMEOUT))));

    // Simulating fake response after the delay
    return new Response(JSON.stringify(getMockData(url, init)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  };
}

const apiFetch = async (url: string, { method = 'GET', body = undefined, headers = undefined }: Input): Promise<Result> => {
  const controller = new AbortController();
  const signal = controller.signal;

  if (headers)
    headers = { ...{ 'Accept': '*/*' }, ...headers };

  // @ts-expect-error mock fetch
  const response = await fetch(url, { method, headers, body, signal });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Fetch failed with status ${response.status}: ${errorData?.message || 'Unknown error'}`);
  }

  return response.json();
};

export const get = (path: string, headers?: FetchData): Promise<Result> => apiFetch(
  baseApiUrl + path,
  { headers: { ...headers, 'Content-Type': 'text/plain;charset=UTF-8' } }
);

export const post = (path: string, data?: FetchData, headers?: FetchData): Promise<Result> => {
  const body = new FormData();

  if (data) {
    const keys = Object.keys(data || {});

    for (let i = keys.length; i--;)
      body.append(keys[i], String(data[keys[i]]));
  }

  return apiFetch(
    baseApiUrl + path,
    { method: 'POST', body, headers }
  );
};
