'use client';

import dynamic from 'next/dynamic';

// https://stackoverflow.com/questions/63469232/forwardref-error-when-dynamically-importing-a-module-in-next-js
export const Editor = dynamic(() => import('./editor').then((mod) => mod.EditorWrapper), { ssr: false });
export const EditorViewer = dynamic(() => import('./editor-viewer/editor-viewer').then((mod) => mod.EditorViewer), {
  ssr: false
});
