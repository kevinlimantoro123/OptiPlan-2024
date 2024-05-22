import React from "react";
import SmallCalendar from "../Components/SmallCalendar";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModel: false,
    setShowEventModel: () => {},
    dispatchCalEvent: ({type, payload}) => {}
})

export default GlobalContext;