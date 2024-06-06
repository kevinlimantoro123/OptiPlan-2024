import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import dayjs from 'dayjs';
import ViewSelector from "./ViewSelector";

export default function CalendarHeader() {

    const{ monthIndex, setMonthIndex, setDaySelected, selectedCalView, daySelected, week } = useContext(GlobalContext);

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }

    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }

    function handlePrevWeek() {
        if (daySelected.date() - 7 < 1) {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() - 7)));
            setMonthIndex(monthIndex - 1);
        } else {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() - 7)));
        }
    }

    function handleNextWeek() {
        if (daySelected.date() + 7 > daySelected.endOf('month').date()) {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() + 7)));
            setMonthIndex(monthIndex + 1);
        } else {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() + 7)));
        }
    }

    function handlePrevDay() {
        if (daySelected.date() === 1) {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex - 1, dayjs().date(daySelected.date() - 1).date())));
            setMonthIndex(monthIndex - 1);
        } else {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() - 1)));
        }
    }

    function handleNextDay() {
        if (dayjs().date(daySelected.date() + 1).date() === 1) {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex + 1, 1)));
            setMonthIndex(monthIndex + 1);
        } else {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() + 1)));
        }
    }

    function handleReset() {
        setMonthIndex(dayjs().month() + Math.random());
        setDaySelected(dayjs());
    }

    return (
        <header className='px-4 py-2 flex items-center'>
            <h1 className='mr-10 text-xl text-gray-500 font-bold'>Calendar</h1>
            <button onClick={handleReset} className='border rounded py-2 px-4 mr-5'>
                Today
            </button>
            <button 
                onClick={selectedCalView === "day" 
                    ? handlePrevDay
                    : selectedCalView === "week"
                    ? handlePrevWeek
                    : handlePrevMonth
                }
                className='pt-1'
            >
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_left
                </span>
            </button>
            <button 
                onClick={selectedCalView === "day" 
                ? handleNextDay
                : selectedCalView === "week"
                ? handleNextWeek
                : handleNextMonth
                }
                className='pt-1'
            >
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_right
                </span>
            </button>
            <h2 className='ml-4 text-xl pb-1 text-gray-500 font-bold'>
                {selectedCalView === "day" 
                    ? daySelected.format("DD MMMM YYYY (dddd)")
                    : selectedCalView === "week"
                    ? week[0].format("DD MMMM YYYY ") + "-" + week[6].format(" DD MMMM YYYY")
                    : dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")
                }
            </h2>
            <div className="absolute right-10 z-20">
                <ViewSelector />
            </div>
        </header>
    )
}