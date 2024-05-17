const { Client } = require("pg");

const client = new Client(process.env.DB_URL); //Configures SQL

module.experts = client;
