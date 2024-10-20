import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SEC,
});

const uploadOnCloudinary = async (localFilePath, folder) => {
  const filePath = path.resolve(localFilePath);

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: folder,
    });

    fs.unlinkSync(filePath);

    return res;
  } catch (error) {
    console.error("Failed to upload on Cloudinary:", error.message); // Log the error message
    // Ensure file exists before attempting to delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return null;
  }
};

export default uploadOnCloudinary;
