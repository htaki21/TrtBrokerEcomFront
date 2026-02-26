import {
  logSecurityEvent,
  sanitizeFilename,
  validateFileUpload,
} from "@/lib/security";
import { withSecurity } from "@/middleware/security";
import { NextRequest, NextResponse } from "next/server";

async function handleFileUpload(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Verify file integrity by checking if it's a valid file
    if (!file || typeof file !== "object" || !file.name || !file.size) {
      logSecurityEvent(
        "INVALID_FILE_OBJECT",
        {
          file: file
            ? { name: file.name, size: file.size, type: file.type }
            : null,
        },
        request,
      );

      return NextResponse.json(
        { success: false, error: "Objet fichier invalide" },
        { status: 400 },
      );
    }

    // File type analysis for MIME type correction
    const extension = file.name.toLowerCase().split(".").pop();

    // Force MIME type correction for all files to ensure compatibility
    let correctedFile = file;
    let detectedMimeType = file.type;

    // Always try to detect the correct MIME type based on file extension
    switch (extension) {
      case "png":
        detectedMimeType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        detectedMimeType = "image/jpeg";
        break;
      case "pdf":
        detectedMimeType = "application/pdf";
        break;
      case "doc":
        detectedMimeType = "application/msword";
        break;
      case "docx":
        detectedMimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      default:
        // Unknown extension - use original type
        break;
    }

    // Only create a new file if the MIME type needs to be corrected
    if (file.type !== detectedMimeType) {
      correctedFile = new File([file], file.name, {
        type: detectedMimeType,
        lastModified: file.lastModified,
      });
    }

    // Comprehensive file validation using corrected file
    const fileValidation = validateFileUpload({
      name: correctedFile.name,
      size: correctedFile.size,
      type: correctedFile.type,
    });

    if (!fileValidation.isValid) {
      logSecurityEvent(
        "FILE_UPLOAD_REJECTED",
        {
          filename: file.name,
          size: file.size,
          type: file.type,
          error: fileValidation.error,
        },
        request,
      );

      return NextResponse.json(
        { success: false, error: fileValidation.error || "Fichier invalide" },
        { status: 400 },
      );
    }

    // Sanitize filename
    const sanitizedFilename = sanitizeFilename(file.name);
    if (sanitizedFilename !== file.name) {
      logSecurityEvent(
        "FILENAME_SANITIZED",
        {
          originalName: file.name,
          sanitizedName: sanitizedFilename,
        },
        request,
      );
    }

    // Upload file to Strapi using standard format
    const strapiFormData = new FormData();
    strapiFormData.append("files", correctedFile);

    const strapiUrl =
      process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const strapiResponse = await fetch(`${strapiUrl}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: strapiFormData,
    });

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();

      logSecurityEvent(
        "STRAPI_UPLOAD_FAILED",
        {
          status: strapiResponse.status,
          error: errorText,
        },
        request,
      );

      return NextResponse.json(
        {
          success: false,
          error: `Erreur lors du téléversement du fichier: ${errorText}`,
        },
        { status: strapiResponse.status },
      );
    }

    // Handle specific error cases
    if (strapiResponse.status === 413) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large for upload. Please try a smaller file.",
        },
        { status: 413 },
      );
    }

    const result = await strapiResponse.json();

    if (Array.isArray(result) && result.length > 0) {
      const uploadedFile = result[0];

      // Construct proxy URL for reliable file serving
      const proxyUrl = `/api/serve-file?url=${encodeURIComponent(uploadedFile.url)}`;

      // Use the original file size instead of Strapi's potentially incorrect size
      const correctSize = correctedFile.size;

      return NextResponse.json({
        success: true,
        data: {
          id: uploadedFile.id,
          name: uploadedFile.name,
          url: proxyUrl, // Use proxy URL for reliable serving
          mime: uploadedFile.mime,
          size: correctSize, // Use original file size instead of Strapi's reported size
        },
      });
    } else {
      return NextResponse.json(
        { success: false, error: "No file data returned from upload" },
        { status: 500 },
      );
    }
  } catch (error) {
    // Log security event for failed upload
    logSecurityEvent(
      "FILE_UPLOAD_ERROR",
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      request,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Échec du téléversement",
      },
      { status: 500 },
    );
  }
}

// Export the security-wrapped handler
export const POST = withSecurity(handleFileUpload, "/api/upload-file");
