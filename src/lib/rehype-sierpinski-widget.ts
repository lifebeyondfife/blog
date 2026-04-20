import { visit } from 'unist-util-visit';
import { Root, Element } from 'hast';

const MARKER_TEXT = 'sierpinski-widget';

export const SIERPINSKI_PLACEHOLDER_ATTR = 'data-widget';
export const SIERPINSKI_PLACEHOLDER_VALUE = 'sierpinski';

function isCommentNode(node: unknown): node is { type: 'comment'; value: string } {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === 'comment'
  );
}

function createPlaceholder(): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      [SIERPINSKI_PLACEHOLDER_ATTR]: SIERPINSKI_PLACEHOLDER_VALUE,
    },
    children: [],
  };
}

export default function rehypeSierpinskiWidget() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (!isCommentNode(node) || index === undefined || !parent) {
        return;
      }

      if (node.value.trim() === MARKER_TEXT) {
        (parent.children as (Element | typeof node)[]).splice(index, 1, createPlaceholder());
      }
    });
  };
}
