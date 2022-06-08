const mysql = require("mysql2");
const fs = require("fs");

var query_str1 = fs.readFileSync("db/card.sql").toString();
var query_str2 = fs.readFileSync("db/user.sql").toString();
var query_str3 = fs.readFileSync("db/room.sql").toString();

const query_strs = [query_str1, query_str2, query_str3];
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Phoenix.png', 'card deals 12 damage to the opponent', 'damage', 12, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Reyna.png', 'card deals 12 damage to the opponent', 'damage', 12, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Raze.png', 'card deals 9 damage to the opponent', 'damage', 9, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Sova.png', 'card deals 9 damage to the opponent', 'damage', 9, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Fade.png', 'card deals 6 damage to the opponent', 'damage', 6, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Breach.png', 'card deals 6 damage to the opponent', 'damage', 6, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Jett.png', 'card deals 4 damage to the opponent', 'damage', 4, 2, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Neon.png', 'card deals 2 damage to the opponent', 'damage', 2, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Yoru.png', 'card deals 2 damage to the opponent', 'damage', 2, 1, 'public');"
);

query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Chamber.png', 'This card provides protection against 9 damage', 'defense', 9, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Killjoy.png', 'This card provides protection against 9 damage', 'defense', 9, 5, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Sage.png', 'This card provides protection against 6 damage', 'defense', 6, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Cypher.png', 'This card provides protection against 6 damage', 'defense', 6, 4, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Kayo.png', 'This card provides protection against 4 damage', 'defense', 4, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Viper.png', 'This card provides protection against 4 damage', 'defense', 4, 3, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Brimstone.png', 'This card provides protection against 2 damage', 'defense', 2, 2, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Astra.png', 'This card provides protection against 1 damage', 'defense', 1, 1, 'public');"
);
query_strs.push(
  "INSERT IGNORE INTO card (name, description, type, power_points, price, status) VALUES ('Omen.png', 'This card provides protection against 1 damage', 'defense', 1, 1, 'public');"
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
