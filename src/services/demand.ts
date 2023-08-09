import arrayToTree from 'array-to-tree';
import { Demand, DemandComment, DemandStatus, User, useFetch, useMutation } from './common';

export interface DemandQuery {
  majorVersionId?: string;
  componentId?: string;
  no?: string;
  content?: string;
  status?: DemandStatus;
}

export interface DemandWithComments extends Demand {
  createdBy: User;
  demandComments: DemandComment[];
}

export const useDemands = (query: DemandQuery) => {
  const { data, ...rest } = useFetch<DemandWithComments[]>(
    '/demand',
    { query, stopFetch: !query.majorVersionId },
    { keepPreviousData: true }
  );

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
  return useMutation<Pick<Demand, 'majorVersionId' | 'componentId' | 'content' | 'contentDelta'>, Demand>('/demand');
};

export const useUpdateDemand = () => {
  return useMutation<Pick<Demand, 'id' | 'content' | 'contentDelta'>, Demand>('/demand', { method: 'PATCH' });
};

export const useRemoveDemand = () => {
  return useMutation<Pick<Demand, 'id'>, Demand>('/demand', { method: 'DELETE' });
};

export interface DemandCommentBody {
  demandId: string;
  commentId?: string;
  content: string;
  contentDelta: any[];
}

export const useCreateDemandComment = () => {
  return useMutation<DemandCommentBody, DemandComment>('/demand-comment');
};

export const useUpdateDemandComment = () => {
  return useMutation<Pick<DemandComment, 'id' | 'content' | 'contentDelta'>, DemandComment>('/demand-comment', {
    method: 'PATCH'
  });
};

export const useRemoveDemandComment = () => {
  return useMutation<Pick<DemandComment, 'id'>, DemandComment>('/demand-comment', { method: 'DELETE' });
};
