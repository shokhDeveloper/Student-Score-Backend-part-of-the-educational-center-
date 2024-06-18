import express from "express";
import { courseController } from "#controller/courseController.js";
import { adminToken } from "#middlewares/adminToken.js";
export const courseRouter = express.Router();

courseRouter.route("/").get(adminToken, courseController.GET)

export default courseRouter;