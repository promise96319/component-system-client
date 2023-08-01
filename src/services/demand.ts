import { Demand, DemandComment, User, useFetch, useMutation } from './common';
import arrayToTree from 'array-to-tree';

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
  const { data, ...rest } = useFetch<DemandWithComments[]>('/demand', { query, stopFetch: !query.majorVersionId });

  const transformedData = (data ?? []).map((demand) => {
    return {
      ...demand,
      demandComments: arrayToTree(demand.demandComments ?? [], {
        parentProperty: 'commentId',
        customID: 'id',
        childrenProperty: 'comments'
      })
    };
  });

  return {
    data: transformedData,
    ...rest
  };
};

export const useCreateDemand = () => {
  return useMutation<Pick<Demand, 'majorVersionId' | 'componentId' | 'content'>, Demand>('/demand');
};

export const useUpdateDemand = () => {
  return useMutation<Pick<Demand, 'id' | 'content'>, Demand>('/demand', { method: 'PATCH' });
};

export interface DemandCommentBody {
  demandId: string;
  commentId?: string;
  content: string;
}

export const useAddDemandComment = () => {
  return useMutation<DemandCommentBody, DemandComment>('/demand-comment');
};

export const useUpdateDemandComment = () => {
  return useMutation<Pick<DemandComment, 'id' | 'content'>, DemandComment>('/demand-comment', { method: 'PATCH' });
};
