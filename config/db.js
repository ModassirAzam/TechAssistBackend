import mysql from 'mysql2';

const db = mysql.createConnection({
host: "localhost",
user: "modassir",
password: "Modassir@12",
database:"ums" 
})

export default db;