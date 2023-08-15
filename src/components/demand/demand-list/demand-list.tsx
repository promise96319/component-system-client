'use client';

import { Message, Card, Divider, Grid, Tag } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';
import { Comment } from '@/components';
import { DemandComment, DemandStatus } from '@/services/common';
import {
  DemandCommentBody,
  DemandWithComments,
  useCreateDemandComment,
  useRemoveDemand,
  useRemoveDemandComment,
  useUpdateDemand,
  useUpdateDemandComment
} from '@/services/demand';

import './demand-list.scss';

export const DemandList = (props: { demands: DemandWithComments[]; onUpdateDemands: () => Promise<any> }) => {
  const styleName = 'demand-list';

  const { trigger: updateDemand, error: updateDemandError, isMutating: isUpdatingDemand } = useUpdateDemand();
  const {
    trigger: addDemandComment,
    error: addDemandCommentError,
    isMutating: isAddingComment
  } = useCreateDemandComment();
  const {
    trigger: updateDemandComment,
    error: updateDemandCommentError,
    isMutating: isUpdateingDemandComment
  } = useUpdateDemandComment();
  const { trigger: removeDemand, error: removeDemandError, isMutating: isRemovingDemand } = useRemoveDemand();
  const {
    trigger: removeDemandComment,
    error: removeDemandCommentError,
    isMutating: isRemovingComment
  } = useRemoveDemandComment();

  const handleUpdateDemand = async (id: string, content: string, contentDelta: any[]) => {
    console.log('contentDelta', contentDelta);
    if (isUpdatingDemand) {
      return;
    }

    if (!content) {
      Message.error('请输入需求内容');
      return;
    }
    await updateDemand({
      id,
      content,
      contentDelta
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

  const handleUpdateDemandComment = async (id: string, content: string, contentDelta: any[]) => {
    if (isUpdateingDemandComment) {
      return;
    }

    if (!content) {
      Message.error('请输入评论内容');
      return;
    }
    await updateDemandComment({
      id,
      content,
      contentDelta
    });

    if (updateDemandCommentError) {
      return;
    }

    Message.success('编辑成功');
    await props.onUpdateDemands?.();
    return true;
  };

  const handleRemoveDemand = async (id: string) => {
    if (isRemovingDemand) {
      return;
    }

    await removeDemand({ id });

    if (removeDemandError) {
      return;
    }

    Message.success('删除成功');
    await props.onUpdateDemands?.();
    return true;
  };

  const handleRemoveDemandComment = async (id: string) => {
    if (isRemovingComment) {
      return;
    }

    await removeDemandComment({ id });

    if (removeDemandCommentError) {
      return;
    }

    Message.success('删除成功');
    await props.onUpdateDemands?.();
    return true;
  };

  const renderComments = (comments: DemandComment[]) => {
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
              onUpdateContent={(content, contentDelta) => handleUpdateDemandComment(comment.id, content, contentDelta)}
              onSaveComment={(content, contentDelta) =>
                handleCreateDemandComment({
                  demandId: comment.demandId,
                  commentId: comment.id,
                  content,
                  contentDelta
                })
              }
              onRemove={() => handleRemoveDemandComment(comment.id)}
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
            <Card key={demand.id} style={{ marginTop: 24 }} id={`${demand.no}`}>
              <Grid.Row className="mb-px-8">
                <Tag color="blue" className="mr-px-8">
                  #{demand.no}
                </Tag>
                <Tag color={demand.status === DemandStatus.CLOSED ? 'red' : 'green'}>
                  {demand.status === DemandStatus.CLOSED ? `已解决(v${demand.versionId})` : '待解决'}
                </Tag>
              </Grid.Row>
              <Comment
                id={demand.id}
                username={demand.createdBy.nickname ?? ''}
                userId={demand.createdBy.id ?? ''}
                contentDelta={demand.contentDelta ?? []}
                updatedAt={demand.updatedAt ?? ''}
                onUpdateContent={(content, contentDelta) => handleUpdateDemand(demand.id, content, contentDelta)}
                onSaveComment={(content, contentDelta) =>
                  handleCreateDemandComment({
                    demandId: demand.id,
                    content,
                    contentDelta
                  })
                }
                onRemove={() => handleRemoveDemand(demand.id)}
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
