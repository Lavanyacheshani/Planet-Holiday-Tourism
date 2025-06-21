const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const { Readable } = require("stream");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
const uploadImage = async (file, options = {}) => {
  try {
    const {
      folder = "planet-holiday",
      transformation = { quality: "auto", fetch_format: "auto" },
      public_id = null,
    } = options;

    // Process image with Sharp if it's a buffer
    let processedImage = file;
    if (Buffer.isBuffer(file)) {
      processedImage = await sharp(file)
        .resize(1920, 1080, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();
    }

    const uploadOptions = {
      folder,
      transformation,
      resource_type: "image",
    };

    if (public_id) {
      uploadOptions.public_id = public_id;
    }

    const result = await cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      })
      .end(processedImage);

    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image");
  }
};

// Delete image from Cloudinary
const deleteImage = async (imageUrl) => {
  try {
    // Extract public_id from URL
    const urlParts = imageUrl.split("/");
    const filename = urlParts[urlParts.length - 1];
    const public_id = filename.split(".")[0];

    // Remove folder path from public_id if present
    const folderPath = "planet-holiday/";
    const cleanPublicId = public_id.replace(folderPath, "");

    const result = await cloudinary.uploader.destroy(cleanPublicId);

    if (result.result === "ok") {
      return { success: true, message: "Image deleted successfully" };
    } else {
      throw new Error("Failed to delete image");
    }
  } catch (error) {
    console.error("Image deletion error:", error);
    throw new Error("Failed to delete image");
  }
};

// Generate multiple image sizes
const generateImageSizes = async (
  imageUrl,
  sizes = ["thumbnail", "medium", "large"]
) => {
  try {
    const transformations = {
      thumbnail: { width: 300, height: 200, crop: "fill" },
      medium: { width: 800, height: 600, crop: "fill" },
      large: { width: 1200, height: 800, crop: "fill" },
    };

    const results = {};

    for (const size of sizes) {
      if (transformations[size]) {
        const transformedUrl = cloudinary.url(imageUrl, {
          transformation: transformations[size],
        });
        results[size] = transformedUrl;
      }
    }

    return results;
  } catch (error) {
    console.error("Image size generation error:", error);
    throw new Error("Failed to generate image sizes");
  }
};

// Optimize image for web
const optimizeImage = async (imageUrl, options = {}) => {
  try {
    const {
      quality = "auto",
      format = "auto",
      width = null,
      height = null,
    } = options;

    const transformation = {
      quality,
      fetch_format: format,
    };

    if (width || height) {
      transformation.width = width;
      transformation.height = height;
      transformation.crop = "fill";
    }

    const optimizedUrl = cloudinary.url(imageUrl, {
      transformation,
    });

    return optimizedUrl;
  } catch (error) {
    console.error("Image optimization error:", error);
    throw new Error("Failed to optimize image");
  }
};

// Upload multiple images
const uploadMultipleImages = async (files, options = {}) => {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, options));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Multiple image upload error:", error);
    throw new Error("Failed to upload multiple images");
  }
};

// Create image gallery
const createImageGallery = async (images, options = {}) => {
  try {
    const {
      folder = "planet-holiday/gallery",
      transformation = { quality: "auto", fetch_format: "auto" },
    } = options;

    const uploadedImages = await uploadMultipleImages(images, {
      folder,
      transformation,
    });

    return uploadedImages.map((image, index) => ({
      ...image,
      order: index,
      isMain: index === 0, // First image is main
    }));
  } catch (error) {
    console.error("Gallery creation error:", error);
    throw new Error("Failed to create image gallery");
  }
};

// Validate image file
const validateImage = (file) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
  }

  if (file.size > maxSize) {
    throw new Error("File too large. Maximum size is 5MB.");
  }

  return true;
};

module.exports = {
  uploadImage,
  deleteImage,
  generateImageSizes,
  optimizeImage,
  uploadMultipleImages,
  createImageGallery,
  validateImage,
};
