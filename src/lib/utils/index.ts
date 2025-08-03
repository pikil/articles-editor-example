export const noop = () => {};

export const hashId = async (value: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
};

export const path = (url: string) => '/articles-editor-example' + url;
