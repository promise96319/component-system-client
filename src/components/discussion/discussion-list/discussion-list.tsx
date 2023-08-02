'use client';

import { Message, Card, Divider } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';
import { Comment } from '@/components';
import { DiscussionComment } from '@/services/common';
import {
  DiscussionCommentBody,
  DiscussionWithComments,
  useCreateDiscussionComment,
  useRemoveDiscussion,
  useRemoveDiscussionComment,
  useUpdateDiscussion,
  useUpdateDiscussionComment
} from '@/services/discussion';

import './discussion-list.scss';

export const DiscussionList = (props: {
  discussions: DiscussionWithComments[];
  onUpdateDiscussions: () => Promise<any>;
}) => {
  const styleName = 'discussion-list';

  const {
    trigger: updateDiscussion,
    error: updateDiscussionError,
    isMutating: isUpdatingDiscussion
  } = useUpdateDiscussion();
  const {
    trigger: addDiscussionComment,
    error: addDiscussionCommentError,
    isMutating: isAddingComment
  } = useCreateDiscussionComment();
  const {
    trigger: updateDiscussionComment,
    error: updateDiscussionCommentError,
    isMutating: isUpdateingDiscussionComment
  } = useUpdateDiscussionComment();
  const {
    trigger: removeDiscussion,
    error: removeDiscussionError,
    isMutating: isRemovingDiscussion
  } = useRemoveDiscussion();
  const {
    trigger: removeDiscussionComment,
    error: removeDiscussionCommentError,
    isMutating: isRemovingComment
  } = useRemoveDiscussionComment();

  const handleUpdateDiscussion = async (id: string, content: string, contentDelta: any[]) => {
    if (isUpdatingDiscussion) {
      return;
    }

    if (!content) {
      Message.error('请输入需求内容');
      return;
    }
    await updateDiscussion({
      id,
      content,
      contentDelta
    });

    if (updateDiscussionError) {
      return;
    }

    Message.success('编辑成功');
    await props.onUpdateDiscussions?.();
    return true;
  };

  const handleCreateDiscussionComment = async (params: DiscussionCommentBody) => {
    if (isAddingComment) {
      return;
    }

    if (!params.content) {
      Message.error('请输入需求内容');
      return;
    }

    await addDiscussionComment(params);

    if (addDiscussionCommentError) {
      return;
    }

    await props.onUpdateDiscussions?.();
    Message.success('评论成功');
    return true;
  };

  const handleUpdateDiscussionComment = async (id: string, content: string, contentDelta: any[]) => {
    if (isUpdateingDiscussionComment) {
      return;
    }

    if (!content) {
      Message.error('请输入评论内容');
      return;
    }
    await updateDiscussionComment({
      id,
      content,
      contentDelta
    });

    if (updateDiscussionCommentError) {
      return;
    }

    Message.success('编辑成功');
    await props.onUpdateDiscussions?.();
    return true;
  };

  const handleRemoveDiscussion = async (id: string) => {
    if (isRemovingDiscussion) {
      return;
    }

    await removeDiscussion({ id });

    if (removeDiscussionError) {
      return;
    }

    Message.success('删除成功');
    await props.onUpdateDiscussions?.();
    return true;
  };

  const handleRemoveDiscussionComment = async (id: string) => {
    if (isRemovingComment) {
      return;
    }

    await removeDiscussionComment({ id });

    if (removeDiscussionCommentError) {
      return;
    }

    Message.success('删除成功');
    await props.onUpdateDiscussions?.();
    return true;
  };

  const renderComments = (comments: DiscussionComment[]) => {
    return comments
      .sort((a, b) => (dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1))
      .map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <Divider></Divider>
            <Comment
              id={comment.id}
              username={comment.createdBy?.nickname ?? ''}
              userId={comment.createdById ?? ''}
              contentDelta={comment.contentDelta ?? []}
              updatedAt={comment.updatedAt ?? ''}
              onUpdateContent={(content, contentDelta) =>
                handleUpdateDiscussionComment(comment.id, content, contentDelta)
              }
              onSaveComment={(content, contentDelta) =>
                handleCreateDiscussionComment({
                  discussionId: comment.discussionId ?? '',
                  commentId: comment.id,
                  content,
                  contentDelta
                })
              }
              onRemove={() => handleRemoveDiscussionComment(comment.id)}
            >
              {renderComments(comment.comments ?? [])}
            </Comment>
          </React.Fragment>
        );
      });
  };

  return (
    <div className={styleName}>
      <div className={`${styleName}-list`}>
        {props.discussions.map((discussion) => {
          return (
            <Card key={discussion.id} style={{ marginTop: 24 }}>
              <Comment
                id={discussion.id}
                username={discussion.createdBy.nickname ?? ''}
                userId={discussion.createdBy.id ?? ''}
                contentDelta={discussion.contentDelta ?? []}
                updatedAt={discussion.updatedAt ?? ''}
                onUpdateContent={(content, contentDelta) =>
                  handleUpdateDiscussion(discussion.id, content, contentDelta)
                }
                onSaveComment={(content, contentDelta) =>
                  handleCreateDiscussionComment({
                    discussionId: discussion.id,
                    content,
                    contentDelta
                  })
                }
                onRemove={() => handleRemoveDiscussion(discussion.id)}
              >
                {renderComments(discussion.discussionComments ?? [])}
              </Comment>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
