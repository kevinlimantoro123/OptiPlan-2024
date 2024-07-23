import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";

export default function MiniEvents() {

    const [ upcomingEvents, setUpcomingEvents ] = useState([]);
    const { savedEvents } = useContext(GlobalContext);
    console.log(savedEvents);

    function compare(a, b) {
        const dayA = dayjs(Number(a.day));
        const dayB = dayjs(Number(b.day));
        if (dayA.format("YYYY") < dayB.format("YYYY")) {
            return -1;
        } else if (dayA.format("YYYY") === dayB.format("YYYY")) {
            if (dayA.format("MM") < dayB.format("MM")) {
                return -1;
            } else if (dayA.format("MM") === dayB.format("MM")) {
                if (dayA.format("DD") < dayB.format("DD")) {
                    return -1;
                } else if (dayA.format("DD") === dayB.format("DD")) {
                    if (a.starttime < b.starttime) {
                        return -1;
                    } else if (a.starttime > b.starttime) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    return 1;
                }
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    }

    useEffect(() => {
        const events = savedEvents
            .sort(compare)
            .filter((e, index) => index < 6);
        setUpcomingEvents(events);
    }, [savedEvents]);

    return (
        <div className="h-full grid grid-rows-1/9">
            <div className="text-neutral-200 w-full text-center font-semibold text-2xl p-5">
                Upcoming Events
            </div>
            <div className="h-full w-full grid grid-rows-6 items-center justify-items-center px-4 pb-6">
                {upcomingEvents.map(event =>
                    <div className={`bg-${event.label}-200 h-3/4 w-11/12 rounded-2xl items-center grid grid-cols-3`}>
                        <span className="material-icons-outlined pl-6">
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
                        <div className="text-center">
                            {event.title}
                        </div>
                        <div className="text-end pr-6">
                            {dayjs(Number(event.day)).format("DD/MM")}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}