'use client';

import { CodeDependency, JSDependency, codeRuntimePlugin } from '@/components/code-runner';
import React from 'react';
import { Editor } from '@bytemd/react';
import { useState } from 'react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { throttle } from 'lodash-es';
import doc from '@/mock/template.md';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useParams } from 'next/navigation';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import './page.scss';
import '@/styles/markdown.scss';
import { useComponent } from '@/services';
import { Button, Form, Input, Link, Modal, Select, Space } from '@arco-design/web-react';

export default function APIDoc() {
  const styleName = 'editor';
  const [value, setValue] = useState(doc);
  const [modalVisible, setModalVisible] = useState(false);
  const [majorVersionId] = useMajorVersionId();
  const { componentId } = useParams();
  const { data: component } = useComponent(majorVersionId, componentId);

  const handleChange = throttle((val: string) => setValue(val), 1000);

  const jsDependencies: JSDependency[] = [
    {
      module: 'esm',
      url: 'http://localhost:8080/dist/index.js',
      globalName: 'QtDesign',
      importName: '@qt/design'
    }
  ];

  return (
    <div className={styleName}>
      <header className={`${styleName}-header`}>
        <h1>{component?.description}</h1>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          更新文档
        </Button>
        <Modal visible={modalVisible} title="更新文档" onCancel={() => setModalVisible(false)}>
          <Form>
            <Form.Item label="更新说明" field="description" required>
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
        <CodeDependency cssDependencies={['http://localhost:8080/dist/index.css']} jsDependencies={jsDependencies} />

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
