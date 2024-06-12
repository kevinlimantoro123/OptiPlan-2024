import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
    const [ monthIndex, setMonthIndex ] = useState(dayjs().month());
    const [ smallCalendarMonth, setSmallCalendarMonth ] = useState(null);
    const [ daySelected, setDaySelected ] = useState(dayjs());
    const [ showEventModel, setShowEventModel ] = useState(false);
    const [ selectedEvent, setSelectedEvent ] = useState(null);
    const [ savedEvents, setSavedEvents ] = useState([]);
    const [ selectedCalView, setSelectedCalView ] = useState("month");
    const [ week, setWeek ] = useState([]);
    const [ showGrid, setShowGrid ] = useState(false);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    setWeek([
      daySelected.day(0),
      daySelected.day(1),
      daySelected.day(2),
      daySelected.day(3),
      daySelected.day(4),
      daySelected.day(5),
      daySelected.day(6),
    ]);
  }, [daySelected]);

  async function getAllEvents() {
    try {
      const res = await fetch("http://localhost:5000/calendar", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      setSavedEvents(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, [showEventModel]);

    return (
        <GlobalContext.Provider value = {{ 
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
            selectedCalView,
            setSelectedCalView,
            week,
            setWeek,
            showGrid,
            setShowGrid
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
