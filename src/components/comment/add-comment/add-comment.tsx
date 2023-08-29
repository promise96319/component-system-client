'use client';

import './add-comment.scss';

import { Grid, Input } from '@arco-design/web-react';
import { useMemo, useState } from 'react';
import { useUser } from '@/services';
import { useEditorStore } from '@/store';
import { Editor } from '../../rich-text-editor';
import { UserAvatar } from '../../user';

export const AddComment = (props: {
  onSaveComment?: (content: string, contentDelta: any[]) => Promise<boolean | undefined>;
}) => {
  const styleName = 'add-comment';
  const [isAddComment, setIsAddComment] = useState(false);
  const setCurrentEditorId = useEditorStore((state) => state.setCurrentId);
  const MemoizedEditor = useMemo(() => Editor, []);
  const { data: user } = useUser();

  const editor = (
    <MemoizedEditor
      id="add-comment"
      isEdit={isAddComment}
      viewer={
        <Input
          onFocus={() => {
            setIsAddComment(true);
            setCurrentEditorId('add-comment');
          }}
          placeholder="请输入你的评论"
        ></Input>
      }
      onEditChange={(isEdit) => setIsAddComment(isEdit)}
      onSave={props.onSaveComment}
    ></MemoizedEditor>
  );

  return (
    <div className={styleName}>
      <Grid.Row>
        <div className={`${styleName}-avatar`}>
          <UserAvatar src={user?.avatar} size={24}></UserAvatar>
        </div>
        <div className={`${styleName}-editor`}>{editor}</div>
      </Grid.Row>
    </div>
  );
};
