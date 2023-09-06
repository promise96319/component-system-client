'use client';

import { Modal, Space, Tooltip, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useState, useMemo } from 'react';
import IconComment from '@/assets/docs/comment.svg';
import IconDelete from '@/assets/docs/delete.svg';
import IconEdit from '@/assets/docs/edit.svg';
import { useUser } from '@/services';
import { User } from '@/services/common';
import { useEditorStore } from '@/store';
import { Editor, EditorViewer } from '../../rich-text-editor';
import { UserAvatar } from '../../user/avatar';

import 'quill/dist/quill.snow.css';
import './topic.scss';

export const Topic = (props: {
  id: string;
  user: Partial<User>;
  contentDelta: any[];
  updatedAt: Date | string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  commentCount: number;

  onSaveTopic?: (content: string, contentDelta: any[]) => Promise<boolean | undefined>;
  onUpdateContent?: (content: string, contentDelta: any[]) => Promise<boolean | undefined>;
  onRemove?: () => void;
}) => {
  const styleName = 'topic';
  const MemoizedEditor = useMemo(() => Editor, []);
  const MemoizedEditorViewer = useMemo(() => EditorViewer, []);

  const { id, user, contentDelta, updatedAt, children } = props;
  const { id: userId } = user || {};
  const [isEdit, setIsEdit] = useState(false);
  const [isCommentsShow, setIsCommentsShow] = useState(false);
  const setCurrentEditorId = useEditorStore((state) => state.setCurrentId);
  const { data: currentUser } = useUser();
  const editable = currentUser && currentUser.id === userId;

  const handleRemove = () => {
    Modal.confirm({
      title: '确定要删除评论吗？',
      onConfirm: props?.onRemove
    });
  };

  const viewer = (
    <section key="viewer" className={`${styleName}-viewer`}>
      <MemoizedEditorViewer id={id} contentDelta={contentDelta}></MemoizedEditorViewer>
      <Space align="center" className={`${styleName}-viewer-actions`} size={16}>
        <Typography.Text
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setIsCommentsShow(!isCommentsShow);
            setIsEdit(false);
          }}
        >
          <IconComment style={{ fontSize: 18, marginRight: 4 }}></IconComment>
          {isCommentsShow ? '收起评论' : props.commentCount > 0 ? props.commentCount : '添加评论'}
        </Typography.Text>
        {editable && (
          <Tooltip content="编辑">
            <Typography.Text
              style={{ cursor: 'pointer', fontSize: 18 }}
              onClick={() => {
                setIsEdit(true);
                setCurrentEditorId(id);
              }}
            >
              <IconEdit></IconEdit>
            </Typography.Text>
          </Tooltip>
        )}
        {editable && (
          <Tooltip content="删除">
            <Typography.Text style={{ cursor: 'pointer', fontSize: 18 }} onClick={handleRemove}>
              <IconDelete></IconDelete>
            </Typography.Text>
          </Tooltip>
        )}
      </Space>
    </section>
  );

  const editor = (
    <MemoizedEditor
      id={id}
      isEdit={isEdit}
      viewer={viewer}
      contentDelta={props.contentDelta}
      onEditChange={(isEdit) => {
        setIsEdit(isEdit);
      }}
      onSave={props.onUpdateContent}
    ></MemoizedEditor>
  );

  return (
    <section className={styleName}>
      <section className={`${styleName}-container`}>
        <div className={`${styleName}-header`}>
          <div className={`${styleName}-user`}>
            <UserAvatar src={user?.avatar} className={`${styleName}-user-avatar`}></UserAvatar>
            <div className={`${styleName}-user-info`}>
              <Typography.Text className={`${styleName}-user-name`}>{user?.nickname}</Typography.Text>
              <Typography.Text className={`${styleName}-user-time`} type="secondary">
                {dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
              </Typography.Text>
            </div>
          </div>
          <div className={`${styleName}-extra`}>{props.extra}</div>
        </div>
        {editor}
      </section>
      {isCommentsShow && <section className={`${styleName}-comments`}> {children}</section>}
    </section>
  );
};
