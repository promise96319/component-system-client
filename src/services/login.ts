import { useMutation } from './common';

export interface Account {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<Account, { accessToken: string }>('/auth/login');
};
