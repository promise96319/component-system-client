'use client';

import { Button, Grid, Space } from '@arco-design/web-react';
import { useEffect, useRef } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';
import './editor.scss';

export const Editor = (props: {
  content?: string;
  onEditChange?: (isEdit: boolean) => void;
  onSave?: (content: string) => Promise<boolean | undefined>;
}) => {
  const styleName = 'editor';
  const editor = useRef<Quill>();

  useEffect(() => {
    editor.current = new Quill(`.${styleName}-container`, {
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image']
        ]
      },
      theme: 'snow'
    });
    editor.current.setText(props.content ?? '');
  });

  const handleSaveContent = async () => {
    const success = await props.onSave?.(editor.current?.getText() ?? '');
    if (success) {
      props.onEditChange?.(false);
    }
  };

  return (
    <div key="editor" className={styleName}>
      <div className={`${styleName}-container`}></div>
      <Grid.Row justify="end" className={`${styleName}-actions`}>
        <Space>
          <Button size="small" onClick={() => props.onEditChange?.(false)}>
            取消
          </Button>
          <Button size="small" type="primary" onClick={handleSaveContent}>
            保存
          </Button>
        </Space>
      </Grid.Row>
    </div>
  );
};
