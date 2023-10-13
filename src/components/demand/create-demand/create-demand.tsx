'use client';

import { Message, Modal, Button } from '@arco-design/web-react';
import { useRef, useState } from 'react';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useCreateDemand } from '@/services/demand';
import { useEditorStore } from '@/store';
import { Editor } from '../../rich-text-editor';
import './create-demand.scss';

export const CreateDemand = (props: { componentId: string; onCreated?: () => Promise<any> }) => {
  const styleName = 'create-demand';

  const [isAddDemand, setIsAddDemand] = useState(false);
  const setCurrentEditorId = useEditorStore((state) => state.setCurrentId);
  const componentId = props.componentId;
  const [majorVersionId] = useMajorVersionId();

  const editorRef = useRef<any>();

  const { trigger: createDemand, isMutating: isCreatingDemand } = useCreateDemand();

  const handleCreateDemand = async () => {
    const content = editorRef.current?.getText();
    const contentDelta = editorRef.current?.getContents();

    if (isCreatingDemand) {
      return;
    }

    if (!content.replaceAll('\n', '').trim()) {
      Message.error('请输入需求内容');
      return;
    }

    await createDemand({
      majorVersionId,
      componentId,
      content,
      contentDelta
    });

    Message.success('保存成功');
    setIsAddDemand(false);
    editorRef.current?.clear();
    await props.onCreated?.();
    return true;
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsAddDemand(true);
          setCurrentEditorId('add-demand');
        }}
      >
        提需求
      </Button>

      <Modal
        className={`${styleName}-modal`}
        title="提需求"
        visible={isAddDemand}
        onCancel={() => setIsAddDemand(false)}
        onOk={handleCreateDemand}
        okText="保存"
        style={{ width: 680 }}
      >
        <Editor
          editorRef={editorRef}
          id="add-demand"
          placeholder="请输入需求内容"
          isEdit={true}
          footer={null}
          onEditChange={(isEdit) => setIsAddDemand(isEdit)}
          onSave={handleCreateDemand}
        ></Editor>
      </Modal>
    </>
  );
};
