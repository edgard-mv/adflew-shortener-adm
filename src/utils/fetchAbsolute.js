import { BASE_URL, USER_TOKEN } from './constants';

export const fetchAbsolute = (url, init) => {
  const initWithDefaults = {
    ...(init ?? {}),
    headers: new Headers({
      // Default Headers,
      'Authorization': `Bearer ${sessionStorage.getItem(USER_TOKEN)}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    }),
    body:
      typeof init?.body === 'object' ? JSON.stringify(init.body) : init?.body,
  };
  const fullUrl = url.startsWith('/') ? BASE_URL.concat(url) : url;

  return fetch(fullUrl, initWithDefaults).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        sessionStorage.removeItem(USER_TOKEN);
        window.location.reload();
      }
      throw new Error(res.status);
    }
    return res.json();
  });
};
