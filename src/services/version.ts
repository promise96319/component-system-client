import { useFetch } from './common';
import { useMutation } from './common/fetch.client';
import type { MajorVersion, Version } from './common';

export const useMajorVersionByNo = (no?: string) => {
  return useFetch<MajorVersion>(`/major-version/version/${no}`, { stopFetch: !no || !Number(no) });
};

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

export const useReleaseVersion = () => {
  return useMutation<{ version: string; demandIds: string[] }, Version>('/major-version/release', {});
};
