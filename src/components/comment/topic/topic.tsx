'use client';

import { Modal, Space, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useState, useMemo } from 'react';
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
  commentCount?: number;

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
      <Space align="center" className={`${styleName}-viewer-actions`} size={12}>
        <Typography.Text
          style={{ cursor: 'pointer' }}
          type="secondary"
          onClick={() => {
            setIsCommentsShow(!isCommentsShow);
            setIsEdit(false);
          }}
        >
          {isCommentsShow ? '收起评论' : '查看评论'}
          {props.commentCount ? `(${props.commentCount})` : ''}
        </Typography.Text>
        {editable && (
          <Typography.Text
            style={{ cursor: 'pointer' }}
            type="secondary"
            onClick={() => {
              setIsEdit(true);
              setCurrentEditorId(id);
            }}
          >
            编辑
          </Typography.Text>
        )}
        {editable && (
          <Typography.Text style={{ cursor: 'pointer' }} type="secondary" onClick={handleRemove}>
            删除
          </Typography.Text>
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
