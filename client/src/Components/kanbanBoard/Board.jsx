import { useState, useEffect } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import BurnCard from "./BurnCard";
import AddCard from "./AddCard";

const Board = () => {
  const [cards, setCards] = useState([]);

  async function getEvents() {
    try {
      const res = await fetch("http://localhost:5000/kanban", {
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
    <div className="flex h-full w-full gap-4 overflow-scroll p-12">
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
        headingColor="text-emerald-200"
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
    const cardId = "" + card.id;
    e.dataTransfer.setData("cardId", cardId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  async function handleDragEnd(e) {
    setActive(false);
    clearHighlights();

    const id = Number(e.dataTransfer.getData("cardId"));
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || -1;

    if (before !== id) {
      let copy = [...cards];
      let cardTransfer = copy.find((c) => c.id === id);
      if (!cardTransfer) return;
      cardTransfer = { ...cardTransfer, col };
      copy = copy.filter((c) => c.id !== id);

      try {
        const body = { col };
        const res = await fetch("http://localhost:5000/kanban/cards/" + id, {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        await res.json();
      } catch (err) {
        console.error(err.message);
      }

      const moveBack = before === -1;
      if (moveBack) {
        copy.push(cardTransfer);
      } else {
        const insertAtIndex = copy.findIndex((e) => e.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardTransfer);
      }
      setCards(copy);
    }
  }

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const nearest = getNearestIndicator(e, indicators);
    nearest.element.style.opacity = "1";
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-col="${col}"]`));
  };

  const getNearestIndicator = (e, indicators) => {
    const DIST_OFFSET = 50;

    const nearest = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DIST_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return {
            offset: offset,
            element: child,
          };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return nearest;
  };

  const clearHighlights = (e) => {
    const indicators = e || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
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
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((e) => {
          return <Card key={e.id} {...e} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={negative1} col={col} />
        <AddCard col={col} setCards={setCards} />
      </div>
    </div>
  );
};

export default Board;
