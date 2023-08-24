'use client';

import { Message } from '@arco-design/web-react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { getToken } from '@/cookie/token';
import { useTokenCookie } from '@/hooks';
import { Response } from './type';

export interface FetchOption extends RequestInit {
  stopFetch?: boolean;
  disallowError?: boolean;
  query?: Record<string, any>;
  isFormData?: boolean;
}

export const stringifyQuery = (query: Record<string, any>) => {
  return Object.keys(query)
    .filter((key) => query?.[key] !== undefined && query?.[key] !== '')
    .map((key) => `${key}=${query?.[key]}`)
    .join('&');
};

export const clientFetch = async <D>(url: string, option: FetchOption = {}): Promise<D> => {
  if (option.method) {
    option.method = option.method.toUpperCase();
  }
  const fullUrl = (process.env.NEXT_PUBLIC_SERVER_HOST ?? '') + url;
  const res: Response<D> = await fetch(fullUrl, option).then((res) => res.json());

  if (res.code !== 200 && !option?.disallowError) {
    Message.error(res.message);

    if (res.code === 401) {
      console.log('222', 222);
      redirect('/auth/login');
    }

    throw new Error(res.message);
  }

  return res.data;
};

export const useFetch = <D>(url: string, option: FetchOption = {}, swrConfig?: SWRConfiguration) => {
  // const router = useRouter();
  // router.replace('/auth/login');

  if (option.query) {
    url = `${url}?${stringifyQuery(option.query)}`;
  }
  const cacheKey = `${option.method ?? 'get'}-${url}`;
  const token = getToken();
  console.log('token', token);

  const headers: Record<string, any> = option?.headers ?? {};
  headers['Content-Type'] = 'application/json';

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
  if (option.query) {
    url = `${url}?${stringifyQuery(option.query)}`;
  }
  const cacheKey = `${option?.method}-${url}`;
  const token = getToken();

  const headers: Record<string, any> = option?.headers ?? {};
  if (!option.isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return useSWRMutation<R, E, any, D>(
    option?.stopFetch ? null : cacheKey,
    (_key: string, { arg }: { arg: D }) => {
      let body: FormData | string = '';
      if (option.isFormData) {
        // https://juejin.cn/post/6844903757654786061
        // 当为 formData 时，不设置 Content-Type，浏览器会自动设置为 multipart/form-data
        const formData = new FormData();
        Object.keys(arg as any).forEach((key) => {
          formData.append(key, (arg as any)[key]);
        });
        body = formData;
      } else {
        body = JSON.stringify(arg);
      }

      return clientFetch<R>(url, {
        ...option,
        body,
        headers
      });
    },
    swrConfig
  );
};
