import express from "express";
import { courseController } from "#controller/courseController.js";
import { adminToken } from "#middlewares/adminToken.js";
export const courseRouter = express.Router();

courseRouter.route("/").get(adminToken, courseController.GET);
courseRouter.route("/:courseId").get(adminToken, courseController.GET).put(adminToken, courseController.PUT).delete(adminToken, courseController.DELETE);

export default courseRouter;