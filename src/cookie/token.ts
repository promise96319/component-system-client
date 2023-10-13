import { getCookie, setCookie } from 'cookies-next';
// import { cookies } from 'next/headers';

const tokenKey = 'token';

export const getToken = () => {
  return getCookie(tokenKey);
};

export const setToken = (token?: string) => {
  setCookie(tokenKey, token);
};

// export const getServerToken = () => {
//   return cookies().get(tokenKey)?.value;
// };

// export const setServerToken = (token: string) => {
//   return cookies().set(tokenKey, token);
// };
