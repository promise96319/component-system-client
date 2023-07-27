import { useFetch } from './common';
import type { Component } from './common';

export const useComponents = (majorVersionId: string) => {
  return useFetch<Component[]>(`/component?majorVersionId=${majorVersionId}`, { stopFetch: !majorVersionId });
};
