import manifestData from '@/../generated/image-manifest.json';
import { ImageManifest } from '@/types/images';

const manifest = manifestData as ImageManifest;

interface OptimisedImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

function extractFilename(src: string): string | null {
  const match = src.match(/(?:^|\/)images\/([^/]+)\.(gif|jpg|jpeg|png|webp)$/i);
  if (!match) return null;
  return match[1];
}

export function OptimisedImage({
  src,
  alt,
  sizes,
  className = '',
  priority = false,
}: OptimisedImageProps) {
  const filename = extractFilename(src);
  
  if (!filename || !manifest[filename]) {
    console.warn(`Image not found in manifest: ${src}`);
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority && { fetchPriority: 'high' })}
        decoding="async"
      />
    );
  }

  const imageInfo = manifest[filename];
  const availableSizes = imageInfo.availableSizes.sort((a, b) => a - b);
  const largestSize = availableSizes[availableSizes.length - 1];
  const isAnimated = imageInfo.isAnimated || false;

  const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 72ch';
  const sizesAttr = sizes || defaultSizes;

  if (isAnimated) {
    return (
      <picture>
        <source
          type="image/webp"
          srcSet={`/images/optimised/${filename}/${largestSize}.webp`}
        />
        <img
          src={`/images/optimised/${filename}/${largestSize}.gif`}
          alt={alt}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          {...(priority && { fetchPriority: 'high' })}
          decoding="async"
          width={imageInfo.originalWidth}
          height={imageInfo.originalHeight}
          style={{ aspectRatio: `${imageInfo.originalWidth}/${imageInfo.originalHeight}` }}
        />
      </picture>
    );
  }

  const webpSrcSet = availableSizes
    .map(w => `/images/optimised/${filename}/${w}.webp ${w}w`)
    .join(', ');
  
  const jpegSrcSet = availableSizes
    .map(w => `/images/optimised/${filename}/${w}.jpg ${w}w`)
    .join(', ');
  
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizesAttr}
      />
      
      <source
        type="image/jpeg"
        srcSet={jpegSrcSet}
        sizes={sizesAttr}
      />
      
      <img
        src={`/images/optimised/${filename}/${largestSize}.jpg`}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority && { fetchPriority: 'high' })}
        decoding="async"
        width={imageInfo.originalWidth}
        height={imageInfo.originalHeight}
        style={{ aspectRatio: `${imageInfo.originalWidth}/${imageInfo.originalHeight}` }}
        sizes={sizesAttr}
      />
    </picture>
  );
}
