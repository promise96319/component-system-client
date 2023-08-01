'use client';

import { useEffect, useRef } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';
import './editor-viewer.scss';

export const EditorViewer = (props: { id: string; contentDelta?: any[] }) => {
  const { contentDelta = [], id } = props;
  const styleName = 'editor-viewer';
  const editor = useRef<Quill>();

  useEffect(() => {
    if (!editor.current) {
      editor.current = new Quill(`.${styleName}-container-${id}`, {
        modules: {
          toolbar: false
        },
        theme: 'snow'
      });
    }
    editor.current.setContents(contentDelta as any);
    editor.current.enable(false);
  }, [contentDelta, id]);

  return (
    <div key={id} className={styleName}>
      <div className={`${styleName}-container ${styleName}-container-${id}`}></div>
    </div>
  );
};
