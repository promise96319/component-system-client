'use client';

import { Message, Card, Grid, Tag, Empty } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';
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
import { Topic, Comment, AddComment } from '../../comment';

import './demand-list.scss';

export const DemandList = (props: { demands: DemandWithComments[]; onUpdateDemands: () => Promise<any> }) => {
  const styleName = 'demand-list';

  const { trigger: updateDemand, isMutating: isUpdatingDemand } = useUpdateDemand();
  const { trigger: addDemandComment, isMutating: isAddingComment } = useCreateDemandComment();
  const { trigger: updateDemandComment, isMutating: isUpdateingDemandComment } = useUpdateDemandComment();
  const { trigger: removeDemand, isMutating: isRemovingDemand } = useRemoveDemand();
  const { trigger: removeDemandComment, isMutating: isRemovingComment } = useRemoveDemandComment();

  const handleUpdateDemand = async (id: string, content: string, contentDelta: any[]) => {
    if (isUpdatingDemand) {
      return;
    }

    if (!content.replaceAll('\n', '').trim()) {
      Message.error('请输入需求内容');
      return;
    }
    await updateDemand({
      id,
      content,
      contentDelta
    });

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

    await props.onUpdateDemands?.();
    Message.success('评论成功');
    return true;
  };

  const handleUpdateDemandComment = async (id: string, content: string, contentDelta: any[]) => {
    if (isUpdateingDemandComment) {
      return;
    }

    if (!content.replaceAll('\n', '').trim()) {
      Message.error('请输入评论内容');
      return;
    }
    await updateDemandComment({
      id,
      content,
      contentDelta
    });

    Message.success('编辑成功');
    await props.onUpdateDemands?.();
    return true;
  };

  const handleRemoveDemand = async (id: string) => {
    if (isRemovingDemand) {
      return;
    }

    await removeDemand({ id });

    Message.success('删除成功');
    await props.onUpdateDemands?.();
    return true;
  };

  const handleRemoveDemandComment = async (id: string) => {
    if (isRemovingComment) {
      return;
    }

    await removeDemandComment({ id });

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
            <Comment
              id={comment.id}
              user={comment.createdBy ?? {}}
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

  if (!props.demands.length) {
    return <Empty description="暂无需求" style={{ marginTop: 128 }}></Empty>;
  }

  return (
    <div className={`${styleName}-container`}>
      <div className={`${styleName}`}>
        {props.demands.map((demand) => {
          return (
            <Card className={`${styleName}-item`} key={demand.id} style={{ marginTop: 24 }} id={`${demand.no}`}>
              <Topic
                id={demand.id}
                user={demand.createdBy ?? {}}
                contentDelta={demand.contentDelta ?? []}
                updatedAt={demand.updatedAt ?? ''}
                onUpdateContent={(content, contentDelta) => handleUpdateDemand(demand.id, content, contentDelta)}
                onSaveTopic={(content, contentDelta) =>
                  handleCreateDemandComment({
                    demandId: demand.id,
                    content,
                    contentDelta
                  })
                }
                onRemove={() => handleRemoveDemand(demand.id)}
                extra={
                  <Grid.Row>
                    <Tag color="blue" className="mr-px-8">
                      #{demand.no}
                    </Tag>
                    <Tag color={demand.status === DemandStatus.CLOSED ? 'red' : 'green'}>
                      {demand.status === DemandStatus.CLOSED ? `已解决(v${demand.versionId})` : '待解决'}
                    </Tag>
                  </Grid.Row>
                }
              >
                <section className={`${styleName}-comments`}>
                  <AddComment
                    onSaveComment={(content, contentDelta) =>
                      handleCreateDemandComment({
                        demandId: demand.id,
                        content,
                        contentDelta
                      })
                    }
                  ></AddComment>
                  {renderComments(demand.demandComments ?? [])}
                </section>
              </Topic>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
