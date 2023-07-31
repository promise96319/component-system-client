'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import { Grid, Modal, Space, Typography } from '@arco-design/web-react';
import { useState } from 'react';
import { Editor } from '../editor/editor';

import 'quill/dist/quill.snow.css';
import './comment.scss';

export const Comment = (props: {
  username: string;
  content: string;
  updatedAt: Date | string;
  children: React.ReactNode;
  editable?: boolean;

  onSaveComment?: () => Promise<boolean | undefined>;
  onUpdateContent?: (content: string) => Promise<boolean | undefined>;
  onRemove?: () => void;
}) => {
  const styleName = 'comment';
  const { username, content, updatedAt, children, editable = true } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [isReplyEdit, setIsReplyEdit] = useState(false);

  const handleRemove = () => {
    Modal.confirm({
      title: '确定要删除评论吗？',
      onConfirm: props?.onRemove
    });
  };

  const editor = (
    <Editor
      content={props.content}
      onEditChange={(isEdit) => {
        setIsEdit(isEdit);
        setIsReplyEdit(false);
      }}
      onSave={props.onUpdateContent}
    ></Editor>
  );
  const replayEditor = (
    <Editor
      onEditChange={(isEdit) => {
        setIsReplyEdit(isEdit);
        setIsEdit(false);
      }}
      onSave={props.onSaveComment}
    ></Editor>
  );

  const viewer = (
    <Space key="viewer" direction="vertical" style={{ marginTop: 8 }}>
      <Typography.Text type="secondary" className={`${styleName}-user`}>
        {username} 发表：
      </Typography.Text>
      <Typography.Text>{content}</Typography.Text>
      <Space align="center" className={`${styleName}-actions`} size={12}>
        <Typography.Text
          style={{ cursor: 'pointer' }}
          type="secondary"
          onClick={() => {
            setIsReplyEdit(true);
            setIsEdit(false);
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

      {children}

      {isReplyEdit && (
        <Grid.Row style={{ marginTop: 16 }}>
          <Image className={`${styleName}-avatar`} src="/avatar.png" alt="avatar" width={32} height={32}></Image>
          <div className={`${styleName}-reply`}>{replayEditor}</div>
        </Grid.Row>
      )}
    </Space>
  );

  return (
    <div className={styleName}>
      <Grid.Row>
        <Image className={`${styleName}-avatar`} src="/avatar.png" alt="avatar" width={32} height={32}></Image>
        {isEdit ? editor : viewer}
      </Grid.Row>
    </div>
  );
};
