import { postgresConfiguration } from "#config";
import pg from "pg";
const { Pool } = pg
const pool = new Pool(postgresConfiguration);

export const fetch = async (query, type, ...params) => {
    const client = await pool.connect()
    try{
        if(type){
            const {rows:[row]} = await client.query(query, params);
            return row
        }else{
            const {rows} = await client.query(query, params);
            return rows
        }
    } catch(error){
        console.log(error)
    } finally {
        client.release()
    }
}
export const getAdmin = (...values) => fetch(`SELECT u.user_id, u.user_first_name as admin_first_name, 
u.user_last_name as admin_last_name, 
u.user_username as admin_username
FROM users u 
WHERE u.user_first_name=$1 
AND u.user_last_name=$2 
AND u.user_username=$3 
AND u.user_role=$4 
AND u.user_gender=$5 
AND u.user_password=crypt($6, u.user_password);`, true, ...values);

export const getCourses = (courseId) => fetch(`SELECT * FROM courses WHERE CASE WHEN $1 > 0 THEN course_id=$1 ELSE true END`, false, courseId);
export const getUser = (userId) => fetch(`SELECT * from users WHERE user_id=$1`, true, userId);
export const insertCourse = (course_name) => fetch(`INSERT INTO courses (course_name) VALUES($1) RETURNING *;`, true, course_name)
export const updateCourse = (course_name, courseId) => fetch(`UPDATE courses SET course_name=$1 WHERE course_id=$2 RETURNING *`, true, course_name, courseId);
export const deleteCourse = (courseId) => fetch(`DELETE from courses WHERE course_id=$1 RETURNING *;`, true, courseId);
export const insertNewAdmin = (...values) => fetch(`INSERT INTO users (user_first_name, user_last_name, user_username, user_role, user_gender, user_password) VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt('bf'))) RETURNING user_first_name, user_last_name, user_username;`, false, ...values);