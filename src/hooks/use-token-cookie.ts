import { getToken, setToken } from '@/cookie/token';

export const useTokenCookie = () => {
  return [getToken(), setToken] as const;
};
