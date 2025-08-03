import { browser } from '$app/environment';
import { getMockData } from './mock';

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

  // @ts-expect-error mock fetch
  window.fetch = async (url: string, init: Input) => {
    console.log('Intercepted fetch:', url, init); // eslint-disable-line

    await new Promise(resolve => setTimeout(resolve, randomInterval(parseInt(import.meta.env.VITE_FETCH_MOCK_TIMEOUT))));

    // Simulating fake response after the delay
    return new Response(JSON.stringify(await getMockData(url, init)), {
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
