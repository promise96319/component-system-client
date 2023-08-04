import { useFetch } from './common';
import { useMutation } from './common/fetch.client';
import type { MajorVersion } from './common';

export const useMajorVersion = (id?: string) => {
  return useFetch<MajorVersion>(`/major-version/${id}`, { stopFetch: !id });
};

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
