"use client";

import { FileTextIcon } from "@/app/components/icons/FileTextIcon";
import { UploadIcon } from "@/app/components/icons/UploadIcon";
import { Button } from "@/components/ui/button";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { ImageIcon, XIcon } from "lucide-react";
import type { SVGProps } from "react";
import { useEffect } from "react";

export function AlertCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 8.54167C10.3452 8.54167 10.625 8.82149 10.625 9.16667V13.3333C10.625 13.6785 10.3452 13.9583 10 13.9583C9.65482 13.9583 9.375 13.6785 9.375 13.3333V9.16667C9.375 8.82149 9.65482 8.54167 10 8.54167Z"
        fill="currentColor"
      />
      <path
        d="M10.0415 6.04167C10.3867 6.04167 10.6665 6.32149 10.6665 6.66667V6.74967C10.6665 7.09424 10.3876 7.37378 10.0431 7.37467L9.96012 7.37549C9.79415 7.37581 9.63408 7.30963 9.5166 7.19238C9.39937 7.07524 9.33358 6.91622 9.3335 6.75049V6.66667C9.3335 6.32149 9.61332 6.04167 9.9585 6.04167H10.0415Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.875C14.4873 1.875 18.125 5.51269 18.125 10C18.125 14.4873 14.4873 18.125 10 18.125C5.51269 18.125 1.875 14.4873 1.875 10C1.875 5.51269 5.51269 1.875 10 1.875ZM10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125Z"
        fill="currentColor"
      />
    </svg>
  );
}

type SingleFileUploaderProps = {
  onChange?: (file: unknown) => void;
  error?: string;
};

export default function SingleFileUploader({
  onChange,
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
    accept: ".pdf,.png,.jpg",
    maxSize,
  });

  const fileWrapper = files[0]; // FileWithPreview | undefined

  // Extract the actual File safely - ensure it's a proper File object
  const actualFile: File | undefined =
    fileWrapper?.file && fileWrapper.file instanceof File
      ? fileWrapper.file
      : undefined;

  // Only pass real File objects to parent
  useEffect(() => {
    onChange?.(actualFile);
  }, [actualFile]);
  const fileName = actualFile?.name || "";

  const isImage = /\.(png|jpe?g)$/i.test(fileName);

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
            Glissez votre fichier ici ou cliquez pour téléverser
          </p>
          <p className="text-Neutral-BG-4 button2-s">
            Format accepté : PDF, JPG, PNG – (max. {formatBytes(maxSize)})
          </p>
        </div>
      </div>

      {errors.length > 0 ? (
        <div
          className="flex text-destructive items-center mt-3 w-fit gap-2 py-1 px-2 rounded-3xl bg-red-100"
          role="alert"
        >
          <AlertCircleIcon />
          <span className="text-[14px]/[20px] font-normal">{errors[0]}</span>
        </div>
      ) : !fileWrapper ? (
        <div className="flex text-Sage-Gray-Higher items-center mt-3 w-fit gap-2 py-1 px-2 rounded-3xl bg-Sage-Gray-Lowest">
          <AlertCircleIcon />
          <span className="text-[14px]/[20px] font-normal">
            Si vous ne l’avez pas, vous pouvez passer cette étape.
          </span>
        </div>
      ) : null}

      {fileWrapper && (
        <div className="flex p-2 gap-3 rounded-[12px] items-center bg-Sage-Gray-Lowest">
          <span className="flex p-2 text-Sage-Gray-Higher rounded-[4px] bg-Sage-Gray-Lower">
            {isImage ? <ImageIcon className="size-5" /> : <FileTextIcon />}
          </span>
          <div className="f-col gap-0.5 flex-1">
            <span className="text-Neutral-Dark button-s">
              {actualFile?.name || ""}
            </span>
            <span className="text-Sage-Gray-High text-[12px]/[16px] font-normal">
              {actualFile ? formatBytes(actualFile.size) : ""}
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
