import JSZip from "jszip";

export interface DownloadableFile {
  name: string;
  blob: Blob;
}

export function downloadSingleFile(file: DownloadableFile) {
  const url = URL.createObjectURL(file.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadAsZip(files: DownloadableFile[], zipName = "converted-images.zip") {
  const zip = new JSZip();
  for (const file of files) {
    zip.file(file.name, file.blob);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  downloadSingleFile({ name: zipName, blob: zipBlob });
}
