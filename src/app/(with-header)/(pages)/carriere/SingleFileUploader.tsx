"use client";

import { AlertCircleIcon, XIcon } from "lucide-react";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@/app/components/icons/UploadIcon";
import { FileTextIcon } from "@/app/components/icons/FileTextIcon";
import { useEffect } from "react";

type SingleFileUploaderProps = {
  onChange?: (file: unknown) => void;
  error?: string;
};

export default function SingleFileUploader({
  onChange,
  error,
}: SingleFileUploaderProps) {
  const maxSize = 10 * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: ".pdf,.doc,.docx",
    maxSize,
  });

  const fileWrapper = files[0]; // FileWithPreview | undefined

  // Extract the actual File safely - avoid instanceof File for SSR compatibility
  const actualFile: unknown =
    fileWrapper?.file && typeof fileWrapper.file === 'object' && 'name' in fileWrapper.file && 'size' in fileWrapper.file 
      ? fileWrapper.file 
      : undefined;

  // Only pass real File objects to parent
  useEffect(() => {
    onChange?.(actualFile);
  }, [actualFile, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className=" py-16 px-8 hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl outline-8 outline-Neutral-BG-1  border-2 border-dashed border-Neutral-BG-3 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          disabled={Boolean(actualFile)}
        />
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className=" mb-2 flex shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <UploadIcon />
          </div>
          <p className="mb-1.5 text-Neutral-Dark button-s">
            Cliquez ou glissez-déposez votre CV dans cette zone
          </p>
          <p className="text-Neutral-BG-4 button2-s">
            Drag & drop or click to browse Formats acceptés : .pdf, .doc, .docx
            (max. {formatBytes(maxSize)})
          </p>
        </div>
      </div>

      {!actualFile && error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {errors.length > 0 && (
        <div
          className="text-destructive mt-2 flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {fileWrapper && (
        <div className="flex p-2 gap-3 rounded-[12px] items-center bg-Sage-Gray-Lowest">
          <span className="flex p-2 rounded-[4px] bg-Sage-Gray-Lower">
            <FileTextIcon />
          </span>
          <div className="f-col gap-0.5 flex-1">
            <span className="text-Neutral-Dark button-s">
              {actualFile && typeof actualFile === 'object' && 'name' in actualFile ? String(actualFile.name) : ''}
            </span>
            <span className="text-Sage-Gray-High text-[12px]/[16px] font-normal">
              {actualFile && typeof actualFile === 'object' && 'size' in actualFile 
                ? formatBytes(Number(actualFile.size)) 
                : ""}
            </span>
          </div>
          <Button
            className="text-muted-foreground/80 hover:text-foreground bg-Sage-Gray-Lower rounded-full size-8 hover:bg-transparent"
            aria-label="Remove file"
            onClick={() => {
              removeFile(fileWrapper.id);
              onChange?.(undefined);
            }}
          >
            <XIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
