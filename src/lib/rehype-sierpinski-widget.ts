import { visit } from 'unist-util-visit';
import { Root, Element, Text } from 'hast';

const MARKER_TEXT = 'sierpinski-widget';

function isCommentNode(node: unknown): node is { type: 'comment'; value: string } {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === 'comment'
  );
}

function createCanvasElement(): Element {
  return {
    type: 'element',
    tagName: 'canvas',
    properties: {
      id: 'myCanvas',
      width: 640,
      height: 570,
      className: 'mx-auto border border-gray-300 rounded'
    },
    children: []
  };
}

function createButton(onclickHandler: string, label: string): Element {
  return {
    type: 'element',
    tagName: 'button',
    properties: {
      type: 'button',
      onclick: onclickHandler,
      className: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
    },
    children: [{ type: 'text', value: label } as Text]
  };
}

function createButtonContainer(): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: 'flex flex-wrap gap-3 justify-center my-6'
    },
    children: [
      createButton('additionSierpinski()', 'Adding Numbers'),
      createButton('randomSierpinski()', 'Random Points'),
      createButton('fractalSierpinski()', 'Fractal')
    ]
  };
}

function createScriptElement(): Element {
  return {
    type: 'element',
    tagName: 'script',
    properties: {
      src: '/scripts/sierpinski.js'
    },
    children: []
  };
}

function createWidgetContainer(): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      id: 'sierpinski-widget',
      className: 'my-8'
    },
    children: [
      createButtonContainer(),
      createCanvasElement(),
      createScriptElement()
    ]
  };
}

export default function rehypeSierpinskiWidget() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (!isCommentNode(node) || index === undefined || !parent) {
        return;
      }

      if (node.value.trim() === MARKER_TEXT) {
        const widget = createWidgetContainer();
        (parent.children as (Element | typeof node)[]).splice(index, 1, widget);
      }
    });
  };
}
