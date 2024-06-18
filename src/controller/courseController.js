import { ClientError, ServerError, globalError } from "#error"
import { deleteCourse, getCourses, updateCourse } from "#utils/postgres.js"
import { courseValidator } from "#utils/validator.js";

export const courseController = {
    GET: async function(req, res) {
        try{
            const {courseId} = req.params;
            if(courseId) return res.status(200).json(await getCourses(courseId))
            else return res.status(200).json(await getCourses());
        }catch(error){
            return globalError(res, error)
        }
    },
    PUT: async function(req, res){
        try{
            const {courseId} = req.params;
            const updateValues = req.body;
            const [ course ] = await getCourses(courseId);
            if(!course) throw new ClientError(404, "Course not found");
            const validate = req.validate(courseValidator, updateValues);
            const updateCourseRes = await updateCourse(validate.course_name, courseId);
            if(!updateCourseRes) throw new ServerError("There was an error updating the course !");
            return res.status(200).json({message: "Course updated successfully", statusCode: 200, course: updateCourseRes});
        }catch(error){
            return globalError(res, error);
        }
    },
    DELETE: async function(req, res) {
        try{
            const {courseId} = req.params;
            const [ course ] = await getCourses(courseId);
            if(!course) throw new ClientError(404, "Course not found");
            const deleteCourseRes = await deleteCourse(courseId);
            if(!deleteCourseRes) throw new ServerError("There was an error deleting the course !");
            return res.status(200).json({message: "Course deleted successfully", statusCode: 200});
        }catch(error){
            return globalError(res, error);
        }
    }
}