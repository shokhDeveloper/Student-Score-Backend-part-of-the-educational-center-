import { ClientError, globalError } from "#error"
import { tokenConfig } from "#utils/jwt.js";
import { adminValidator, userValidator } from "#utils/validator.js";
import { getAdmin } from "../utils/postgres.js";

export const authController = {
    ADMIN:{
        LOGIN: async function(req, res){
            try{
                const adminValues = req.body;
                const validate = req.validate(adminValidator, adminValues);
                const admin = await getAdmin(...Object.values(validate));
                if(!admin) throw new ClientError(400, "There is an error in admin login");
                const {createToken} = tokenConfig
                return res.status(200).json({accessToken: createToken({user_id: admin.user_id, admin: true, admin, user_agent: req["headers"]["user-agent"]}), statusCode: 200, message: "Admin successfully logged in"})
            }catch(error){
                return globalError(res, error);
            }
        }
    }
}