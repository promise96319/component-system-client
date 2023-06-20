'use client';

import path from 'path';
import useSWR, { SWRConfiguration } from 'swr';

export const fetcher = (url: string, option?: RequestInit) => {
  const fullUrl = path.join(process.env.NEXT_PUBLIC_SERVER_HOST ?? '/', url);

  return fetch(fullUrl, option).then((res) => res.json());
};

export const useFetch = (url: string, option?: RequestInit, swrConfig?: SWRConfiguration) => {
  // todo 权限校验及错误处理，post 请求处理等

  const cacheKey = `${option?.method ?? 'get'}-${url}`;
  return useSWR(cacheKey, () => fetcher(url, option), swrConfig);
};
