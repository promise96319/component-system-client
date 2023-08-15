import { FetchOption, User, useFetch, useMutation } from './common';

export const useUser = (option?: FetchOption) => {
  return useFetch<User>('/auth/user', option);
};

export const useUpdateUser = (id?: string) => {
  return useMutation<Partial<User>, User>(`/user/${id}`, { stopFetch: !id, method: 'patch' });
};
