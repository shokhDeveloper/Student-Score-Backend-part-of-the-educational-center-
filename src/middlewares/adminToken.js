import { ClientError, globalError } from "#error"
import { tokenConfig } from "#utils/jwt.js";

export const adminToken = (req, res, next) => {
    try{
        const token = tokenConfig.verifyToken(req.headers["authorization"]);
        if(!token.admin) throw new ClientError(403, "You are not an admin")
        return next()
    }catch(error){
        return globalError(res, error);
    }
}