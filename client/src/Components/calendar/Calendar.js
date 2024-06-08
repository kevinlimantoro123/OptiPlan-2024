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
  const [ currentMonth, setCurrentMonth ] = useState(getMonth());
  const { monthIndex, showEventModel, selectedCalView } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col bg-neutral-900">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          {selectedCalView === "month" 
            ? <Month month={currentMonth} />
            : selectedCalView === "week"
            ? <Weekly />
            : <Daily />}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
