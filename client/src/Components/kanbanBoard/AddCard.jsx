import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const AddCard = ({ col, setCards }) => {
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim().length) return;

    try {
      const body = {
        title: title.trim(),
        col,
      };
      const res = await fetch("http://localhost:5000/kanban/cards", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      await res.json();
      setCards((c) => [...c, body]);
      setAdding(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            placeholder="Add new event..."
            className="w-full rounded border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50
            placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors
            hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs 
            text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400
        transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
