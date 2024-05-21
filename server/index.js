const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./src/db/database");

app.use(cors());
app.use(express.json());

//Create a user
app.post("/users", async (req, res) => {
  try {
    const { user, pwd } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (name) VALUES($1) RETURNING*",
      [user]
    );
    const newPwd = await pool.query(
      "INSERT INTO users (password) VALUES($1) RETURNING*",
      [pwd]
    );
    res.json(newUser);
    res.json(newPwd);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all users
app.get("/users", async (red, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers);
  } catch (err) {
    console.error(err.message);
  }
});

//Get specific user (select by id)
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user);
  } catch (err) {
    console.error(err.message);
  }
});

//Update user (by id)
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, pwd } = req.body;
    const updateName = await pool.query(
      "UPDATE users SET name = $1 WHERE id = $2",
      [user, id]
    );
    const updatePwd = await poolquert(
      "UPDATE users SET password = $1 WHERE id = $2",
      [pwd, id]
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

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
