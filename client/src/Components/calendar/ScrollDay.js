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

    function startCalculator(starttime) {
        const start = Number(starttime.substring(0,2));
        const minute = starttime[3] === "3" ? 1 : 0;
        const sum = start * 2 + minute;
        return sum * 98;
    }

    function heightCalculator(starttime, endtime) {
        const start = Number(starttime.substring(0,2));
        const end = Number(endtime.substring(0,2));
        const diff = Number(endtime[3]) - Number(starttime[3]);
        const minute = diff === 2 ? 1 : diff === -2 ? -1 : 0;
        const sum = (end - start) * 2 + minute;
        return sum * 6;
    }

    useEffect(() => {
        const events = savedEvents
            .filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === daySelected.format("DD-MM-YYYY"))
            .sort(compare);
        setDayEvents(events);
    }, [savedEvents, daySelected]);
    const hours = getHours();

    return (
        <div>
            <div>
                {daySelected.format("DD-MM-YYYY")} {daySelected.format('ddd').toUpperCase()}
            </div>
            <div className="flex flex-col">
                <div className="relative pl-4 -z-10">
                    {dayEvents.map((event, id) => (
                        <div 
                            key={id}
                            onClick={() => setSelectedEvent(event)}
                            className={`bg-${event.label}-500 p-1 mr-12 ml-1 text-white absolute w-11/12 top-[${startCalculator(event.starttime) + 8}px] h-[${5 + heightCalculator(event.starttime, event.endtime)}rem] text-sm rounded mb-1 truncate`}
                        >
                            {event.title}
                        </div>
                        //from top: 8px, height of each block = 5 rem + 6rem for each block, to move one block = 98px
                    ))}
                </div>
            </div>
            <div className="flex-1 grid grid-rows-48">
                {hours.map((hour) => (
                    <React.Fragment key={hour}>
                        <HourSlot hour={hour} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}