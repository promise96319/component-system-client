import { Response } from './type';

export const serverFetch = async <T>(
  url: string,
  option?: RequestInit & { query?: Record<string, any> }
): Promise<T> => {
  let fullUrl = (process.env.SERVER_HOST ?? '') + url;
  if (option?.query) {
    fullUrl += '?' + new URLSearchParams(option.query).toString();
  }
  const res: Response<T> = await fetch(fullUrl, option).then((res) => res.json());

  // todo : 错误处理

  return res.data;
};
