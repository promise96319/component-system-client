'use client';

import path from 'path';
import useSWR, { SWRConfiguration } from 'swr';

export const fetcher = (url: string, option?: RequestInit) => {
  let fetchOptions;

  if (localStorage.getItem('token')) {
    fetchOptions = {
      ...option,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  } else {
    fetchOptions = option;
  }

  return fetch('/api/v1' + url, fetchOptions).then((res) => res.json());
};

export const useFetch = (url: string, option?: RequestInit, swrConfig?: SWRConfiguration) => {
  // todo 权限校验及错误处理，post 请求处理等

  const cacheKey = `${option?.method ?? 'get'}-${url}`;

  return useSWR(cacheKey, () => fetcher(url, option), swrConfig);
};
