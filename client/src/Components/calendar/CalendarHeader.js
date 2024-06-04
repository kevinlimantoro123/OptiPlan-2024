import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

export default function CalendarHeader() {
    const{ monthIndex, setMonthIndex, setSelectedCalView } = useContext(GlobalContext);
    const navigate = useNavigate();

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }

    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }

    function handleReset() {
        setMonthIndex(dayjs().month() + Math.random());
    }

    return (
        <header className='px-4 py-2 flex items-center'>
            <h1 className='mr-10 text-xl text-gray-500 font-bold'>Calendar</h1>
            <button onClick={handleReset} className='border rounded py-2 px-4 mr-5'>
                Today
            </button>
            <button onClick={handlePrevMonth}>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_left
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_right
                </span>
            </button>
            <h2 className='ml-4 text-xl text-gray-500 font-bold'>
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
            <button className="btn btn-primary ml-10 border-2 p-3 border-black" onClick={() => setSelectedCalView("month")}>
                Month
            </button>
            <button className="btn btn-primary ml-10 border-2 p-3 border-black" onClick={() => setSelectedCalView("week")}>
                Week
            </button>
            <button className="btn btn-primary ml-10 border-2 p-3 border-black" onClick={() => setSelectedCalView("day")}>
                Day
            </button>
        </header>
    )
}