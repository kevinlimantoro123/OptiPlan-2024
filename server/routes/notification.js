const router = require("express").Router();
const authorization = require("../middleware/auth");
const pool = require("../db/database");

//Update event
router.put("/events/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { notified } = req.body;
    const updateEvent = await pool.query(
      "UPDATE events SET notified = $1 WHERE id = $2 AND user_id = $3",
      [notified, id, req.user]
    );
    res.json(updateEvent);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
