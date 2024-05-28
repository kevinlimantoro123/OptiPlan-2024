const router = require("express").Router();
const authorization = require("../middleware/auth");
const pool = require("../db/database");

//Create event
router.post("/events", authorization, async (req, res) => {
  try {
    const { title, description, label, day } = req.body;
    const event = await pool.query(
      "INSERT INTO events (title, description, label, day, user_id) VALUES($1, $2, $3, $4, $5) RETURNING*",
      [title, description, label, day, req.user]
    );
    res.json(event.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update event
router.put("/events/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, label, day } = req.body;
    const updateEvent = await pool.query(
      "UPDATE events SET title = $1, description = $2, label = $3, day = $4 WHERE id = $5",
      [title, description, label, day, id]
    );
  } catch (err) {
    console.error(err.message);
  }
});

//Delete event
router.delete("/events/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await pool.query("DELETE FROM events WHERE id = $1", [
      id,
    ]);
    res.json("Event has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
