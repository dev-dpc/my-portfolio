"use client";
import { useRef, useState } from "react";
import { ACCEPTED_INPUT_TYPES } from "@/utils/image-converter";

export function Dropzone({ onFilesAdded }: { onFilesAdded: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onFilesAdded(Array.from(fileList));
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`cursor-pointer border border-dashed rounded-sm px-6 py-10 text-center transition-colors ${
        dragging
          ? "border-emerald-500 bg-emerald-500/5"
          : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_INPUT_TYPES}
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <p className="text-neutral-500">
        &gt; drop images here, or{" "}
        <span className="text-emerald-600 dark:text-emerald-400 underline">click to browse</span>
      </p>
      <p className="text-neutral-400 dark:text-neutral-600 text-xs mt-2">
        png, jpeg, webp, avif, svg &mdash; max 25MB each, 20 files per batch
      </p>
    </div>
  );
}
