import { authController } from "#controller/authController.js";
import { Router } from "express";

export const authRouter = Router();

authRouter.route("/admin/login").post(authController.ADMIN.LOGIN);