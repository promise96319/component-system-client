import type { BytemdPlugin } from 'bytemd';
import type { Processor, Transformer } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { isElement, Element } from 'hast-util-is-element';
import { transform } from 'sucrase';
import React from 'react';
import { createRoot, Root as ReactRoot } from 'react-dom/client';
import CodeErrorBoundary from './code-error-boundary';
import CodeError from './code-error';
import CodeBlockComponent from './code-block';
import { importCodeDependency, JSDependency } from './code-dependency';

const CODE_TAG = 'react-code';

function rehypeCode(): Transformer<Root> {
  return (tree) => {
    visit<Root, 'element'>(tree, 'element', (node) => {
      if (isElement(node, 'pre') && node.children.length === 1 && isElement(node.children[0], 'code')) {
        const codeNode: Element = node.children[0];
        const languages = codeNode.properties?.className;
        if (Array.isArray(languages) && languages.length > 0) {
          // 按源码显示
          return;
        }

        // 按 React 组件显示
        const code = (codeNode.children[0] as any)?.value;
        if (!code) {
          node.children = [];
          return;
        }

        node.tagName = CODE_TAG;
        node.properties = { 'data-code': code };
        node.children = [];
      }
    });
  };
}

const cache: Record<number, HTMLDivElement> = {};

export const codeRuntimePlugin = (opts?: {
  jsDependencies?: JSDependency[];
  CodeBlock?: typeof CodeBlockComponent;
}): BytemdPlugin => {
  const { jsDependencies, CodeBlock = CodeBlockComponent } = opts || {};

  return {
    rehype(processor: Processor) {
      return processor.use(rehypeCode);
    },
    viewerEffect({ markdownBody }) {
      markdownBody.querySelectorAll(CODE_TAG).forEach((el: any, index: number) => {
        const cachedEl = cache[index];
        if (cachedEl) {
          el.innerHTML = cachedEl.innerHTML;
        }

        const code = el.getAttribute('data-code');
        if (!code) return;

        let Component = null;
        let error: Error | undefined = undefined;

        try {
          const compiledCode: string = transform(code, {
            transforms: ['jsx', 'imports']
          })?.code;

          const req = (name: string) => importCodeDependency(name, jsDependencies);

          Component = eval(`
              (function(require, exports) {
                ${compiledCode};
                return exports.default;
              })(${req}, {});
            `);
        } catch (err: any) {
          error = err;
        }

        const codePreviewer = error ? (
          <CodeError error={error}></CodeError>
        ) : (
          <CodeErrorBoundary>
            <Component />
          </CodeErrorBoundary>
        );

        createRoot(el).render(<CodeBlock source={code}>{codePreviewer}</CodeBlock>);
        cache[index] = el;
      });
    }
  };
};
