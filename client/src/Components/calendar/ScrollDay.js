import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import HourSlot from "./HourSlot";
import GlobalContext from "../../context/GlobalContext";
import { getHours } from "../../util";

export default function ScrollDay() {
    
    const [ dayEvents, setDayEvents ] = useState([]);
    const { setDaySelected, daySelected, setShowEventModel, savedEvents, setSelectedEvent } = useContext(GlobalContext);

    function compare(a, b) {
        if (a.starttime < b.starttime) {
          return -1;
        }
        if (a.starttime > b.starttime) {
          return 1;
        }
        return 0;
    }

    useEffect(() => {
        const events = savedEvents
            .filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === daySelected.format("DD-MM-YYYY"))
            .sort(compare);
        setDayEvents(events);
    }, [savedEvents]);
    const hours = getHours();

    return (
        <div>
            <div>
                {daySelected.format("DD-MM-YYYY")} {daySelected.format('ddd').toUpperCase()}
            </div>
            <div className="border border-gray-200 flex flex-col">
                <div >
                    {dayEvents.map((event, id) => (
                        <div 
                            key={id}
                            onClick={() => setSelectedEvent(event)}
                            className={`bg-${event.label}-500 p-1 mr-1 ml-1 text-white text-sm rounded mb-1 truncate`}
                        >
                            {event.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 grid grid-rows-48">
                {hours.map((hour, i) => (
                    <React.Fragment key={i}>
                        <HourSlot hour={hour} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}