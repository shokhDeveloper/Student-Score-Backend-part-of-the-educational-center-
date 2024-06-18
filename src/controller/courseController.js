import { globalError } from "#error"
import { getCourses } from "#utils/postgres.js"

export const courseController = {
    GET: async function(req, res) {
        try{
            const courses = await getCourses();
            return res.status(200).json(courses)
        }catch(error){
            return globalError(res, error)
        }
    }
}