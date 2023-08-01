'use client';

import { useState } from 'react';
import { Input, Message } from '@arco-design/web-react';
import { Editor } from '../../editor/editor';
import { useEditorStore } from '@/store';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useCreateDiscussion } from '@/services/discussion';

export const CreateDiscussion = (props: { componentId: string; onCreated?: () => Promise<any> }) => {
  const [isAddDiscussion, setIsAddDiscussion] = useState(false);
  const setCurrentEditorId = useEditorStore((state) => state.setCurrentId);
  const componentId = props.componentId;
  const [majorVersionId] = useMajorVersionId();

  const {
    trigger: createDiscussion,
    error: createDiscussionError,
    isMutating: isCreatingDiscussion
  } = useCreateDiscussion();

  const handleCreateDiscussion = async (content: string, contentDelta: any[]) => {
    if (isCreatingDiscussion) {
      return;
    }

    if (!content) {
      Message.error('请输入讨论内容');
      return;
    }

    await createDiscussion({
      majorVersionId,
      componentId,
      content,
      contentDelta
    });

    if (createDiscussionError) {
      return;
    }

    Message.success('提交成功');
    await props.onCreated?.();
    return true;
  };

  return (
    <Editor
      id="add-discussion"
      isEdit={isAddDiscussion}
      viewer={
        <Input.TextArea
          rows={3}
          onFocus={() => {
            setIsAddDiscussion(true);
            setCurrentEditorId('add-discussion');
          }}
          placeholder="请填写讨论内容"
        ></Input.TextArea>
      }
      onEditChange={(isEdit) => setIsAddDiscussion(isEdit)}
      onSave={handleCreateDiscussion}
    ></Editor>
  );
};
