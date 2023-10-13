import { headers as Headers } from 'next/headers';

export const logHeaders = (headers: ReturnType<typeof Headers>) => {
  headers.forEach((value, key) => {
    console.log(value, key);
  });
};

export const getQuery = (headers: ReturnType<typeof Headers>): Record<string, string> => {
  const query = headers.get('x-invoke-query');
  try {
    return JSON.parse(decodeURIComponent(query ?? ''));
  } catch {
    return {};
  }
};

export const getPath = (headers: ReturnType<typeof Headers>) => {
  return headers.get('x-invoke-path');
};

export const getNextUrl = (headers: ReturnType<typeof Headers>) => {
  return headers.get('next-url') ?? '/';
};
