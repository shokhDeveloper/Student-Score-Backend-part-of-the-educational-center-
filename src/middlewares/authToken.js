import { ClientError, globalError } from "#error"
import { tokenConfig } from "#utils/jwt.js";
import { getUser } from "#utils/postgres.js";

export const authToken =  async (req, res, next) => {
    try{
        if(!req.headers.authorization) throw new ClientError(401, "Unauthorized ! A request has been sent that requires you to register !");
        const token = tokenConfig.verifyToken(req.headers.authorization);
        if(!token.user_id) throw new ClientError(401, "Token is invalid !");
        const user = await getUser(token.user_id);
        if(!user) throw new ClientError(404, "User not found and token is invalid !");
        if(!(req.headers["user-agent"] == token.user_agent)) throw new ClientError(401, "Token is invalid !");
        if(user.user_id && req.headers["user-agent"] == token.user_agent){
            req.userInfo = user
            return next();
        }
    }catch(error){
        return globalError(res, error);
    };
};