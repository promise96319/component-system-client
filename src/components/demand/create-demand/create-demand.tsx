'use client';

import { Input, Message } from '@arco-design/web-react';
import { useMemo, useState } from 'react';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useCreateDemand } from '@/services/demand';
import { useEditorStore } from '@/store';
import { Editor } from '../../editor';

export const CreateDemand = (props: { componentId: string; onCreated?: () => Promise<any> }) => {
  const [isAddDemand, setIsAddDemand] = useState(false);
  const setCurrentEditorId = useEditorStore((state) => state.setCurrentId);
  const componentId = props.componentId;
  const [majorVersionId] = useMajorVersionId();
  const MemoizedEditor = useMemo(() => Editor, []);

  const { trigger: createDemand, error: createDemandError, isMutating: isCreatingDemand } = useCreateDemand();

  const handleCreateDemand = async (content: string, contentDelta: any[]) => {
    if (isCreatingDemand) {
      return;
    }

    if (!content) {
      Message.error('请输入需求内容');
      return;
    }

    await createDemand({
      majorVersionId,
      componentId,
      content,
      contentDelta
    });

    if (createDemandError) {
      return;
    }

    Message.success('提交成功');
    await props.onCreated?.();
    return true;
  };

  return (
    <MemoizedEditor
      id="add-demand"
      isEdit={isAddDemand}
      viewer={
        <Input.TextArea
          rows={3}
          onFocus={() => {
            setIsAddDemand(true);
            setCurrentEditorId('add-demand');
          }}
          placeholder="请填写需求内容"
        ></Input.TextArea>
      }
      onEditChange={(isEdit) => setIsAddDemand(isEdit)}
      onSave={handleCreateDemand}
    ></MemoizedEditor>
  );
};
