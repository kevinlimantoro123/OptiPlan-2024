const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/admin", require("./routes/admin"));
app.use("/calendar", require("./routes/calendar"));
app.use("/test", require("./routes/test"));

app.listen(process.env.PGPORT, () => {
  console.log("Server started");
});
