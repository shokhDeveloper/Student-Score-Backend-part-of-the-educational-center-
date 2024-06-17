import { postgresConfiguration } from "#config";
import { Pool } from "pg";

const pool = new Pool(postgresConfiguration);

export const fetch = async (query, type, ...params) => {
    const client = await pool.connect()
    try{
        if(type){
            const {rows:[row]} = await client.query(query, ...params);
            return row
        }else{
            const {rows} = await client.query(query, ...params);
            return rows
        }
    } catch(error){
        console.log(error)
    } finally {
        client.release()
    }
}
