-- CREATE DATABASE IF NOT EXISTS radianite;
-- USE radianite;
CREATE TABLE IF NOT EXISTS card (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description varchar(255) NOT NULL,
    type ENUM('damage', 'defense') NOT NULL,
    power_points INT UNSIGNED NOT NULL,
    price INT UNSIGNED NOT NULL,
    status ENUM('unit', 'spell') NOT NULL
);