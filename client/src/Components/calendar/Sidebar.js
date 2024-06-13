import React from 'react';
import SmallCalendar from './SmallCalendar';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <aside className='p-1 w-64 bg-neutral-900'>
            <SmallCalendar />
        </aside>
    )
}