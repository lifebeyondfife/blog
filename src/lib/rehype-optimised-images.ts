import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import path from 'path';
import fs from 'fs';
import { GENERATED_DIRECTORY } from '@/lib/constants';

interface ImageManifest {
  [filename: string]: {
    originalWidth: number;
    originalHeight: number;
    availableSizes: number[];
  };
}

let manifestCache: ImageManifest | null = null;

function loadManifest(): ImageManifest {
  if (manifestCache !== null) {
    return manifestCache;
  }

  try {
    const manifestPath = path.join(process.cwd(), GENERATED_DIRECTORY, 'image-manifest.json');
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const loadedManifest: ImageManifest = JSON.parse(manifestContent);
    manifestCache = loadedManifest;
    return loadedManifest;
  } catch (error) {
    console.warn('Warning: Could not load image manifest, images will use original paths');
    const emptyManifest: ImageManifest = {};
    manifestCache = emptyManifest;
    return emptyManifest;
  }
}

function extractFilename(src: string): string | null {
  const match = src.match(/(?:^|\/)images\/([^/]+)\.(jpg|jpeg|png|webp)$/i);
  if (!match) return null;
  
  return match[1];
}

function createPictureElement(
  imgElement: Element,
  filename: string,
  manifest: ImageManifest
): Element {
  const imageInfo = manifest[filename];
  const alt = imgElement.properties?.alt as string || '';
  const className = imgElement.properties?.className as string || '';
  
  if (!imageInfo || imageInfo.availableSizes.length === 0) {
    console.warn(`Warning: No optimized versions found for image: ${filename}`);
    return imgElement;
  }

  const sizes = imageInfo.availableSizes.sort((a, b) => a - b);
  const largestSize = sizes[sizes.length - 1];

  const webpSrcset = sizes
    .map(width => `/images/optimised/${filename}/${width}.webp ${width}w`)
    .join(', ');

  const jpgSrcset = sizes
    .map(width => `/images/optimised/${filename}/${width}.jpg ${width}w`)
    .join(', ');

  const pictureElement: Element = {
    type: 'element',
    tagName: 'picture',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'source',
        properties: {
          type: 'image/webp',
          srcSet: webpSrcset,
          sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 72ch'
        },
        children: []
      },
      {
        type: 'element',
        tagName: 'source',
        properties: {
          type: 'image/jpeg',
          srcSet: jpgSrcset,
          sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 72ch'
        },
        children: []
      },
      {
        type: 'element',
        tagName: 'img',
        properties: {
          src: `/images/optimised/${filename}/${largestSize}.jpg`,
          alt: alt,
          loading: 'lazy',
          decoding: 'async',
          width: imageInfo.originalWidth,
          height: imageInfo.originalHeight,
          style: `aspect-ratio: ${imageInfo.originalWidth}/${imageInfo.originalHeight}`,
          ...(className && { className })
        },
        children: []
      }
    ]
  };

  return pictureElement;
}

export default function rehypeOptimisedImages() {
  return (tree: Root) => {
    const manifest = loadManifest();

    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'img' || !parent || index === undefined) {
        return;
      }

      const src = node.properties?.src as string;
      if (!src) return;

      const filename = extractFilename(src);
      if (!filename) {
        return;
      }

      const pictureElement = createPictureElement(node, filename, manifest);
      parent.children[index] = pictureElement;
    });
  };
}
