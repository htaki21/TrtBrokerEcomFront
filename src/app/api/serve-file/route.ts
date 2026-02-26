import { logSecurityEvent } from "@/lib/security";
import { withSecurity } from "@/middleware/security";
import { NextRequest, NextResponse } from "next/server";

async function handleFileServing(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { success: false, error: "URL du fichier manquante" },
        { status: 400 },
      );
    }

    // Construct the full Strapi URL using internal network
    const strapiUrl =
      process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const fullUrl = fileUrl.startsWith("http")
      ? fileUrl
      : `${strapiUrl}${fileUrl}`;

    // Fetch the file from Strapi
    const fileResponse = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!fileResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Fichier non trouvé" },
        { status: 404 },
      );
    }

    // Get the file content and headers
    const fileBuffer = await fileResponse.arrayBuffer();
    const contentType =
      fileResponse.headers.get("content-type") || "application/octet-stream";

    // Return the file with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=31536000",
        "Content-Disposition": `inline; filename="${fileUrl.split("/").pop()}"`,
      },
    });
  } catch (error) {
    logSecurityEvent(
      "FILE_SERVING_ERROR",
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      request,
    );

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors du chargement du fichier",
      },
      { status: 500 },
    );
  }
}

// Export the security-wrapped handler
export const GET = withSecurity(handleFileServing, "/api/serve-file");
