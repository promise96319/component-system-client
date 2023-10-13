import editorThemeData from 'monaco-themes/themes/Monokai.json';
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('react-monaco-editor').then((mod) => mod.default), { ssr: false });

export const Editor = (props: { width: number; code: string; onChange: (code: string) => void }) => {
  const styleName = 'playground';
  const { width, code, onChange } = props;

  return (
    <MonacoEditor
      width={width}
      className={`${styleName}-editor-root`}
      value={code}
      onChange={(value) => onChange(value)}
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
