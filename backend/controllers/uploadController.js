import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { imageSize } from "image-size";
import { IMAGE_SPECS, validateImageSpec } from "../config/imageSpecs.js";

export const uploadImage = async (req, res) => {
  try {
    console.log("=================================");
    console.log("UPLOAD REQUEST RECEIVED");
    console.log("=================================");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image selected",
      });
    }

    const slotKey = req.body.slot || req.query.slot;
    const spec = slotKey && IMAGE_SPECS[slotKey] ? IMAGE_SPECS[slotKey] : null;

    let dimensions = { width: 0, height: 0 };
    try {
      const sizeResult = imageSize(req.file.buffer);
      if (sizeResult) {
        dimensions = {
          width: sizeResult.width || 0,
          height: sizeResult.height || 0,
        };
      }
    } catch (dimErr) {
      console.warn("Could not determine image dimensions from buffer:", dimErr.message);
    }

    // Validate using spec if provided
    if (spec) {
      const validation = validateImageSpec(spec, {
        width: dimensions.width,
        height: dimensions.height,
        sizeBytes: req.file.size,
        mimeType: req.file.mimetype,
      });

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.error,
          slot: slotKey,
          dimensions,
        });
      }
    } else {
      // General validation for any upload
      const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/svg+xml"];
      if (!allowedMimes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Unsupported file type. Please upload a JPG, PNG, WebP, or SVG.",
        });
      }
    }

    console.log("Uploading image to Cloudinary...", { slot: slotKey, dimensions });

    const folderName = slotKey
      ? `imprenta/${slotKey.toLowerCase().replace(/_/g, "-")}`
      : "imprenta/products";

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log("Cloudinary Error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(uploadStream);
    });

    console.log("Upload Completed Successfully:", result.secure_url);

    return res.status(200).json({
      success: true,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
        width: dimensions.width || result.width,
        height: dimensions.height || result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });

  } catch (error) {
    console.log("========== UPLOAD ERROR ==========");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image",
    });
  }
};