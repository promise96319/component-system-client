'use client';

import dynamic from 'next/dynamic';

export const Editor = dynamic(() => import('./editor').then((mod) => mod.Editor), { ssr: false });
export const EditorViewer = dynamic(() => import('./editor-viewer/editor-viewer').then((mod) => mod.EditorViewer), {
  ssr: false
});
