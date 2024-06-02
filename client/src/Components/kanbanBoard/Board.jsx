import { useState, useEffect } from "react";
import Column from "./Column";

const Board = () => {
  const [cards, setCards] = useState("");

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
        column="meeting"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Work"
        column="work"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Class"
        column="class"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Important"
        column="important"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Personal"
        column="personal"
        headingColor="text-black-200"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

export default Board;
