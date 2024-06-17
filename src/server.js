import express from "express";
import { serverConfiguration } from "#config";

const app = express();
const {PORT, address} = serverConfiguration


app.listen(PORT, () => {
    console.log(`Server is running http://${address}:${PORT}`)
})