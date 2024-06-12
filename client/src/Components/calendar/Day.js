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

    function getCurrentDayClass() {
        return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
            ? "bg-indigo-200 text-neutral-800 rounded-full font-bold w-7"
            : "";
    }

    useEffect(() => {
        const events = savedEvents
            .filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === day.format("DD-MM-YYYY"))
            .sort(compare);
        setDayEvents(events);
    }, [savedEvents, day]);

    return (
        <div className="bg-neutral-900 transition-colors duration-150 ease-in-out rounded-xl m-1 hover:bg-neutral-800/50 z-0 hover:z-10 flex flex-col">
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
                        className={`bg-${event.label}-200 p-1 mr-1 ml-1 text-neutral-800 text-sm rounded mb-1 truncate grid relative`}
                    >
                        <div>
                            {event.title}
                        </div>
                        <span className="material-icons-outlined absolute right-1 text-base pt-0.5 pr-0.5">
                            {event.label === "indigo"
                                ? "work_outline"
                                : event.label === "emerald"
                                ? "auto_stories"
                                : event.label === "blue"
                                ? "groups"
                                : event.label === "red"
                                ? "error_outline"
                                : "sentiment_satisfied"
                            }
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}