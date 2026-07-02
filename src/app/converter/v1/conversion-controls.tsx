"use client";
import { TARGET_FORMATS, TargetFormat, TRACE_PRESETS, TracePreset } from "@/utils/image-converter";

export interface Controls {
  targetFormat: TargetFormat;
  quality: number;
  maxWidth: string;
  maxHeight: string;
  tracePreset: TracePreset;
}

export function ConversionControls({
  controls,
  onChange,
}: {
  controls: Controls;
  onChange: (controls: Controls) => void;
}) {
  const isSvg = controls.targetFormat === "image/svg+xml";
  const isLossy = controls.targetFormat === "image/jpeg" || controls.targetFormat === "image/webp" || controls.targetFormat === "image/avif";

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm p-4 space-y-4 text-sm">
      <div className="flex items-center gap-3">
        <label className="text-neutral-500 w-28 shrink-0">--format</label>
        <select
          value={controls.targetFormat}
          onChange={(e) => onChange({ ...controls, targetFormat: e.target.value as TargetFormat })}
          className="bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-sm px-2 py-1 text-neutral-800 dark:text-neutral-200"
        >
          {TARGET_FORMATS.map((f) => (
            <option key={f.value} value={f.value} className="bg-neutral-50 dark:bg-black">
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {isSvg ? (
        <>
          <div className="flex items-center gap-3">
            <label className="text-neutral-500 w-28 shrink-0">--detail</label>
            <select
              value={controls.tracePreset}
              onChange={(e) => onChange({ ...controls, tracePreset: e.target.value as TracePreset })}
              className="bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-sm px-2 py-1 text-neutral-800 dark:text-neutral-200"
            >
              {TRACE_PRESETS.map((p) => (
                <option key={p.value} value={p.value} className="bg-neutral-50 dark:bg-black">
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-neutral-400 dark:text-neutral-600 text-xs">
            &gt; note: tracing works best on logos, icons, and flat-color art. Large or photo-like
            images can be slow to trace and produce large SVGs.
          </p>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <label className="text-neutral-500 w-28 shrink-0">--quality</label>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={controls.quality}
            disabled={!isLossy}
            onChange={(e) => onChange({ ...controls, quality: Number(e.target.value) })}
            className="flex-1 accent-emerald-600 disabled:opacity-40"
          />
          <span className="w-10 text-right text-neutral-500">
            {isLossy ? Math.round(controls.quality * 100) : "n/a"}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="text-neutral-500 w-28 shrink-0">--max-width</label>
        <input
          type="number"
          min={1}
          placeholder="unlimited"
          value={controls.maxWidth}
          onChange={(e) => onChange({ ...controls, maxWidth: e.target.value })}
          className="bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-sm px-2 py-1 w-32 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-neutral-500 w-28 shrink-0">--max-height</label>
        <input
          type="number"
          min={1}
          placeholder="unlimited"
          value={controls.maxHeight}
          onChange={(e) => onChange({ ...controls, maxHeight: e.target.value })}
          className="bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-sm px-2 py-1 w-32 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
        />
      </div>
    </div>
  );
}
