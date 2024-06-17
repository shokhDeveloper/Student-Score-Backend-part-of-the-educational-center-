import { config } from "dotenv";
import { IP_ADDRESS } from "#network";

export const serverConfiguration = {
    PORT: process.env.PORT || 4000,
    address: IP_ADDRESS || "localhost",
    token_duration: "30d", 
}   

config();