import React from "react";
import MiniChart from "./MiniChart";
import MiniKanban from "./MiniKanban";
import MiniEvents from "./MiniEvents";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigate = useNavigate();
    
    return (
        <div className="grid grid-cols-3/5 h-[88vh] gap-16 mt-6 mr-16 items-center justify-center">
            <div className="grid grid-rows-2/5 gap-16 h-[90%] ml-16 justify-items-center">
                <div className="w-full h-full bg-neutral-800 rounded-3xl relative">
                    <MiniKanban />
                    <button 
                        className="absolute h-full w-full top-0 rounded-3xl opacity-0 bg-neutral-900 transition-opacity duration-150 ease-in-out hover:opacity-85 text-neutral-200 text-3xl"
                        onClick={() => navigate("/home/kanban")}
                    >
                        Kanban Board
                    </button>
                </div>
                <div className="w-full h-full bg-neutral-800 rounded-3xl relative">
                    <MiniChart />
                    <button 
                        className="absolute h-full w-full top-0 rounded-3xl opacity-0 bg-neutral-900 transition-opacity duration-150 ease-in-out hover:opacity-85 text-neutral-200 text-3xl"
                        onClick={() => navigate("/home/analytics")}
                    >
                        Analytics
                    </button>
                </div>
            </div>
            <div className="w-full mr-10 h-[90%] bg-neutral-800 rounded-3xl relative">
                <MiniEvents />
                <button 
                    className="absolute h-full w-full top-0 rounded-3xl opacity-0 bg-neutral-900 transition-opacity duration-150 ease-in-out hover:opacity-85 text-neutral-200 text-3xl"
                    onClick={() => navigate("/home/calendar")}
                >
                    Calendar
                </button>
            </div>
        </div>
    )
}