const express = require("express");
const app = express();

app.use(express.json());
app.use(cors()); //Enables cross origin sharing of resources

const port = process.env.PORT || 3000; //looks for any free port. If not, use 3000

app.get("/", (req, res) => {
  //Initialise request and response
  res.status(200).send("START");
});

app.listen(port, () => {
  //Listen for users on the speciific port
  console.log("Started at ${port}.");
});

require("./configs/dotenv");

const client = require("./configs/database");

client.connect((err) => {
  //see if connected to database or not
  if (err) {
    console.log(err);
  } else {
    console.log("Data logging started");
  }
});

const user = require("./routes/user");

app.use("/user", user); //Route for /user endpoint API
