const mysql = require("mysql2");
const fs = require("fs");

var query_str1 = fs.readFileSync("db/card.sql").toString();
var query_str2 = fs.readFileSync("db/user.sql").toString();
var query_str3 = fs.readFileSync("db/room.sql").toString();

const query_strs = [query_str1, query_str2, query_str3];
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Devour.png', 'some description for devour', 'damage', 44, 4, 'unit');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('test.png', 'some description for test', 'damage', 44, 4, 'unit');"
);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

connection.connect(async (err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    for (let i = 0; i < query_strs.length; i++) {
      const element = query_strs[i];
      await connection.promise().query(element);
    }
    console.log(`Connected to ${process.env.DATABASE} db ------ OK`);
  }
});

module.exports = connection;
