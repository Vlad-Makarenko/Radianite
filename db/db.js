const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
})

connection.connect( err => {
    if (err) {
        console.log(err)
        return err;
    } else {
        console.log(`Connected to ${process.env.DATABASE} db ------ OK`);
    }
})

module.exports = connection;