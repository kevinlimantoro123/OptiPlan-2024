const express = require("express");
const app = express();

const port = process.env.PORT || 3000; //looks for any free port. If not, use 3000

app.get("/", (req, res) => {
  //Initialise request and response
  res.status(200).send("START");
});

app.listen(port, () => {
  //Listen for users on the specific port
  console.log(`Server running on port ${port}`);
});
