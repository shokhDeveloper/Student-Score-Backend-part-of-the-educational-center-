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
export const getAdmins = (adminId) => fetch(`SELECT user_first_name, user_last_name, user_username from users WHERE user_role=1 and CASE WHEN $1 > 0 THEN  user_id=$1 ELSE true END;`, adminId ? true : false, adminId);
export const updateAdmin = (adminId, ...values) => fetch(`
    UPDATE users SET  
    user_first_name=CASE WHEN LENGTH($2) > 0 THEN $2 ELSE user_first_name END,
    user_last_name=CASE WHEN LENGTH($3) > 0 THEN $3 ELSE user_last_name END,
    user_username=CASE WHEN LENGTH($4) > 0 THEN $4 ELSE user_username END,
    user_role=CASE WHEN $5 > 0 THEN $5 ELSE user_role END,
    user_gender=CASE WHEN $6 > 0 THEN $6 ELSE user_gender END,
    user_password=CASE WHEN LENGTH($7) > 0 THEN crypt($7, gen_salt('bf')) ELSE user_password END 
    WHERE user_id=$1
    RETURNING CASE WHEN LENGTH($2) > 0 THEN $2 ELSE user_first_name END as admin_first_name, CASE WHEN LENGTH($3) > 0 THEN $3 ELSE user_last_name END as admin_last_name, CASE WHEN LENGTH($4) > 0 THEN $4 ELSE user_username END as admin_username;
`, true, adminId, ...values);
export const deleteAdmin = (adminId) => fetch(`DELETE from users WHERE user_id=$1 RETURNING user_first_name as admin_first_name`, true, adminId);