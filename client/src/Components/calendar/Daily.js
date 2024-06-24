import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import HourSlot from "./HourSlot";
import GlobalContext from "../../context/GlobalContext";
import { getHours } from "../../util";

export default function Daily() {

    const [ dayEvents, setDayEvents ] = useState([]);
    const { daySelected, setShowEventModel, savedEvents, setSelectedEvent } = useContext(GlobalContext);
    const hours = getHours();

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
        return sum * 42;
    }

    function heightCalculator(starttime, endtime) {
        const start = Number(starttime.substring(0,2));
        const end = Number(endtime.substring(0,2));
        const diff = Number(endtime[3]) - Number(starttime[3]);
        const minute = diff === 3 ? 1 : diff === -3 ? -1 : 0;
        const sum = (end - start) * 2 + minute;
        return sum * 42;
    }

    useEffect(() => {
        const events = savedEvents
            .filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === daySelected.format("DD-MM-YYYY"))
            .sort(compare);
        setDayEvents(events);
    }, [savedEvents, daySelected]);

    return (
        <div className="flex-1">
            <div>
                <div className="flex flex-col">
                    <div className="relative pl-4 z-10">
                        {dayEvents.map((event, id) => (
                            <div 
                                key={id}
                                onClick={() => {
                                    setSelectedEvent(event);
                                    setShowEventModel(true);
                                }}
                                className={`bg-${event.label}-200 p-1 mr-12 ml-1 text-neutral-800 absolute w-11/12 top-[${startCalculator(event.starttime)}px] h-[${heightCalculator(event.starttime, event.endtime)}px] text-sm rounded mb-1 truncate cursor-pointer`}
                            >
                                {event.title}
                            </div>
                            //from top: 8px, to move one block = 42px, hm
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
        </div>
    );
}