import { mutationController } from "#controller/mutationController.js";
import { adminToken } from "#middlewares/adminToken.js";
import express from "express";
const mutationRouter = express.Router();

mutationRouter.route("/course").post(adminToken, mutationController.COURSE);
mutationRouter.route("/admin").post(adminToken, mutationController.ADMIN);

export default mutationRouter;