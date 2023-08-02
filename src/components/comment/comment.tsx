'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import { Grid, Modal, Space, Typography } from '@arco-design/web-react';
import { useState, useMemo } from 'react';
import { Editor, EditorViewer } from '../editor';
import { useEditorStore } from '@/store';
import { useUser } from '@/services';

import 'quill/dist/quill.snow.css';
import './comment.scss';

export const Comment = (props: {
  id: string;
  username: string;
  userId: string;
  contentDelta: any[];
  updatedAt: Date | string;
  children: React.ReactNode;

  onSaveComment?: (content: string, contentDelta: any[]) => Promise<boolean | undefined>;
  onUpdateContent?: (content: string, contentDelta: any[]) => Promise<boolean | undefined>;
  onRemove?: () => void;
}) => {
  const styleName = 'comment';
  const MemoizedEditor = useMemo(() => Editor, []);
  const MemoizedEditorViewer = useMemo(() => EditorViewer, []);

  const { id, username, userId, contentDelta, updatedAt, children } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [isReplyEdit, setIsReplyEdit] = useState(false);
  const setCurrentEditorId = useEditorStore((state) => state.setCurrentId);
  const currentEditorId = useEditorStore((state) => state.currentId);
  const { data: user } = useUser();
  const editable = user && user.id === userId;

  const handleRemove = () => {
    Modal.confirm({
      title: '确定要删除评论吗？',
      onConfirm: props?.onRemove
    });
  };

  const replayEditor = (
    <MemoizedEditor
      id={`reply-${id}`}
      isEdit={isReplyEdit}
      onEditChange={(isEdit) => {
        setIsReplyEdit(isEdit);
        setIsEdit(false);
      }}
      onSave={props.onSaveComment}
    ></MemoizedEditor>
  );

  const viewer = (
    <Space key="viewer" direction="vertical" style={{ marginTop: 8 }}>
      <Typography.Text type="secondary" className={`${styleName}-user`}>
        {username} 发表：
      </Typography.Text>
      {/* <Typography.Text style={{ whiteSpace: 'pre' }}>{contentDelta}</Typography.Text> */}
      <MemoizedEditorViewer id={id} contentDelta={contentDelta}></MemoizedEditorViewer>
      <Space align="center" className={`${styleName}-actions`} size={12}>
        <Typography.Text
          style={{ cursor: 'pointer' }}
          type="secondary"
          onClick={() => {
            setIsReplyEdit(true);
            setIsEdit(false);
            setCurrentEditorId(`reply-${id}`);
          }}
        >
          回复
        </Typography.Text>
        {editable && (
          <Typography.Text
            style={{ cursor: 'pointer' }}
            type="secondary"
            onClick={() => {
              setIsEdit(true);
              setIsReplyEdit(false);
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
        <Typography.Text type="secondary">{dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Typography.Text>
      </Space>

      {isReplyEdit && currentEditorId === `reply-${id}` && (
        <Grid.Row style={{ marginTop: 16 }}>
          <Image className={`${styleName}-avatar`} src="/avatar.png" alt="avatar" width={32} height={32}></Image>
          <div className={`${styleName}-reply`}>{replayEditor}</div>
        </Grid.Row>
      )}
    </Space>
  );

  const editor = (
    <MemoizedEditor
      id={id}
      isEdit={isEdit}
      viewer={viewer}
      contentDelta={props.contentDelta}
      onEditChange={(isEdit) => {
        setIsEdit(isEdit);
        setIsReplyEdit(false);
      }}
      onSave={props.onUpdateContent}
    ></MemoizedEditor>
  );

  return (
    <div className={styleName}>
      <Grid.Row>
        <Image className={`${styleName}-avatar`} src="/avatar.png" alt="avatar" width={32} height={32}></Image>
        <div style={{ flex: 1 }}>
          {editor}
          {children}
        </div>
      </Grid.Row>
    </div>
  );
};
