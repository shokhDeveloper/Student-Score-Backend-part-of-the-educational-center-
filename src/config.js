import { config } from "dotenv";
import { IP_ADDRESS } from "#network";

export const serverConfiguration = {
    PORT: process.env.PORT || 4000,
    address: IP_ADDRESS || "localhost",
    token_duration: "30d", 
}   

export const postgresConfiguration = {
    database: "score",
    password: "82850406m",
    host: "localhost",
    port: 5432,
    user: "postgres"   
}

config();