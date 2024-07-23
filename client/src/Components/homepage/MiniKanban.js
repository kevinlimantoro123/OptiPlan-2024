import React, { useState, useEffect } from "react";

export default function MiniKanban() {
  const [cards, setCards] = useState([]);

  async function getEvents() {
    try {
      const res = await fetch(
        "https://opti-plan-2024-backend.vercel.app/kanban",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await res.json();
      setCards(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-4 items-center justify-items-center px-2">
      <div className="text-indigo-500 grid grid-rows-2 items-center justify-items-center">
        <div className="text-6xl">
          {cards.filter((card) => card.col === "backlog").length}
        </div>
        <p className="text-lg">Backlog</p>
      </div>
      <div className="text-red-200 grid grid-rows-2 items-center justify-items-center">
        <div className="text-6xl">
          {cards.filter((card) => card.col === "todo").length}
        </div>
        <p className="text-lg">Todo</p>
      </div>
      <div className="text-blue-200 grid grid-rows-2 items-center justify-items-center">
        <div className="text-6xl">
          {cards.filter((card) => card.col === "in progress").length}
        </div>
        <p className="text-lg">In Progress</p>
      </div>
      <div className="text-emerald-200 grid grid-rows-2 items-center justify-items-center">
        <div className="text-6xl">
          {cards.filter((card) => card.col === "completed").length}
        </div>
        <p className="text-lg">Completed</p>
      </div>
    </div>
  );
}
