import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { NODE_ENV } = process.env;
let conn;

if (NODE_ENV === 'test') {
  conn = {
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    port: 3306,
  };
} else {  
  conn = {
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
  };
}

export default mysql.createPool(conn);