import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getHours } from "../../util";
import HourSlot from "./HourSlot";

export default function ScrollDay() {
    
    const { monthIndex, setMonthIndex, daySelected, setDaySelected } = useContext(GlobalContext);
    const hours = getHours();

    return (
        <div>
            <div>
                {daySelected.format("DD-MM-YYYY")} {daySelected.format('ddd').toUpperCase()}
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