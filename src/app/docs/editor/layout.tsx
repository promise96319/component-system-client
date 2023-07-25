/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { loadCodeDependencyScripts } from '@/components/code-runner/code-dependency';
import Head from 'next/head';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Editor</title>
        <link type="text/css" rel="stylesheet" href="http://localhost:8080/dist/index.css" />
      </Head>

      {loadCodeDependencyScripts()}

      {children}
    </>
  );
}
