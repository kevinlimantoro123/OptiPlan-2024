const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "YpubqnvztNKmrgGUhQJCEijalIzpvBle",
  host: "viaduct.proxy.rlwy.net",
  port: 46433,
  database: "railway",
});

module.exports = pool;
