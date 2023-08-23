import { useLayoutEffect, useEffect, useState } from 'react';
import { transform } from 'sucrase';
import { importCodeDependency } from './code-dependency';
import CodeError from './code-error';
import CodeErrorBoundary from './code-error-boundary';

export const CodePreviewer = (props: { code: string }) => {
  const [error, setError] = useState();
  const [Component, setComponent] = useState<React.ComponentType>();

  useLayoutEffect(() => {
    try {
      const compiledCode: string = transform(props.code, {
        transforms: ['jsx', 'typescript', 'imports']
      })?.code;

      const req = (name: string) => importCodeDependency(name);
      console.log(compiledCode);

      const Component = eval(`
      (function(require, exports) {
        ${compiledCode};
        return exports.default;
      })(${req}, {});
    `);

      setComponent(() => Component);
    } catch (err: any) {
      setError(err);
    }

    console.log('Component', Component);
    return () => {
      console.log('卸载');
    };
  }, [props.code]);

  console.log('11', 11);

  return error ? (
    <CodeError error={error}></CodeError>
  ) : Component ? (
    <CodeErrorBoundary>
      <Component />
    </CodeErrorBoundary>
  ) : (
    <div>none component</div>
  );
};
