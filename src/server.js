import express from "express";
import { serverConfiguration } from "#config";
import { authRouter } from "#router/authRouter.js";
import { model } from "#middlewares/model.js";

const app = express();
const {PORT, address} = serverConfiguration

app.use(express.json());
app.use(model)

// Authentication
app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is running http://${address}:${PORT}`)
})