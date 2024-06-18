import { adminController } from "#controller/adminController.js";
import { adminToken } from "#middlewares/adminToken.js";
import express from "express";

export const adminRouter = express.Router();

adminRouter.route("/").get(adminToken, adminController.GET);
adminRouter.route("/:adminId").get(adminToken, adminController.GET).put(adminToken, adminController.PUT).delete(adminToken, adminController.DELETE);