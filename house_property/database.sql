CREATE DATABASE IF NOT EXISTS house_property_db;
USE house_property_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_name VARCHAR(100) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    status ENUM('Available','Reserved','Sold','Rented') DEFAULT 'Available',
    description TEXT,
    date_listed DATE NOT NULL
);

INSERT INTO users (username, password)
VALUES ('admin', 'admin123');

INSERT INTO properties
(property_name, property_type, location, price, bedrooms, bathrooms, area, status, description, date_listed)
VALUES
('Family House', 'House', 'Cagayan de Oro', 2500000, 3, 2, 120, 'Available',
'A spacious family house.', '2026-08-18'),
('Modern Apartment', 'Apartment', 'General Santos City', 15000, 2, 1, 80, 'Rented',
'Modern apartment for a small family.', '2026-08-15'),
('Green Townhouse', 'Townhouse', 'Davao City', 3200000, 3, 2, 100, 'Available',
'Modern townhouse in a quiet community.', '2026-08-10');
