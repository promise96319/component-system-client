import path from 'path';
import { Response } from './type';

export const serverFetch = async <T>(
  url: string,
  option?: RequestInit & { query?: Record<string, any> }
): Promise<T> => {
  const fullUrl = path.join(process.env.SERVER_HOST ?? '/', url);
  console.log('process.env', process.env.SERVER_HOST);
  console.log('process.env', process.env);

  const res: Response<T> = await fetch(fullUrl, option).then((res) => res.json());

  // todo : 错误处理
  console.log('res', res);

  return res.data;
};
