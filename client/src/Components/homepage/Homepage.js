import React from "react";
import MiniChart from "./MiniChart";
import MiniKanban from "./MiniKanban";
import MiniEvents from "./MiniEvents";

export default function Homepage() {
    
    return (
        <div className="grid grid-cols-3/5 h-[88vh] gap-16 mt-6 mr-16 items-center justify-center">
            <div className="grid grid-rows-2/5 gap-16 h-[90%] ml-16 justify-items-center">
                <div className="w-full h-full bg-neutral-800 rounded-3xl">
                    <MiniKanban />
                </div>
                <div className="w-full h-full bg-neutral-800 rounded-3xl">
                    <MiniChart />
                </div>
            </div>
            <div className="w-full mr-10 h-[90%] bg-neutral-800 rounded-3xl">
                <MiniEvents />
            </div>
        </div>
    )
}