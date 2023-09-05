'use client';

import { Message, Card } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';
import { Empty } from '@/components/empty/empty';
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
import { getTreeNodeCount } from '@/utils';
import { Topic, AddComment, Comment } from '../../comment';

import './discussion-list.scss';

export const DiscussionList = (props: {
  discussions: DiscussionWithComments[];
  onUpdateDiscussions: () => Promise<any>;
}) => {
  const styleName = 'discussion-list';

  const { trigger: updateDiscussion, isMutating: isUpdatingDiscussion } = useUpdateDiscussion();
  const { trigger: addDiscussionComment, isMutating: isAddingComment } = useCreateDiscussionComment();
  const { trigger: updateDiscussionComment, isMutating: isUpdateingDiscussionComment } = useUpdateDiscussionComment();
  const { trigger: removeDiscussion, isMutating: isRemovingDiscussion } = useRemoveDiscussion();
  const { trigger: removeDiscussionComment, isMutating: isRemovingComment } = useRemoveDiscussionComment();

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

    await props.onUpdateDiscussions?.();
    Message.success('评论成功');
    return true;
  };

  const handleUpdateDiscussionComment = async (id: string, content: string, contentDelta: any[]) => {
    if (isUpdateingDiscussionComment) {
      return;
    }

    if (!content.replaceAll('\n', '').trim()) {
      Message.error('请输入评论内容');
      return;
    }
    await updateDiscussionComment({
      id,
      content,
      contentDelta
    });

    Message.success('编辑成功');
    await props.onUpdateDiscussions?.();
    return true;
  };

  const handleRemoveDiscussion = async (id: string) => {
    if (isRemovingDiscussion) {
      return;
    }

    await removeDiscussion({ id });

    Message.success('删除成功');
    await props.onUpdateDiscussions?.();
    return true;
  };

  const handleRemoveDiscussionComment = async (id: string) => {
    if (isRemovingComment) {
      return;
    }

    await removeDiscussionComment({ id });

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
            <Comment
              id={comment.id}
              user={comment.createdBy ?? {}}
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

  if (!props.discussions.length) {
    return <Empty description="暂无讨论" style={{ marginTop: 128 }}></Empty>;
  }

  return (
    <div className={styleName}>
      <div className={`${styleName}-list`}>
        {props.discussions.map((discussion) => {
          return (
            <Card key={discussion.id} style={{ marginTop: 24 }} className={`${styleName}-item`}>
              <Topic
                id={discussion.id}
                user={discussion.createdBy ?? {}}
                contentDelta={discussion.contentDelta ?? []}
                commentCount={getTreeNodeCount(discussion.discussionComments ?? [], { children: 'comments' })}
                updatedAt={discussion.updatedAt ?? ''}
                onUpdateContent={(content, contentDelta) =>
                  handleUpdateDiscussion(discussion.id, content, contentDelta)
                }
                onSaveTopic={(content, contentDelta) =>
                  handleCreateDiscussionComment({
                    discussionId: discussion.id,
                    content,
                    contentDelta
                  })
                }
                onRemove={() => handleRemoveDiscussion(discussion.id)}
              >
                <section className={`${styleName}-comments`}>
                  <AddComment
                    onSaveComment={(content, contentDelta) =>
                      handleCreateDiscussionComment({
                        discussionId: discussion.id,
                        content,
                        contentDelta
                      })
                    }
                  ></AddComment>
                  {renderComments(discussion.discussionComments ?? [])}
                </section>
              </Topic>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
