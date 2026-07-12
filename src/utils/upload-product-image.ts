import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

type UploadProductImageResult = {
  publicId: string;
  secureUrl: string;
  format: string;
} | null;

export const uploadProductImage = async (
  imageFile: File | null,
): Promise<UploadProductImageResult> => {
  if (!(imageFile instanceof File) || imageFile.size === 0) return null;

  const imageBytes = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(imageBytes);

  const fileUpload = await new Promise<{
    public_id: string;
    secure_url: string;
    format: string;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "products" }, (error, response) => {
        if (error || !response)
          return reject(error ?? new Error("Upload failed"));
        resolve(
          response as { public_id: string; secure_url: string; format: string },
        );
      })
      .end(imageBuffer);
  });

  return {
    publicId: fileUpload.public_id,
    secureUrl: fileUpload.secure_url,
    format: fileUpload.format,
  };
};

export const deleteProductImage = async (
  publicId: string | null | undefined,
) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};
