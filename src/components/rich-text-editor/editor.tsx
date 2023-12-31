'use client';

import { Button, Grid, Space } from '@arco-design/web-react';
import Quill from 'quill';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useEditorStore } from '@/store';

import 'quill/dist/quill.snow.css';
import './editor.scss';

interface EditorProps {
  id: string;
  isEdit?: boolean;
  viewer?: React.ReactNode;
  contentDelta?: any[];
  placeholder?: string;
  footer?: React.ReactNode;
  onEditChange?: (isEdit: boolean) => void;
  onSave?: (content: string, contentDelta: any[]) => Promise<boolean | undefined>;
}

export const Editor = forwardRef(
  (
    props: {
      id: string;
      isEdit?: boolean;
      viewer?: React.ReactNode;
      contentDelta?: any[];
      placeholder?: string;
      footer?: React.ReactNode;
      onEditChange?: (isEdit: boolean) => void;
      onSave?: (content: string, contentDelta: any[]) => Promise<boolean | undefined>;
    },
    ref
  ) => {
    const { isEdit = false, viewer = null, contentDelta = [], id } = props;
    const styleName = 'editor';
    const editor = useRef<Quill>();
    const currentId = useEditorStore((state) => state.currentId);

    useImperativeHandle(ref, () => {
      return {
        getEditor: () => editor.current,
        getText: () => editor.current?.getText() ?? '',
        getContents: () => editor.current?.getContents().ops ?? [],
        clear: () => editor.current?.setContents([] as any)
      };
    });

    useEffect(() => {
      if (!isEdit || currentId !== id) {
        return;
      }
      editor.current = new Quill(`.${styleName}-container-${id}`, {
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }, { size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image']
          ]
        },
        theme: 'snow',
        placeholder: props.placeholder
      });
      editor.current.setContents(contentDelta as any);
      editor.current.setSelection(editor.current.getLength(), 0);
    }, [isEdit, id, currentId]);

    const handleSaveContent = async () => {
      const success = await props.onSave?.(editor.current?.getText() ?? '', editor.current?.getContents().ops ?? []);
      if (success) {
        props.onEditChange?.(false);
      }
    };

    if (!isEdit || currentId !== id) {
      return viewer;
    }

    return (
      <div key={id} className={styleName}>
        <div
          className={`${styleName}-container ${styleName}-container-${id}`}
          onClick={() => editor.current?.focus()}
        ></div>
        {props.footer !== undefined ? (
          props.footer
        ) : (
          <Grid.Row justify="end" className={`${styleName}-actions`}>
            <Space>
              <Button size="small" onClick={() => props.onEditChange?.(false)}>
                取消
              </Button>
              <Button size="small" type="primary" onClick={handleSaveContent}>
                发布
              </Button>
            </Space>
          </Grid.Row>
        )}
      </div>
    );
  }
);

Editor.displayName = 'Editor';

export const EditorWrapper = ({ editorRef, ...props }: EditorProps & { editorRef?: any }) => {
  return <Editor ref={editorRef} {...props}></Editor>;
};
