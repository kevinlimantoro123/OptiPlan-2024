import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {

  const initialState = {
    userProfile: false,
  };

  const [ monthIndex, setMonthIndex ] = useState(dayjs().month());
  const [ smallCalendarMonth, setSmallCalendarMonth ] = useState(null);
  const [ daySelected, setDaySelected ] = useState(dayjs());
  const [ showEventModel, setShowEventModel ] = useState(false);
  const [ selectedEvent, setSelectedEvent ] = useState(null);
  const [ savedEvents, setSavedEvents ] = useState([]);
  const [ selectedCalView, setSelectedCalView ] = useState("month");
  const [ week, setWeek ] = useState([]);
  const [ showGrid, setShowGrid ] = useState(true);
  const [ activeMenu, setActiveMenu ] = useState(true);
  const [ isClicked, setIsClicked ] = useState(initialState);
  const [ screenSize, setScreenSize ] = useState(undefined);
  const [ name, setName ] = useState("");
  const [verified, setVerified] = useState(true);

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  async function getName() {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      setName(parseRes.name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

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
            setShowGrid,
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            screenSize,
            setScreenSize,
            name,
            setName,
            verified,
            setVerified,
          }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}
