import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <aside className='p-5 w-64 bg-neutral-900'>
            <CreateEventButton />
            <SmallCalendar />
            <div>
                <button
                    className="cursor-pointer text-gray-600 mx-2 fixed bottom-0 left-0 pl-3 pb-3"
                    onClick={() => navigate("/dashboard")}
                >
                    <span className="material-icons-outlined text-neutral-200 text-3xl">
                        home
                    </span>
                </button>
            </div>
        </aside>
    )
}