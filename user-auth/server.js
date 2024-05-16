const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
  user: "your_db_user",
  host: "localhost",
  database: "user_auth_db",
  password: "your_db_password",
  port: 5432,
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, email]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
