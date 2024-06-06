import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getHours } from "../../util";
import HourSlot from "./HourSlot";
import GlobalContext from "../../context/GlobalContext";

export default function Weekly() {

    const { week, setWeek } = useContext(GlobalContext);
    const hours = getHours();

    useEffect(() => {
        console.log(week);
    }, [week]);

    return (
        <div className="flex-1">
            <div className="flex-1 grid grid-cols-7 border border-gray-200 pr-24 text-end">
                {week.map((day, i) => (
                    <div>
                        <div key={i} className="h-10">
                            {day.format("DD (ddd)")}
                        </div>
                        <div>
                            events
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div className="">

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