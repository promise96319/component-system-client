import { useLocalStorageState } from 'ahooks';

export const useTokenStorage = () => {
  return useLocalStorageState<string>('token');
};
