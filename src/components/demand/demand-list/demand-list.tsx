'use client';

import {
  DemandCommentBody,
  DemandWithComments,
  useAddDemandComment,
  useDemands,
  useUpdateDemand,
  useUpdateDemandComment
} from '@/services/demand';
import { Comment } from '@/components';
import { Message, Card, Divider } from '@arco-design/web-react';
import { DemandComment } from '@/services/common';
import React from 'react';

import './demand-list.scss';

export const DemandList = (props: { demands: DemandWithComments[]; onUpdateDemands: () => Promise<any> }) => {
  const styleName = 'demand-list';

  const { trigger: updateDemand, error: updateDemandError, isMutating: isUpdatingDemand } = useUpdateDemand();
  const {
    trigger: addDemandComment,
    error: addDemandCommentError,
    isMutating: isAddingComment
  } = useAddDemandComment();
  const {
    trigger: updateDemandComment,
    error: updateDemandCommentError,
    isMutating: isUpdateingDemandComment
  } = useUpdateDemandComment();

  const handleUpdateDemand = async (id: string, content: string) => {
    if (isUpdatingDemand) {
      return;
    }

    if (!content) {
      Message.error('请输入需求内容');
      return;
    }
    await updateDemand({
      id,
      content
    });

    if (updateDemandError) {
      return;
    }

    Message.success('编辑成功');
    await props.onUpdateDemands?.();
    return true;
  };

  const handleCreateDemandComment = async (params: DemandCommentBody) => {
    if (isAddingComment) {
      return;
    }

    if (!params.content) {
      Message.error('请输入需求内容');
      return;
    }

    await addDemandComment(params);

    if (addDemandCommentError) {
      return;
    }

    await props.onUpdateDemands?.();
    Message.success('评论成功');
    return true;
  };

  const handleUpdateDemandComment = async (id: string, content: string) => {
    if (isUpdateingDemandComment) {
      return;
    }

    if (!content) {
      Message.error('请输入评论内容');
      return;
    }
    await updateDemandComment({
      id,
      content
    });

    if (updateDemandCommentError) {
      return;
    }

    Message.success('编辑成功');
    await props.onUpdateDemands?.();
    return true;
  };

  const renderComments = (comments: DemandComment[]) => {
    return comments.map((comment) => {
      return (
        <React.Fragment key={comment.id}>
          <Divider></Divider>
          <Comment
            id={comment.id}
            username={comment.createdBy?.nickname ?? ''}
            userId={comment.createdById ?? ''}
            content={comment.content}
            updatedAt={comment.updatedAt ?? ''}
            onUpdateContent={(content) => handleUpdateDemandComment(comment.id, content)}
            onSaveComment={(content) =>
              handleCreateDemandComment({
                demandId: comment.demandId,
                commentId: comment.id,
                content: content
              })
            }
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
        {props.demands.map((demand) => {
          return (
            <Card key={demand.id} style={{ marginTop: 24 }}>
              <Comment
                id={demand.id}
                username={demand.createdBy.nickname ?? ''}
                userId={demand.createdBy.id ?? ''}
                content={demand.content}
                updatedAt={demand.updatedAt ?? ''}
                onUpdateContent={(content) => handleUpdateDemand(demand.id, content)}
                onSaveComment={(content) =>
                  handleCreateDemandComment({
                    demandId: demand.id,
                    content: content
                  })
                }
              >
                {renderComments(demand.demandComments ?? [])}
              </Comment>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
