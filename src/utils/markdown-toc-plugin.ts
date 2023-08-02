import { Element } from 'hast-util-is-element';
import { visit } from 'unist-util-visit';
import type { BytemdPlugin } from 'bytemd';
import type { Root } from 'hast';
import type { Processor, Transformer } from 'unified';

export interface TocItem {
  level: number;
  id: string;
  text: string;
}

const stringifyHeading = (e: Element) => {
  let result = '';
  visit(e, (node) => {
    if (node.type === 'text') {
      result += node.value;
    }
  });
  return result;
};

const createHeadingId = (index: number) => `markdown-heading-${index}`;

export const rehypeToc = (opts?: { maxLevel?: number; onFinish?: (toc: TocItem[]) => void }): BytemdPlugin => {
  const { maxLevel = 3 } = opts ?? {};
  const toc: TocItem[] = [];
  let idx = 1;

  return {
    rehype(processor: Processor) {
      return processor.use((): Transformer<Root> => {
        return (tree) => {
          visit<Root, 'element'>(tree, 'element', (node) => {
            const { tagName, children } = node;

            if (/^h[1|2|3|4|5|6]$/.test(tagName) && children.length > 0) {
              const level = parseInt(tagName[1]);
              if (level > maxLevel) {
                return;
              }
              const id = createHeadingId(idx++);
              const text = stringifyHeading(node);
              toc.push({ level, id, text });
            }
          });
          opts?.onFinish?.(toc);
        };
      });
    }
  };
};

export const rehypeHead = (opts?: { maxLevel: number }): BytemdPlugin => {
  const { maxLevel = 3 } = opts ?? {};
  let idx = 1;

  return {
    rehype(processor: Processor) {
      return processor.use((): Transformer<Root> => {
        return (tree) => {
          visit<Root, 'element'>(tree, 'element', (node) => {
            const { tagName, children } = node;

            if (/^h[1|2|3|4|5|6]$/.test(tagName) && children.length > 0) {
              const level = parseInt(tagName[1]);
              if (level > maxLevel) {
                return;
              }
              node.properties = { ...node.properties, id: createHeadingId(idx++) };
            }
          });
        };
      });
    }
  };
};
