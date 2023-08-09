'use client';

import { Button, Form, Input, Link, Message, Modal, Select, Typography } from '@arco-design/web-react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import { throttle } from 'lodash-es';
import { useParams } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { CodeDependency, codeRuntimePlugin } from '@/components/code-runner';
import { DemandSelect } from '@/components/demand';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import doc from '@/mock/template.md';
import { useComponent, useMajorVersion, useSaveDoc } from '@/services';
import { DemandStatus } from '@/services/common';
import { useDemands } from '@/services/demand';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import './page.scss';
import '@/styles/markdown.scss';

export default function MarkdownEditor() {
  const styleName = 'markdown-editor';

  const [value, setValue] = useState(doc);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { docId } = useParams();

  const [majorVersionId] = useMajorVersionId();
  const { data: majorVersion } = useMajorVersion(majorVersionId);
  const { componentId } = useParams();
  const { data: component } = useComponent(majorVersionId, componentId);
  const { trigger: updateDoc, error: updateDocError, isMutating: isUpdatingDoc } = useSaveDoc();
  const { data: demands } = useDemands({
    majorVersionId,
    status: DemandStatus.OPENED
  });

  const handleChange = throttle((val: string) => setValue(val), 1000);

  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion.majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion.majorVersion)] : [];
  const dependency = <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;

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
      specId: docId,
      remark: res.remark,
      content: value,
      demandId: res.demandId
    });
    if (!updateDocError) {
      setModalVisible(false);
      Message.success('更新成功');
    }
  };

  return (
    <div className={styleName}>
      <header className={`${styleName}-header`}>
        <Typography.Title heading={3}>{component?.description}</Typography.Title>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          更新文档
        </Button>

        <Modal
          visible={modalVisible}
          title="更新文档"
          onCancel={() => setModalVisible(false)}
          onConfirm={handleSaveDoc}
        >
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
              <Input.TextArea></Input.TextArea>
            </Form.Item>
            <Form.Item label="关联需求">
              <div className={`${styleName}-relate-issue`}>
                <Form.Item field="demandId" noStyle={true}>
                  <DemandSelect mode={undefined} demands={demands}></DemandSelect>
                </Form.Item>
                <Link className={`${styleName}-open-issue`} href={`/docs/${componentId}/demand`}>
                  提需求
                </Link>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </header>

      <main className={`${styleName}-container`}>
        {dependency}

        <Editor
          mode="auto"
          value={value}
          onChange={handleChange}
          // TODO: 图片上传
          uploadImages={(files: any[]) => {
            return Promise.resolve([
              {
                title: 'guanghui',
                url: 'https://p3-passport.byteimg.com/img/user-avatar/7bfe5fcd764682d97401eae5d338c64e~100x100.awebp',
                alt: 'guanghui'
              }
            ]);
          }}
          plugins={[gfm(), codeRuntimePlugin({ jsDependencies: designJsDependency }), highlight()]}
        />
      </main>
    </div>
  );
}
