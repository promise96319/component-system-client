'use client';

import { Message } from '@arco-design/web-react';
import { useRouter } from 'next/navigation';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { useRedirectUrl } from '@/hooks/use-redirect-url';
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

export const clientFetch = async <D>(
  url: string,
  option: FetchOption & {
    callback?: (res: Response<D>) => void;
  } = {}
): Promise<D> => {
  if (option.method) {
    option.method = option.method.toUpperCase();
  }
  const fullUrl = (process.env.NEXT_PUBLIC_SERVER_HOST ?? '') + url;
  const res: Response<D> = await fetch(fullUrl, option).then((res) => res.json());

  if (res.code !== 200 && !option?.disallowError) {
    option.callback?.(res);
  }

  return res.data;
};

export const useResponse = <T>() => {
  const router = useRouter();
  const redirect = useRedirectUrl();

  return (res: Response<T>) => {
    if (res.code !== 200) {
      Message.error(res.message);
      if (res.code === 401) {
        router.replace(`/auth/login?${redirect}`);
      }
      throw new Error(res.message);
    }
    return res.data;
  };
};

export const useFetch = <D>(url: string, option: FetchOption = {}, swrConfig?: SWRConfiguration) => {
  const handleResponse = useResponse<D>();

  if (option.query) {
    url = `${url}?${stringifyQuery(option.query)}`;
  }
  option.credentials = 'include';
  const cacheKey = `${option.method ?? 'get'}-${url}`;

  const headers: Record<string, any> = option?.headers ?? {};
  headers['Content-Type'] = 'application/json';

  return useSWR(
    option?.stopFetch ? null : cacheKey,
    () => clientFetch<D>(url, { ...option, headers, callback: handleResponse }),
    swrConfig
  );
};

export const useMutation = <D = any, R = any, E = any>(
  url: string,
  option: FetchOption = {},
  swrConfig?: SWRMutationConfiguration<R, E>
) => {
  const handleResponse = useResponse<R>();

  option.method = option.method ?? 'post';
  if (option.query) {
    url = `${url}?${stringifyQuery(option.query)}`;
  }

  option.credentials = 'include';

  const cacheKey = `${option?.method}-${url}`;

  const headers: Record<string, any> = option?.headers ?? {};
  if (!option.isFormData) {
    headers['Content-Type'] = 'application/json';
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
        headers,
        callback: handleResponse
      });
    },
    swrConfig
  );
};
