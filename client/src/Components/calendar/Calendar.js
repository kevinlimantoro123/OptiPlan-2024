import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../../context/GlobalContext";
import EventModel from "./EventModel";
import Daily from "./Daily";
import Weekly from "./Weekly";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModel, selectedCalView } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          {selectedCalView === "month" ? (
            <Month month={currentMonth} />
          ) : selectedCalView === "week" ? (
            <Weekly />
          ) : (
            <Daily />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Calendar;
