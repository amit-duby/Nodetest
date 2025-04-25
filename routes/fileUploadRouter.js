import express from "express";
import { isAdmin, isAuthenticated } from "../utils/auth.js";
import { auditController, downloadfile, fileUploader, getAuditById } from "../controller/fileController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// Route for file upload
router.post("/file", isAuthenticated, upload.single('image'),fileUploader );
router.get("/files/:id/download",isAuthenticated,downloadfile)
router.post("/audit",isAuthenticated,auditController);
router.get("/get-audit/:id",isAuthenticated,isAdmin,getAuditById)

export default router;
