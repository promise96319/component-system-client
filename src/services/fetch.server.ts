import path from 'path';

export const serverFetch = (url: string, option?: RequestInit) => {
  const fullUrl = path.join(process.env.SERVER_HOST ?? '/', url);
  return fetch(fullUrl, option).then((res) => res.json());
};
