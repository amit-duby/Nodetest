import express from "express";
import { isAuthenticated } from "../utils/auth.js";
import {
  
  getallOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
  organizController
} from "../controller/organizationController.js";

const router = express.Router();

router.post("/create", isAuthenticated, organizController);
router.get("/all-organization", getallOrganization);
router.get("/find-organizationByid/:id", getOrganizationById);
router.put("/update-organization/:id", isAuthenticated, updateOrganizationById);
router.delete("/delete/:id", isAuthenticated, deleteOrganizationById);

export default router;
