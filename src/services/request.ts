import useSWR  from 'swr';

export const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then((res) => res.json());

export default function useRequest(url: URL, options?: SWROptions) {
  return useSWR(url, fetcher, options);
  
}
