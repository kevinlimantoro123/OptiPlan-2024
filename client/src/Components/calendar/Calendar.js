import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../../context/GlobalContext";
import EventModel from "./EventModel";
import { Navigate } from "react-router-dom";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModel } = useContext(GlobalContext);
  //   const [verified, setVerified] = useState(false);

  //   async function verify() {
  //     try {
  //       const res = await fetch("http://localhost:5000/auth/verify", {
  //         method: "GET",
  //         headers: { token: localStorage.token },
  //       });
  //       const parseRes = await res.json();
  //       setVerified(parseRes.auth);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  //   useEffect(() => {
  //     verify();
  //   }, []);

  //   if (verified) {
  return (
    <React.Fragment>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
  //   } else {
  //     return <Navigate to="/dashboard" />;
  //   }
};

export default Calendar;
