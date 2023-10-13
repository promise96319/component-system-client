'use client';

import './create-discussion.scss'
import { Button, Modal, Message } from '@arco-design/web-react';
import { useRef, useState } from 'react';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useCreateDiscussion } from '@/services/discussion';
import { useEditorStore } from '@/store';
import { Editor } from '../../rich-text-editor';

export const CreateDiscussion = (props: { componentId: string; onCreated?: () => Promise<any> }) => {
  const styleName = 'create-discussion';

  const [isAddDiscussion, setIsAddDiscussion] = useState(false);
  const setCurrentEditorId = useEditorStore((state) => state.setCurrentId);
  const componentId = props.componentId;
  const [majorVersionId] = useMajorVersionId();
  const editorRef = useRef<any>();

  const { trigger: createDiscussion, isMutating: isCreatingDiscussion } = useCreateDiscussion();

  const handleCreateDiscussion = async () => {
    const content = editorRef.current?.getText();
    const contentDelta = editorRef.current?.getContents();

    if (isCreatingDiscussion) {
      return;
    }

    if (!content.replaceAll('\n', '').trim()) {
      Message.error('请输入讨论内容');
      return;
    }

    await createDiscussion({
      majorVersionId,
      componentId,
      content,
      contentDelta
    });

    Message.success('保存成功');
    setIsAddDiscussion(false);
    editorRef.current?.clear();
    await props.onCreated?.();
    return true;
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsAddDiscussion(true);
          setCurrentEditorId('add-discussion');
        }}
      >
        发起讨论
      </Button>

      <Modal
        className={`${styleName}-modal`}
        title="发起讨论"
        visible={isAddDiscussion}
        onCancel={() => setIsAddDiscussion(false)}
        onOk={handleCreateDiscussion}
        okText="保存"
        style={{ width: 680 }}
      >
        <Editor
          editorRef={editorRef}
          id="add-discussion"
          placeholder="请输入讨论内容"
          footer={null}
          isEdit={true}
          onEditChange={(isEdit) => setIsAddDiscussion(isEdit)}
        ></Editor>
      </Modal>
    </>
  );
};
