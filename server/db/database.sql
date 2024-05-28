CREATE DATABASE postgres;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    label VARCHAR(255) NOT NULL,
    day VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
)