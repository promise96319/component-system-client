import { useFetch } from './common';
import type { MajorVersion } from './common';
import { useMutation } from './common/fetch.client';

export const useMajorVersions = () => {
  const { data = [], ...rest } = useFetch<MajorVersion[]>('/major-version', {});
  return {
    data: data.sort((a, b) => b.majorVersion - a.majorVersion),
    ...rest
  };
};

export const useCreateMajorVersion = () => {
  return useMutation<undefined, MajorVersion>('/major-version', {});
};
