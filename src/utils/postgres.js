import { postgresConfiguration } from "#config";
import pg from "pg";
const { Pool } = pg
const pool = new Pool(postgresConfiguration);

export const fetch = async (query, type, ...params) => {
    const client = await pool.connect()
    try{
        if(type){
            const {rows, rows:[row]} = await client.query(query, params);
            console.log(row)
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

export const getCourses = () => fetch(`SELECT * FROM courses`);
export const getUser = (userId) => fetch(`SELECT * from users WHERE user_id=$1`, true, userId);
    