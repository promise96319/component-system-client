import { Discussion, DiscussionComment, User, useFetch, useMutation } from './common';
import arrayToTree from 'array-to-tree';

export interface DiscussionQuery {
  majorVersionId?: string;
  componentId?: string;
  no?: string;
  content?: string;
}

export interface DiscussionWithComments extends Discussion {
  createdBy: User;
  discussionComments: DiscussionComment[];
}

export const useDiscussions = (query: DiscussionQuery) => {
  const { data, ...rest } = useFetch<DiscussionWithComments[]>(
    '/discussion',
    { query, stopFetch: !query.majorVersionId },
    { keepPreviousData: true }
  );

  const transformedData = (data ?? []).map((discussion) => {
    return {
      ...discussion,
      discussionComments: arrayToTree(discussion.discussionComments ?? [], {
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

export const useCreateDiscussion = () => {
  return useMutation<Pick<Discussion, 'majorVersionId' | 'componentId' | 'content' | 'contentDelta'>, Discussion>(
    '/discussion'
  );
};

export const useUpdateDiscussion = () => {
  return useMutation<Pick<Discussion, 'id' | 'content' | 'contentDelta'>, Discussion>('/discussion', {
    method: 'PATCH'
  });
};

export const useRemoveDiscussion = () => {
  return useMutation<Pick<Discussion, 'id'>, Discussion>('/discussion', { method: 'DELETE' });
};

export interface DiscussionCommentBody {
  discussionId: string;
  commentId?: string;
  content: string;
  contentDelta: any[];
}

export const useCreateDiscussionComment = () => {
  return useMutation<DiscussionCommentBody, DiscussionComment>('/discussion-comment');
};

export const useUpdateDiscussionComment = () => {
  return useMutation<Pick<DiscussionComment, 'id' | 'content' | 'contentDelta'>, DiscussionComment>(
    '/discussion-comment',
    {
      method: 'PATCH'
    }
  );
};

export const useRemoveDiscussionComment = () => {
  return useMutation<Pick<DiscussionComment, 'id'>, DiscussionComment>('/discussion-comment', { method: 'DELETE' });
};
