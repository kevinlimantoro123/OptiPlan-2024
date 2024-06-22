import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModel, setShowEventModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, setSavedEvents] = useState([]);
  const [selectedCalView, setSelectedCalView] = useState("month");
  const [week, setWeek] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(true);
  const [analyticsView, setAnalyticsView] = useState("Year Chart");
  const [notifEvents, setNotifEvents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(false);

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

  async function getNotifEvents() {
    try {
      const res = await fetch("http://localhost:5000/calendar", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      const notif = parseRes.filter(
        (event) =>
          dayjs(Number(event.day)).format("DD-MM-YYYY") ===
            dayjs().format("DD-MM-YYYY") && event.notified === false
      );
      setNotifEvents(notif);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function notify() {
    try {
      notifEvents.map(async (event) => {
        const body = { notified: true };
        const event_id = Number(event.id);
        const res = await fetch(
          "http://localhost:5000/notification/events/" + event_id,
          {
            method: "PUT",
            headers: {
              token: localStorage.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        await res.json();
      });
    } catch (err) {
      console.err(err.message);
    }
  }

  useEffect(() => {
    notify();
  }, [refreshKey]);

  useEffect(() => {
    getNotifEvents();
  }, [refreshKey]);

  useEffect(() => {
    getName();
  }, [verified]);

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
    console.log("refresh");
  }, [showEventModel, verified]);

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
        selectedCalView,
        setSelectedCalView,
        week,
        setWeek,
        showGrid,
        setShowGrid,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        name,
        setName,
        verified,
        setVerified,
        analyticsView,
        setAnalyticsView,
        notifEvents,
        setNotifEvents,
        refreshKey,
        setRefreshKey,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
