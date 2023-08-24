import editorThemeData from 'monaco-themes/themes/Monokai.json';
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('react-monaco-editor').then((mod) => mod.default), { ssr: false });

export const Editor = (props: any) => {
  const styleName = 'playground';
  const { width, code, setCode } = props;

  return (
    <MonacoEditor
      width={width}
      className={`${styleName}-editor-root`}
      value={code}
      onChange={(value) => setCode(value)}
      language="typescript"
      options={{
        formatOnPaste: true,
        minimap: {
          enabled: false
        }
      }}
      theme="monokai"
      editorDidMount={(_editor, monaco) => {
        monaco.editor.defineTheme('monokai', editorThemeData as any);
        monaco.editor.setTheme('monokai');
      }}
    ></MonacoEditor>
  );
};
