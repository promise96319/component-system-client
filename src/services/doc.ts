import { Demand, User, useFetch, useMutation } from './common';

export enum DocType {
  API = 'API',
  DESIGN = 'DESIGN'
}

export interface ApiDocQuery {
  majorVersionId: string;
  componentId: string;
  type: DocType;
}

export interface Doc {
  id: string;
  majorVersionId: string;
  componentId: string;
  specType: DocType;
  doc: {
    content: string;
    createdBy: User;
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

export const useDocById = (id?: string) => {
  return useFetch<Doc>(`/spec/${id}`, { stopFetch: !id });
};

export interface DocBody {
  specId: string;
  remark: string;
  content: string;
  demandId?: string;
}

export const useSaveDoc = () => {
  return useMutation<DocBody, any>('/doc', { method: 'POST' });
};

export interface DocHistory {
  remark: string;
  createdBy: User;
  demand?: Demand;
  createdAt: string;
  version?: string;
}

export const useDocHistory = (id: string) => {
  return useFetch<DocHistory[]>(`/spec/${id}/history`);
};

export const useDocContent = (query: { demandIds: string[] }) => {
  return useFetch<DocHistory[]>(`/doc`, { query });
};
