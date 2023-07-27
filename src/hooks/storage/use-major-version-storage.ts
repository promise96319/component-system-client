import { useLocalStorageState } from 'ahooks';

export const useMajorVersionIdStorage = () => {
  return useLocalStorageState<string>('majorVersionId');
};
