CREATE DATABASE OptiPlan;

CREATE TABLE users(
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "password" varchar NOT NULL
);