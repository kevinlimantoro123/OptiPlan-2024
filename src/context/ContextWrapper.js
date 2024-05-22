import React, { useEffect, useState, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, {type, payload}) {
    switch(type) {
        case 'push':
            return [...state, payload];
        case 'update':
            return state.map(event => event.id === payload.id ? payload : event);
        case 'delete':
            return state.filter(event => event.id !== payload.id);
        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModel, setShowEventModel] = useState(false);
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth);
        }
    }, [smallCalendarMonth]);

    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents])

    return (
        <GlobalContext.Provider value = {{ 
            monthIndex, 
            setMonthIndex, 
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModel, 
            setShowEventModel,
            dispatchCalEvent }}>
            {props.children}
        </GlobalContext.Provider>
    )
}