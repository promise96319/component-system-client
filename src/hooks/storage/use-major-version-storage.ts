import { useLocalStorage } from './use-local-storage';

export const useMajorVersionIdStorage = () => {
  // const [_majorVersionId, setMajorVersionId] = useLocalStorageState<string>('majorVersionId');
  // // https://github.com/alibaba/hooks/issues/1433
  // // 临时解决方案
  // const localValue = localStorage.getItem('majorVersionId')?.replaceAll('"', '');
  // console.log('localValue', localValue);
  // return [localValue, setMajorVersionId] as const;

  return useLocalStorage('majorVersionId');
};
