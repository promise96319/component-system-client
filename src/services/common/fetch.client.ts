'use client';

import { Response } from './type';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { useTokenStorage } from '@/hooks';
import { Message } from '@arco-design/web-react';

export interface FetchOption extends RequestInit {
  stopFetch?: boolean;
  disallowError?: boolean;
}

export const clientFetch = async <D>(url: string, option?: FetchOption): Promise<D> => {
  const fullUrl = (process.env.NEXT_PUBLIC_SERVER_HOST ?? '') + url;
  const res: Response<D> = await fetch(fullUrl, option).then((res) => res.json());

  if (res.code !== 200 && !option?.disallowError) {
    Message.error(res.message);
  }

  return res.data;
};

export const useFetch = <D>(url: string, option?: FetchOption, swrConfig?: SWRConfiguration) => {
  const cacheKey = `${option?.method ?? 'get'}-${url}`;
  const [token] = useTokenStorage();
  const headers: Record<string, any> = option?.headers ?? {};
  headers.contentType = 'application/json';
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return useSWR(option?.stopFetch ? null : cacheKey, () => clientFetch<D>(url, { ...option, headers }), swrConfig);
};

export const useMutation = <D, R, E = any>(
  url: string,
  option: FetchOption = {},
  swrConfig?: SWRMutationConfiguration<R, E>
) => {
  option.method = option.method ?? 'post';
  const cacheKey = `${option?.method}-${url}`;
  const [token] = useTokenStorage();
  const headers: Record<string, any> = option?.headers ?? {};
  headers['Content-Type'] = 'application/json';
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return useSWRMutation<R, E, any, D>(
    option?.stopFetch ? null : cacheKey,
    (_key: string, { arg }: { arg: D }) => {
      return clientFetch<R>(url, {
        ...option,
        body: JSON.stringify(arg),
        headers
      });
    },
    swrConfig
  );
};
