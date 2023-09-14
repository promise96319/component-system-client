import { Element } from 'hast-util-is-element';
import { visit } from 'unist-util-visit';
import type { BytemdPlugin } from 'bytemd';
import type { Root } from 'hast';
import type { Processor, Transformer } from 'unified';

export const imgPlugin = () => {
  return {
    remark(processor: Processor) {
      return processor.use((): Transformer<any> => {
        return (tree) => {
          visit<Root, 'element'>(tree, 'element', (node) => {
            console.log('node', node);
          });
        };
      });
    }
  };
};

export const linkPlugin = () => {
  return {
    rehype(processor: Processor) {
      return processor.use((): Transformer<any> => {
        return (tree) => {
          visit<Root, 'element'>(tree, 'element', (node) => {
            if (node.tagName === 'a') {
              const href = `${node.properties.href} ?? ''`;
              if (href.startsWith('http')) {
                node.properties.target = '_blank';
              }
            }
          });
        };
      });
    }
  };
};
