import { useFetch } from './common';
import type { Component, ComponentDetail } from './common';

export const useComponents = (majorVersionId: string) => {
  return useFetch<Component[]>(`/component?majorVersionId=${majorVersionId}`, { stopFetch: !majorVersionId });
};

export const useComponent = (majorVersionId?: string, componentId?: string) => {
  return useFetch<ComponentDetail>(`/component/${componentId}`, {
    stopFetch: !majorVersionId || !componentId,
    query: {
      majorVersionId
    }
  });
};
