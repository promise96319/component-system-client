import { FetchOption, User, useFetch } from './common';

export const useUser = (option?: FetchOption) => {
  return useFetch<User>('/auth/user', option);
};
