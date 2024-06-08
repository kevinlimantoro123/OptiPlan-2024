import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getHours } from "../../util";
import HourSlot from "./HourSlot";
import GlobalContext from "../../context/GlobalContext";

export default function Weekly() {

    const [ weekEvents, setWeekEvents ] = useState([[], [], [], [], [], [], []]);
    const { week, setDaySelected, setShowEventModel, savedEvents, setSelectedEvent } = useContext(GlobalContext);
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
        let arr = [[], [], [], [], [], [], []];
        for (let i = 0; i < 7; i++) {
            const events = savedEvents
                .filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === week[i].format("DD-MM-YYYY"))
                .sort(compare);
            arr[i] = events;
        }
        setWeekEvents(arr);
    }, [savedEvents, week]);

    return (
        <div className="flex-1">
            <div className="grid grid-cols-7 pr-24">
                {week.map((day, i) => (
                    <div>
                        <div className="bg-neutral-900 grid grid-cols-2 relative h-[42px]">
                            <div key={i} className="pl-12 mt-2 absolute text-neutral-200">
                                {day.format("DD (ddd)")}
                            </div>
                            <div class="bg-gray-200 z-10 w-0.5 h-[2100px] ml-36 absolute"></div>
                        </div>
                        <div className="relative z-10">
                            {weekEvents[i].map((event, id) => (
                                <div 
                                    key={id}
                                    onClick={() => {
                                        setDaySelected(day);
                                        setSelectedEvent(event);
                                        setShowEventModel(true);
                                    }}
                                    className={`bg-${event.label}-200 p-1 mr-12 ml-1 text-neutral-800 absolute w-32 top-[${startCalculator(event.starttime)}px] h-[${heightCalculator(event.starttime, event.endtime)}px] text-sm rounded mb-1 truncate cursor-pointer`}
                                >
                                    {event.title}
                                </div>
                            ))}
                        </div>
                        <div
                            className="absolute w-36 h-[2058px] cursor-pointer z-10"
                            onClick={() => {
                                setDaySelected(day);
                                setShowEventModel(true);
                            }}
                        ></div>
                    </div>
                ))}
            </div>
            <div>
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