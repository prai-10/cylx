/**
 * Media Storage Abstraction (Cloudinary / S3 / Supabase Storage ready)
 * Decouples upload logic from the UI components.
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export async function uploadMedia(file: File | Blob, folder = 'clyx_uploads'): Promise<UploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;

  if (!cloudName || !apiKey) {
    console.log('[Cloudinary] Cloudinary credentials not configured. Returning local object URL fallback.');
    return {
      success: true,
      url: URL.createObjectURL(file),
      publicId: `mock_media_${Date.now()}`,
    };
  }

  // Upload to Cloudinary API
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'clyx_default');
    formData.append('folder', folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Cloudinary] Upload failed:', err);
      return { success: false, error: err };
    }

    const data = await res.json();
    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('[Cloudinary] Network error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown upload error',
    };
  }
}
