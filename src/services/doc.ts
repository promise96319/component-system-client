import { User, useFetch, useMutation } from './common';

export const ApiDocKey = 'API';

export interface ApiDocQuery {
  majorVersionId: string;
  componentId: string;
  type: 'API' | 'DESIGN';
}

export interface Doc {
  id: string;
  majorVersionId: string;
  componentId: string;
  doc: {
    content: string;
    author: User;
  };
  createdAt: string;
  updatedAt: string;
}

export const useDoc = (query: ApiDocQuery) => {
  const { type, ...rest } = query;
  return useFetch<Doc>('/spec', {
    query: {
      ...rest,
      specType: type
    },
    stopFetch: !query.majorVersionId
  });
};

export interface DocBody {
  specId: string;
  remark: string;
  content: string;
  demandIds?: string[];
}

export const useSaveDoc = () => {
  return useMutation<DocBody, any>('/doc', { method: 'POST' });
};
