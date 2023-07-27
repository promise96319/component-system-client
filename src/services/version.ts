import { useFetch } from './common';
import type { MajorVersion } from './common';

export const useMajorVersions = () => {
  const { data = [], ...rest } = useFetch<MajorVersion[]>('/major-version', {});
  return {
    data: data.sort((a, b) => b.majorVersion - a.majorVersion),
    ...rest
  };
};
