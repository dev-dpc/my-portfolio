declare module "imagetracerjs" {
  interface TraceOptions {
    numberofcolors?: number;
    pathomit?: number;
    ltres?: number;
    qtres?: number;
    blurradius?: number;
    blurdelta?: number;
    scale?: number;
    roundcoords?: number;
    viewbox?: boolean;
  }

  interface ImageTracer {
    imagedataToSVG(imageData: ImageData, options?: TraceOptions): string;
  }

  const ImageTracer: ImageTracer;
  export default ImageTracer;
}
