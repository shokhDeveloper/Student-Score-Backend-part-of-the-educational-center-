import express from "express";
import { serverConfiguration } from "#config";
import { authRouter } from "#router/authRouter.js";
import { model } from "#middlewares/model.js";
import  courseRouter  from "#router/courseRouter.js";
import { authToken } from "#middlewares/authToken.js";

const app = express();
const {PORT, address} = serverConfiguration;

app.use(express.json());
app.use(model)

// Authentication
app.use("/auth", authRouter);

// check token
app.use(authToken);

// Admin routes
app.use("/courses", courseRouter)

app.listen(PORT, () => {
    console.log(`Server is running http://${address}:${PORT}`);
});