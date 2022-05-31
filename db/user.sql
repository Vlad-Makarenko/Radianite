-- CREATE DATABASE IF NOT EXISTS radianite;
-- USE radianite;
CREATE TABLE IF NOT EXISTS user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(69) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    avatar VARCHAR(255) NOT NULL
);