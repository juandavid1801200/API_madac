import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({path:'./src/env/.env'})

export const pool = createPool({
    host:'roundhouse.proxy.rlwy.net', 
    user:'root',
    password:'hyMFaEXhckCYJsVeZkBKHQARgtsSiFcP',
    port:'10092',
    database:'railway'
})