'use client';

import { Button, Form, Input, Message, Modal, Link as ArcoLink } from '@arco-design/web-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DemandSelect } from '@/components/demand';
import { useSaveDoc } from '@/services';
import { DemandStatus } from '@/services/common';
import { useDemands } from '@/services/demand';

export const UpdateModal = (props: {
  value: string;
  docId: string;
  doc: any;
  redirectUrl: string;
  majorVersionId: string;
}) => {
  const styleName = 'markdown-editor';

  const { value, docId, doc, redirectUrl, majorVersionId } = props;
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const { trigger: updateDoc, isMutating: isUpdatingDoc } = useSaveDoc();
  const { data: demands } = useDemands({
    majorVersionId,
    status: DemandStatus.OPENED
  });

  const router = useRouter();

  const handleSaveDoc = async () => {
    if (isUpdatingDoc) {
      return;
    }

    if (!value) {
      return Message.error('文档内容不能为空');
    }

    const res = await form.validate();
    if (!res) {
      return;
    }

    await updateDoc({
      baseDocId: doc?.doc?.id,
      specId: docId,
      remark: res.remark,
      content: value,
      demandId: res.demandId
    });

    setModalVisible(false);
    Message.success('更新成功');
    router.replace(redirectUrl);
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        更新文档
      </Button>

      <Modal visible={modalVisible} title="更新文档" onCancel={() => setModalVisible(false)} onConfirm={handleSaveDoc}>
        <Form form={form}>
          <Form.Item
            label="更新说明"
            field="remark"
            required
            rules={[
              {
                validator(value, cb) {
                  if (!value) {
                    cb('更新说明不能为空');
                  }
                  return cb();
                }
              }
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }}></Input.TextArea>
          </Form.Item>
          <Form.Item label="关联需求">
            <div className={`${styleName}-relate-issue`}>
              <Form.Item field="demandId" noStyle={true}>
                <DemandSelect mode={undefined} demands={demands}></DemandSelect>
              </Form.Item>
              <Link className={`${styleName}-open-issue`} href={`/docs/${doc?.componentId}/demand`} target="__blank">
                <Button type="text">提需求</Button>
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
