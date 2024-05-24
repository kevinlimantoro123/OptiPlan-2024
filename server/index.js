const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const pool = require("./db/database");
const authorization = require("./middleware/auth");
const SECRET_KEY = "ib0AvWFO3ArcwQ24K1C3uJPGiswpa8QC";

app.use(cors());
app.use(express.json());

//Create a user
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const { name, pwd } = req.body;
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, pwd) VALUES($1, $2) RETURNING*",
      [name, hashedPwd]
    );
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

//Get all users
app.get("/users", async (red, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get specific user (select by id)
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update user (by id)
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pwd } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET name = $1, pwd = $2 WHERE id = $3",
      [name, pwd, id]
    );
    res.json("User has been updated");
  } catch (err) {
    console.error(err.message);
  }
});

//Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    res.json("User has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//Login user
app.post("/login", async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const userAuth = await pool.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);

    const user = userAuth.rows[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const pwdMatch = await bcrypt.compare(pwd, user.pwd);
    if (!pwdMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwtGenerator(user.id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

//Verify token
app.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
