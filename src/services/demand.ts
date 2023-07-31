import { Demand, DemandComment, User, useFetch, useMutation } from './common';

export interface DemandQuery {
  majorVersionId?: string;
  componentId?: string;
  no?: string;
  content?: string;
}

export interface DemandWithComments extends Demand {
  createdBy: User;
  demandComments: DemandComment[];
}

export const useDemands = (query: DemandQuery) => {
  return useFetch<DemandWithComments[]>('/demand', { query, stopFetch: !query.majorVersionId });
};

export const useCreateDemand = () => {
  return useMutation<Pick<Demand, 'majorVersionId' | 'componentId' | 'content'>, Demand>('/demand');
};

export const useUpdateDemand = () => {
  return useMutation<Pick<Demand, 'id' | 'content'>, Demand>('/demand', { method: 'patch' });
};
