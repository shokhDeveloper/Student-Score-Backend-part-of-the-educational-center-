import { ServerError, globalError } from "#error"
import { insertCourse, insertNewAdmin } from "#postgres";
import { adminValidator, courseValidator } from "#utils/validator.js";

export const mutationController = {
    COURSE: async function(req, res){
        try{
            const newCourse = req.body;         
            const validate = req.validate(courseValidator, newCourse);
            const insertNewCourse = await insertCourse(validate.course_name);
            if(!insertNewCourse) throw new ServerError("An error occurred while writing the course to the database");
            return res.status(201).json({message: "Course created successfully", course: insertNewCourse, statusCode: 201})
        }catch(error){
            return globalError(res, error);
        };
    },
    ADMIN: async function(req, res){
        try{
            const newAdmin = req.body;
            const validate = req.validate(adminValidator, newAdmin);
            if(validate){
                const {user_first_name, user_last_name, user_username, user_role, user_gender, user_password} = validate
                const insertAdmin = await insertNewAdmin(user_first_name, user_last_name, user_username, user_role, user_gender, user_password);
                if(!insertAdmin) throw new ServerError("There was an error creating a new admin !");
                return res.status(201).json({message: "New admin successfully created", statusCode: 201, admin: insertAdmin});       
            };
        }catch(error){
            return globalError(res, error);
        };
    }
}