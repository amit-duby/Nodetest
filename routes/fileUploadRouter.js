import express from "express";
import { isAuthenticated } from "../utils/auth.js";
import { fileUploader } from "../controller/fileController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// Route for file upload
router.post("/file", isAuthenticated, upload.single('image'),fileUploader );

export default router;
