import { NextRequest, NextResponse } from "next/server";

// Media proxy to hide backend URL from client
// Usage: /api/media/uploads/image.jpg -> proxies to backend
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: pathArray } = await params;

    // Join path segments
    const path = pathArray?.join("/") || "";

    if (!path || path.trim() === "") {
      return new NextResponse("Missing or invalid path parameter", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // Construct backend URL using internal Docker network in production
    const backendUrl =
      process.env.STRAPI_INTERNAL_URL ||
      process.env.STRAPI_API_URL ||
      process.env.NEXT_PUBLIC_STRAPI_API_URL;

    if (!backendUrl) {
      return new NextResponse("Backend URL not configured", {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const fullUrl = `${backendUrl}/${path}`;

    // Fetch from backend
    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch media: ${response.status}`, {
        status: response.status,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // Get the content type and buffer
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const buffer = await response.arrayBuffer();

    // Return the media with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Internal server error: ${errorMessage}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
