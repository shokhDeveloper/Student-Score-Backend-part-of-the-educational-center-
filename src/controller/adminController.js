import { ClientError, ServerError, globalError } from "#error"
import { deleteAdmin, getAdmins, updateAdmin } from "#postgres";
import { createValidator } from "#utils/validator.js";

export const adminController = {
    GET: async function(req, res){
        try{
            const {adminId} = req.params;
            if(adminId){
                const admin = await getAdmins(adminId);
                if(!admin) throw new ClientError(404, "Admin not found !");
            }
            return res.status(200).json(await getAdmins(adminId))
        }catch(error){
            return globalError(res, error);
        }
    },
    PUT: async function(req, res){
        try{
            if(!(req.userInfo.user_id==req.params.adminId)) throw new ClientError(400, "You can only update your information !");
            const {adminId} = req.params;
            const adminValues = req.body;
            const admin = await getAdmins(adminId);
            if(!admin) throw new ClientError(404, "Admin not found");
            const validate = req.validate(createValidator(adminValues), adminValues);
            const {user_first_name, user_last_name, user_username, user_role, user_gender, user_password} = validate
            const updateAdminRes = await updateAdmin(adminId, user_first_name, user_last_name, user_username, user_role, user_gender, user_password);
            if(!updateAdminRes) throw new ServerError("There was an error updating the admin")
            return res.status(200).json({message: "Admin updated successfully", statusCode: 200, admin: updateAdminRes})
            }catch(error){
            return globalError(res, error);
        }
    },
    DELETE: async function(req, res){
        try{
            if(!(req.params.adminId == req.userInfo.user_id)) throw new ClientError(400, "You can only delete your information !")
            const {adminId} = req.params;
            const admin = await getAdmins(adminId);
            if(!admin) throw new ClientError(404, "Admin not found !");
            const deleteAdminRes = await deleteAdmin(adminId);
            if(!deleteAdminRes) throw new ServerError("An error occurred while deleting the admin");
            return res.status(200).json({message: "Admin deleted successfully", statusCode: 200});
        }catch(error){
            return globalError(res, error);
        }
    }
}