// File Upload Service for Strapi Media Library
// Handles file uploads to Strapi's media library

export interface FileUploadResult {
  success: boolean;
  data?: {
    id: number;
    name: string;
    url: string;
    mime: string;
    size: number;
  };
  error?: string;
}

export const uploadFileToStrapi = async (
  file: File
): Promise<FileUploadResult> => {
  try {
    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: formData,
      }
    );

    const errorData = await response.json();

    if (!response.ok) {
      // Handle security errors properly - return error result instead of throwing
      if (errorData.type === "validation_error" && errorData.message) {
        throw new Error(errorData.message);
      } else if (errorData.error?.message) {
        throw new Error(errorData.error.message);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      return {
        success: true,
        data: result[0],
      };
    } else {
      throw new Error("No file data returned from upload");
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors du téléversement du fichier",
    };
  }
};
