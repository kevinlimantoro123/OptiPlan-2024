import dayjs from "dayjs";
import React, { useEffect, useState, useContext } from "react";
import { getMonth } from "../../util";
import GlobalContext from "../../context/GlobalContext";

export default function SmallCalendar() {
    const [ currentMonthIdx, setCurrentMonthIdx ] = useState(dayjs().month());
    const [ currentMonth, setCurrentMonth]  = useState(getMonth());
    const [ dayHasEvents, setDayHasEvents ] = useState(new Array(5).fill([]).map(() => new Array(7)));
    const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected, savedEvents } = useContext(GlobalContext);

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }

    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }

    function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "bg-indigo-200 rounded-full text-neutral-800 font-bold";
        } else if (slcDay === currDay) {
            return "bg-neutral-200 rounded-full text-neutral-800";
        } else {
            return "text-neutral-200 rounded-full hover:bg-neutral-500";
        }
    }

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    useEffect(() => {
        let arr = new Array(5).fill([]).map(() => new Array(7));
        for (let row = 0; row < 5; row++) {
            for (let i = 0; i < 7; i++) {
                if (savedEvents
                    .filter(event => dayjs(Number(event.day)).format("DD-MM-YYYY") === currentMonth[row][i].format("DD-MM-YYYY"))
                    .length > 0) {
                        arr[row][i] = true;
                    }
            }
        }
        setDayHasEvents(arr);
    }, [currentMonth, savedEvents]);

    return (
        <div className="mt-9 transition-colors duration-150 ease-in-out rounded-xl p-3">
            <header className="flex justify-between">
                <p className="text-neutral-200 pl-3 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
                </p>
                <div>
                    <button onClick={handlePrevMonth}>
                        <span className="material-icons-outlined cursor-pointer text-neutral-200 mx-1 hover:text-white">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth}>
                        <span className="material-icons-outlined cursor-pointer text-neutral-200 hover:text-white mx-1">
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-7 grid-rows-6">
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-sm py-1 mt-2 mb-0.5 text-center text-neutral-400 font-bold">
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button 
                                key={idx}
                                onClick={() => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    setDaySelected(day);
                                }} 
                                className={`py-1 my-1 w-full ${getDayClass(day)} relative`}>
                                <span className="text-sm">
                                    {day.format('D')}
                                </span>
                                { dayHasEvents[i][idx] &&
                                    <div className="absolute text-blue-500 font-black text-xl top-[8px] left-[13px]">
                                        .
                                    </div>
                                }
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}