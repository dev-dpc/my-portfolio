"use client";
import { ConverterFile } from "./converter-client";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function FileItem({
  item,
  onRemove,
  onDownload,
}: {
  item: ConverterFile;
  onRemove: (id: string) => void;
  onDownload: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-800 rounded-sm px-3 py-2 text-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.previewUrl} alt="" className="w-10 h-10 object-cover rounded-sm shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="truncate text-neutral-800 dark:text-neutral-200">{item.file.name}</p>
        <p className="text-neutral-500 text-xs">
          {formatBytes(item.file.size)}
          {item.status === "done" && item.resultBlob && (
            <> &rarr; {formatBytes(item.resultBlob.size)}</>
          )}
          {item.status === "error" && (
            <span className="text-red-500"> &mdash; {item.errorMessage}</span>
          )}
          {item.status === "converting" && <span className="text-emerald-600 dark:text-emerald-400"> &mdash; converting&hellip;</span>}
          {item.status === "pending" && <span> &mdash; queued</span>}
        </p>
      </div>

      {item.status === "done" && (
        <button
          onClick={() => onDownload(item.id)}
          className="text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
        >
          download
        </button>
      )}
      <button
        onClick={() => onRemove(item.id)}
        className="text-neutral-400 dark:text-neutral-600 hover:text-red-500 shrink-0"
      >
        remove
      </button>
    </div>
  );
}
