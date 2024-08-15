import multer from "multer";
import path from "path";

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the directory to store the files
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

// Create the multer middleware
export const singleUpload = multer({ storage }).single("file");
