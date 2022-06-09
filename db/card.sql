-- CREATE DATABASE IF NOT EXISTS radianite;
-- USE radianite;
CREATE TABLE IF NOT EXISTS card (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    description varchar(255) NOT NULL,
    type ENUM('damage', 'defense', 'heal', 'smoke', 'flash', 'ult') NOT NULL,
    power_points INT UNSIGNED NOT NULL,
    price INT UNSIGNED NOT NULL,
    status ENUM('secret', 'public') NOT NULL DEFAULT 'public'
);