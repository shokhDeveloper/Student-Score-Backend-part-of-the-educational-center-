import { serverConfiguration } from "#config"
import { ServerError } from "#error"
import jwt from "jsonwebtoken"
const {sign, verify} = jwt
export const tokenConfig = {
    createToken: (payload) => {
        try{
            if(!payload) throw new ServerError("Token payload is not found")
            return sign(payload, process.env.SECRET_TOKEN_KEY, {expiresIn: serverConfiguration.token_duration});
        }catch(error){
            console.log(error)
        }
    },
    verifyToken: (token) => {
        try{
            if(!token) throw new ServerError("Token is not found");
            return verify(token, process.env.SECRET_TOKEN_KEY);
        }catch(error){
            console.log(error)
        }
    }
}