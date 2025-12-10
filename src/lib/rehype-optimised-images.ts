import { visit } from 'unist-util-visit';
import { Root, Element } from 'hast';
import fs from 'fs';
import path from 'path';
import { ImageManifest } from '@/types/images';
import { GENERATED_DIRECTORY, IMAGES_DIRECTORY } from '@/lib/constants';

const IMAGE_MEDIA_TYPES = {
  WEBP: 'image/webp',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
} as const;

const IMAGE_LOADING = {
  EAGER: 'eager',
  LAZY: 'lazy',
} as const;

const IMAGE_FETCH_PRIORITY = {
  HIGH: 'high',
} as const;

const IMAGE_DECODING = {
  ASYNC: 'async',
} as const;

const RESPONSIVE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 72ch';

const IMAGE_PATH_PATTERN = /(?:^|\/)images\/([^/]+)\.(gif|jpg|jpeg|png|webp)$/i;

function loadManifest(): ImageManifest {
  const manifestPath = path.join(process.cwd(), GENERATED_DIRECTORY, 'image-manifest.json');
  const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
  return JSON.parse(manifestContent) as ImageManifest;
}

function extractFilename(src: string): string | null {
  const match = src.match(IMAGE_PATH_PATTERN);
  if (!match) return null;
  return match[1];
}

function buildImagePath(filename: string, size: number, format: string): string {
  return `/${IMAGES_DIRECTORY}/optimised/${filename}/${size}.${format}`;
}

function buildAspectRatioStyle(width: number, height: number): string {
  return `aspect-ratio: ${width}/${height}`;
}

function createPictureElement(
  node: Element,
  filename: string,
  manifest: ImageManifest,
  isPriority: boolean = false
): Element {
  const imageInfo = manifest[filename];
  if (!imageInfo) {
    return node;
  }

  const sizes = imageInfo.availableSizes.sort((a, b) => a - b);
  const largestSize = sizes[sizes.length - 1];
  const alt = (node.properties?.alt as string) || '';
  const className = node.properties?.className;
  const isAnimated = imageInfo.isAnimated || false;

  const loadingValue = isPriority ? IMAGE_LOADING.EAGER : IMAGE_LOADING.LAZY;
  const fetchPriorityValue = isPriority ? IMAGE_FETCH_PRIORITY.HIGH : undefined;

  if (isAnimated) {
    return {
      type: 'element',
      tagName: 'picture',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'source',
          properties: {
            type: IMAGE_MEDIA_TYPES.WEBP,
            srcSet: buildImagePath(filename, largestSize, 'webp')
          },
          children: []
        },
        {
          type: 'element',
          tagName: 'img',
          properties: {
            src: buildImagePath(filename, largestSize, 'gif'),
            alt: alt,
            loading: loadingValue,
            fetchpriority: fetchPriorityValue,
            decoding: IMAGE_DECODING.ASYNC,
            width: imageInfo.originalWidth,
            height: imageInfo.originalHeight,
            style: buildAspectRatioStyle(imageInfo.originalWidth, imageInfo.originalHeight),
            ...(className && { className })
          },
          children: []
        }
      ]
    };
  }

  const webpSrcset = sizes
    .map(width => `${buildImagePath(filename, width, 'webp')} ${width}w`)
    .join(', ');

  const jpgSrcset = sizes
    .map(width => `${buildImagePath(filename, width, 'jpg')} ${width}w`)
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
          type: IMAGE_MEDIA_TYPES.WEBP,
          srcSet: webpSrcset,
          sizes: RESPONSIVE_SIZES
        },
        children: []
      },
      {
        type: 'element',
        tagName: 'source',
        properties: {
          type: IMAGE_MEDIA_TYPES.JPEG,
          srcSet: jpgSrcset,
          sizes: RESPONSIVE_SIZES
        },
        children: []
      },
      {
        type: 'element',
        tagName: 'img',
        properties: {
          src: buildImagePath(filename, largestSize, 'jpg'),
          alt: alt,
          loading: loadingValue,
          fetchpriority: fetchPriorityValue,
          decoding: IMAGE_DECODING.ASYNC,
          width: imageInfo.originalWidth,
          height: imageInfo.originalHeight,
          style: buildAspectRatioStyle(imageInfo.originalWidth, imageInfo.originalHeight),
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
    let firstImageProcessed = false;

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

      const isPriority = !firstImageProcessed;
      const pictureElement = createPictureElement(node, filename, manifest, isPriority);
      parent.children[index] = pictureElement;
      
      if (isPriority) {
        firstImageProcessed = true;
      }
    });
  };
}
