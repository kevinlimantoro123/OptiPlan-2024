import { useState, useEffect } from "react";

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
        title="Meeting"
        label="indigo"
        headingColor="text-indigo-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Work"
        label="red"
        headingColor="text-red-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Class"
        label="blue"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Important"
        label="green"
        headingColor="text-green-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Personal"
        label="purple"
        headingColor="text-purple-200"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

const Column = ({ title, headingColor, cards, label, setCards }) => {
  const [active, setActive] = useState(false);

  const filteredCards = cards.filter((e) => e.label === label);
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
      ></div>
    </div>
  );
};

export default Board;
