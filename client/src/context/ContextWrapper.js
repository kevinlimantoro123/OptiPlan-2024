import React, { useEffect, useState, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((event) => (event.id === payload.id ? payload : event));
    case "delete":
      return state.filter((event) => event.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModel, setShowEventModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, setSavedEvents] = useState([]);
  //const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

  async function getEvents() {
    try {
      const res = await fetch("http://localhost:5000/calendar/events", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      setSavedEvents(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    getEvents();
  }, [selectedEvent]);

  // useEffect(() => {
  //     localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  // }, [savedEvents])

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModel,
        setShowEventModel,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setSavedEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
