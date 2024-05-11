CREATE DATABASE IF NOT EXISTS programacion_avanzada_2;

USE programacion_avanzada_2;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    title VARCHAR(50) NOT NULL,
    year INT NOT NULL
);
