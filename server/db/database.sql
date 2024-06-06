CREATE DATABASE optiplan;

\c optiplan

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    pwd varchar(255) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    label VARCHAR(255) NOT NULL,
    day BIGINT NOT NULL,
    startTime VARCHAR(6) NOT NULL,
    endTime VARCHAR(6) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    col VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
);