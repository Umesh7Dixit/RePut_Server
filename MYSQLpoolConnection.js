import mysql from 'mysql2/promise'
import { configDotenv } from 'dotenv';

configDotenv();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

async function executeQuery(query) {
  try {
    const [results] = await pool.query(query);
    console.log(results);
    return results;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

executeQuery('SELECT * FROM transactions;')
  .then(() => pool.end())
  .catch(console.error);

















// import mysql from 'mysql2';
// import { configDotenv } from 'dotenv';

// configDotenv();

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database:  process.env.MYSQL_DB,
// }).promise() 


// const [rows] = await pool.query("SELECT * FROM transactions;");
// console.log(rows);