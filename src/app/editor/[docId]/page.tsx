'use client';

import { Button, Form, Input, Link, Message, Modal, Select, Typography } from '@arco-design/web-react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import { throttle } from 'lodash-es';
import { useParams } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { CodeDependency, JSDependency, codeRuntimePlugin } from '@/components/code-runner';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import doc from '@/mock/template.md';
import { useComponent, useSaveDoc } from '@/services';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import './page.scss';
import '@/styles/markdown.scss';

export default function MarkdownEditor() {
  const styleName = 'markdown-editor';
  const [value, setValue] = useState(doc);
  const [modalVisible, setModalVisible] = useState(false);
  const [majorVersionId] = useMajorVersionId();
  const { componentId } = useParams();
  const { data: component } = useComponent(majorVersionId, componentId);
  const { trigger: updateDoc, error: updateDocError, isMutating: isUpdatingDoc } = useSaveDoc();

  const handleChange = throttle((val: string) => setValue(val), 1000);

  const jsDependencies: JSDependency[] = [
    {
      module: 'esm',
      url: 'http://ued.qingteng.cn:1042/qt-design/v3/index.js',
      globalName: 'QtDesign',
      importName: '@qt/design'
    }
  ];

  const handleSaveDoc = async () => {
    if (isUpdatingDoc) {
      return;
    }
    if (!value) {
      return Message.error('文档内容不能为空');
    }
    await updateDoc({
      specId: '64cb4b4542be876475c5ca90',
      remark: '初始化',
      content: value,
      demandIds: []
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
          <Form>
            <Form.Item label="更新说明" field="remark" required>
              <Input.TextArea></Input.TextArea>
            </Form.Item>
            <Form.Item label="关联需求">
              <div className={`${styleName}-relate-issue`}>
                <Form.Item field="issue" noStyle={true}>
                  <Select></Select>
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
        <CodeDependency
          cssDependencies={['http://ued.qingteng.cn:1042/qt-design/v3/index.css']}
          jsDependencies={jsDependencies}
        />

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
          plugins={[gfm(), codeRuntimePlugin({ jsDependencies }), highlight()]}
        />
      </main>
    </div>
  );
}
