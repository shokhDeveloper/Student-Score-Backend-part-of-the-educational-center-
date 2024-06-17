import { globalError } from "#error"

export const authController = {
    ADMIN:{
        LOGIN: async function(_, res){
            try{
            }catch(error){
                return globalError(res, error);
            }
        }
    }
}