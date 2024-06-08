import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";

export default function Day({day, rowIdx}) {
    
    const [ dayEvents, setDayEvents ] = useState([]);
    const { setDaySelected, setShowEventModel, savedEvents, setSelectedEvent } = useContext(GlobalContext);

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
            .filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === day.format("DD-MM-YYYY"))
            .sort(compare);
        setDayEvents(events);
    }, [savedEvents, day]);

    function getCurrentDayClass() {
        return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
            ? "bg-neutral-200 text-neutral-800 rounded-full w-7"
            : "";
    }

    return (
        <div className="bg-neutral-900 transition-colors duration-150 ease-in-out rounded-xl m-1 hover:bg-neutral-800/50 flex flex-col">
            <header 
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModel(true);
                }}
            >
                {rowIdx === 0 && <p className="text-sm mt-1 text-neutral-200">{day.format('ddd').toUpperCase()}</p>}
                <p className={`text-sm p-1 my-1 text-center text-neutral-200 ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div 
                className="flex-1 cursor-pointer" 
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModel(true);
                }}
            >
                {dayEvents.map((event, id) => (
                    <div 
                        key={id}
                        onClick={() => setSelectedEvent(event)}
                        className={`bg-${event.label}-200 p-1 mr-1 ml-1 text-neutral-800 text-sm rounded mb-1 truncate`}
                    >
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    )
}