const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "snehal@344",
	database: "users",
});

module.exports = pool.promise(); // Export the pool with promise support
