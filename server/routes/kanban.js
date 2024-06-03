const router = require("express").Router();
const authorization = require("../middleware/auth");
const pool = require("../db/database");

//Get all cards
router.get("/", authorization, async (req, res) => {
  try {
    const allTasks = await pool.query(
      "SELECT * FROM cards WHERE user_id = $1",
      [req.user]
    );
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Create card
router.post("/cards", authorization, async (req, res) => {
  try {
    const { title, col } = req.body;
    const event = await pool.query(
      "INSERT INTO cards (title, col, user_id) VALUES($1, $2, $3) RETURNING title, col, id",
      [title, col, req.user]
    );
    res.json(event.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;

//Delete card
router.delete("/delete/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCard = await pool.query("DELETE FROM cards WHERE id = $1", [
      id,
    ]);
    res.json("Card has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});
