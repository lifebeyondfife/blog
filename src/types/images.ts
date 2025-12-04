export interface ImageManifest {
  [filename: string]: {
    originalWidth: number;
    originalHeight: number;
    availableSizes: number[];
    isAnimated?: boolean;
  };
}
