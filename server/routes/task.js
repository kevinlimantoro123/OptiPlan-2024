const router = require("express").Router();
const authorization = require("../middleware/auth");
const pool = require("../db/database");

//Get all events
router.get("/", authorization, async (req, res) => {
  try {
    const allTasks = await pool.query(
      "SELECT * FROM events WHERE user_id = $1",
      [req.user]
    );
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
