import { useState, useEffect } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import BurnCard from "./BurnCard";
import AddCard from "./AddCard";

const Board = () => {
  const [cards, setCards] = useState([]);

  async function getEvents() {
    try {
      const res = await fetch("http://localhost:5000/task", {
        method: "GET",
        headers: { token: localStorage.token },
      });
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
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        col="backlog"
        headingColor="text-indigo-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Todo"
        col="todo"
        headingColor="text-red-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Progress"
        col="in progress"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Completed"
        col="completed"
        headingColor="text-green-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnCard setCards={setCards} />
    </div>
  );
};

const Column = ({ title, col, headingColor, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const negative1 = -1;
  const filteredCards = cards.filter((e) => e.col === col);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${
          !active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((e) => {
          return <Card key={e.id} {...e} />;
        })}
        <DropIndicator beforeId={negative1} col={col} />
        <AddCard col={col} setCards={setCards} />
      </div>
    </div>
  );
};

export default Board;
