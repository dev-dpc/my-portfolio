"use client";
import { useEffect, useRef, useState } from "react";
import { Geist_Mono } from "next/font/google";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  convertImage,
  isAcceptedInputType,
  MAX_BATCH_SIZE,
  MAX_FILE_SIZE_BYTES,
  TARGET_FORMATS,
} from "@/utils/image-converter";
import { downloadAsZip, downloadSingleFile } from "@/utils/download-batch";
import { Dropzone } from "./dropzone";
import { FileItem } from "./file-item";
import { ConversionControls, Controls } from "./conversion-controls";

const mono = Geist_Mono({ subsets: ["latin"] });

export interface ConverterFile {
  id: string;
  file: File;
  previewUrl: string;
  status: "pending" | "converting" | "done" | "error";
  resultBlob?: Blob;
  errorMessage?: string;
}

function ThemeCmd() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span>&nbsp;</span>;
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
    >
      ./toggle-theme --{theme === "light" ? "dark" : "light"}
    </button>
  );
}

function outputName(originalName: string, targetFormat: Controls["targetFormat"]) {
  const extension = TARGET_FORMATS.find((f) => f.value === targetFormat)!.extension;
  const base = originalName.replace(/\.[^./]+$/, "");
  return `${base}.${extension}`;
}

export function ConverterClient() {
  const [files, setFiles] = useState<ConverterFile[]>([]);
  const [controls, setControls] = useState<Controls>({
    targetFormat: "image/webp",
    quality: 0.85,
    maxWidth: "",
    maxHeight: "",
    tracePreset: "balanced",
  });
  const filesRef = useRef(files);
  filesRef.current = files;

  // Nothing here persists: state is in-memory only, and object URLs are
  // revoked on unmount so a reload leaves no trace.
  useEffect(() => {
    return () => {
      filesRef.current.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
  }, []);

  const addFiles = (newFiles: File[]) => {
    const room = MAX_BATCH_SIZE - files.length;
    if (room <= 0) {
      toast.error(`Batch limit reached (max ${MAX_BATCH_SIZE} files)`);
      return;
    }

    const accepted: ConverterFile[] = [];
    let unsupportedType = 0;
    let oversized = 0;
    let skippedForBatchLimit = 0;

    newFiles.forEach((file, index) => {
      // Reject anything outside the explicit allowlist rather than a loose
      // "starts with image/" check, so a mislabeled or unsupported file
      // (e.g. a script renamed with an image extension) is turned away
      // up front instead of silently reaching the decode step.
      if (!isAcceptedInputType(file.type)) {
        unsupportedType++;
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        oversized++;
        return;
      }
      if (index >= room) {
        skippedForBatchLimit++;
        return;
      }
      accepted.push({
        id: `${file.name}-${file.size}-${Date.now()}-${index}`,
        file,
        previewUrl: URL.createObjectURL(file),
        status: "pending",
      });
    });

    if (unsupportedType > 0) toast.error(`${unsupportedType} file(s) skipped: unsupported file type`);
    if (oversized > 0) toast.error(`${oversized} file(s) skipped: over 25MB`);
    if (skippedForBatchLimit > 0) toast.error(`${skippedForBatchLimit} file(s) skipped: batch limit is ${MAX_BATCH_SIZE}`);

    setFiles((prev) => [...prev, ...accepted]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  const convertAll = async () => {
    const maxWidth = controls.maxWidth ? Number(controls.maxWidth) : undefined;
    const maxHeight = controls.maxHeight ? Number(controls.maxHeight) : undefined;

    const pending = files.filter((f) => f.status === "pending" || f.status === "error");
    setFiles((prev) =>
      prev.map((f) => (pending.some((p) => p.id === f.id) ? { ...f, status: "converting" } : f))
    );

    await Promise.all(
      pending.map(async (item) => {
        try {
          const blob = await convertImage(item.file, {
            targetFormat: controls.targetFormat,
            quality: controls.quality,
            maxWidth,
            maxHeight,
            tracePreset: controls.tracePreset,
          });
          setFiles((prev) =>
            prev.map((f) => (f.id === item.id ? { ...f, status: "done", resultBlob: blob } : f))
          );
        } catch (err) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? { ...f, status: "error", errorMessage: err instanceof Error ? err.message : "Conversion failed" }
                : f
            )
          );
        }
      })
    );
  };

  const downloadOne = (id: string) => {
    const item = files.find((f) => f.id === id);
    if (!item?.resultBlob) return;
    downloadSingleFile({ name: outputName(item.file.name, controls.targetFormat), blob: item.resultBlob });
  };

  const downloadAll = async () => {
    const done = files.filter((f) => f.status === "done" && f.resultBlob);
    if (done.length === 0) return;
    await downloadAsZip(
      done.map((f) => ({ name: outputName(f.file.name, controls.targetFormat), blob: f.resultBlob! }))
    );
  };

  const hasPending = files.some((f) => f.status === "pending" || f.status === "error");
  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <main
      className={`${mono.className} min-h-screen bg-neutral-50 dark:bg-black text-neutral-800 dark:text-neutral-300 text-sm sm:text-base leading-relaxed`}
    >
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 mb-1">
              <span className="text-neutral-500 dark:text-neutral-500">user</span>
              <span className="text-neutral-400 dark:text-neutral-600">:~$ </span>
              ./converter
            </p>
            <p className="text-neutral-500">
              &gt; runs entirely in your browser. nothing is uploaded or stored &mdash; reload clears everything.
            </p>
          </div>
          <ThemeCmd />
        </div>

        <div className="space-y-6">
          <Dropzone onFilesAdded={addFiles} />

          <ConversionControls controls={controls} onChange={setControls} />

          {files.length > 0 && (
            <>
              <div className="flex items-center gap-4">
                <button
                  onClick={convertAll}
                  disabled={!hasPending}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
                >
                  ./convert --all
                </button>
                <button
                  onClick={downloadAll}
                  disabled={doneCount === 0}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
                >
                  ./download --zip
                </button>
                <button
                  onClick={clearAll}
                  className="text-neutral-400 dark:text-neutral-600 hover:text-red-500 ml-auto"
                >
                  ./clear --all
                </button>
              </div>

              <div className="space-y-2">
                {files.map((item) => (
                  <FileItem key={item.id} item={item} onRemove={removeFile} onDownload={downloadOne} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
