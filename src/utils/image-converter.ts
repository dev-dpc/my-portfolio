export type TargetFormat = "image/png" | "image/jpeg" | "image/webp" | "image/avif" | "image/svg+xml";

export const TARGET_FORMATS: { value: TargetFormat; label: string; extension: string }[] = [
  { value: "image/png", label: "PNG", extension: "png" },
  { value: "image/jpeg", label: "JPEG", extension: "jpg" },
  { value: "image/webp", label: "WebP", extension: "webp" },
  { value: "image/avif", label: "AVIF", extension: "avif" },
  { value: "image/svg+xml", label: "SVG (traced)", extension: "svg" },
];

// Formats accepted as input. SVG can also be an input source (rendered to
// canvas on load) in addition to being a possible trace-to output above.
//
// SVGs can contain <script> and event-handler attributes, but every SVG we
// load here goes through an HTMLImageElement / canvas.drawImage ("image
// context"), where browsers disable script execution and interactivity by
// spec. We never render uploaded SVG markup via dangerouslySetInnerHTML,
// <object>, or <embed>, so that sandboxing always applies.
const ACCEPTED_INPUT_TYPE_LIST = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/svg+xml"];
export const ACCEPTED_INPUT_TYPES = ACCEPTED_INPUT_TYPE_LIST.join(",");

export function isAcceptedInputType(type: string): boolean {
  return ACCEPTED_INPUT_TYPE_LIST.includes(type);
}

export type TracePreset = "simple" | "balanced" | "detailed";

export const TRACE_PRESETS: { value: TracePreset; label: string }[] = [
  { value: "simple", label: "Simple (fewer colors, cleaner shapes)" },
  { value: "balanced", label: "Balanced" },
  { value: "detailed", label: "Detailed (more colors, finer paths)" },
];

const TRACE_OPTIONS: Record<TracePreset, Record<string, number>> = {
  simple: { numberofcolors: 6, pathomit: 12, ltres: 1.5, qtres: 1.5, blurradius: 2, blurdelta: 20 },
  balanced: { numberofcolors: 16, pathomit: 8, ltres: 1, qtres: 1 },
  detailed: { numberofcolors: 40, pathomit: 1, ltres: 0.4, qtres: 0.4 },
};

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB
export const MAX_BATCH_SIZE = 20;

// SVGs without explicit width/height on the root element load with a natural
// size of 0, so fall back to the browser's default replaced-element size.
const DEFAULT_SVG_WIDTH = 300;
const DEFAULT_SVG_HEIGHT = 150;

export interface ConvertOptions {
  targetFormat: TargetFormat;
  /** 0-1, only applies to lossy raster formats (JPEG/WebP/AVIF) */
  quality: number;
  /** Optional max bounds; image is scaled down (never up) preserving aspect ratio */
  maxWidth?: number;
  maxHeight?: number;
  /** Only applies when targetFormat is SVG */
  tracePreset?: TracePreset;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image data"));
    };
    img.src = url;
  });
}

function computeDimensions(
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  if (!maxWidth && !maxHeight) return { width, height };

  const widthScale = maxWidth ? maxWidth / width : 1;
  const heightScale = maxHeight ? maxHeight / height : 1;
  const scale = Math.min(1, widthScale, heightScale);

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function traceToSvgBlob(ctx: CanvasRenderingContext2D, width: number, height: number, preset: TracePreset): Promise<Blob> {
  const { default: ImageTracer } = await import("imagetracerjs");
  const imageData = ctx.getImageData(0, 0, width, height);

  // Yield to the event loop first so the "converting…" status can paint
  // before this (still synchronous, potentially slow) trace pass runs.
  await new Promise((resolve) => setTimeout(resolve, 0));

  const svgString = ImageTracer.imagedataToSVG(imageData, TRACE_OPTIONS[preset]);
  return new Blob([svgString], { type: "image/svg+xml" });
}

export async function convertImage(file: File, options: ConvertOptions): Promise<Blob> {
  if (!isAcceptedInputType(file.type)) {
    throw new Error("Unsupported file type");
  }

  const img = await loadImage(file);
  const sourceWidth = img.naturalWidth || DEFAULT_SVG_WIDTH;
  const sourceHeight = img.naturalHeight || DEFAULT_SVG_HEIGHT;
  const { width, height } = computeDimensions(
    sourceWidth,
    sourceHeight,
    options.maxWidth,
    options.maxHeight
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser");

  ctx.drawImage(img, 0, 0, width, height);

  if (options.targetFormat === "image/svg+xml") {
    return traceToSvgBlob(ctx, width, height, options.tracePreset ?? "balanced");
  }

  const isLossy =
    options.targetFormat === "image/jpeg" ||
    options.targetFormat === "image/webp" ||
    options.targetFormat === "image/avif";

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, options.targetFormat, isLossy ? options.quality : undefined);
  });

  if (!blob) {
    throw new Error(
      options.targetFormat === "image/avif"
        ? "AVIF encoding isn't supported in this browser"
        : "Encoding failed for this format"
    );
  }

  return blob;
}
