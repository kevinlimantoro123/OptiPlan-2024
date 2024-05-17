const express = require("express");
const app = express();

const port = process.env.PORT || 3000; //looks for any free port. If not, use 3000

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //Initialise request and response
  res.render("index");
});

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", { user: "TEST USER" });
});

app.listen(port, () => {
  //Listen for users on the specific port
  console.log(`Server running on port ${port}`);
});
