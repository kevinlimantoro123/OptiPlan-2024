import React from "react";

export default function Homepage() {
    
    return (
        <div className="grid grid-cols-2 h-[90vh] justify-items-center">
            <div className="grid grid-rows-2 gap-2 p-2 w-full justify-items-center">
                <div className="w-4/5 h-full bg-neutral-800 rounded-3xl">
                    1
                </div>
                <div className="w-4/5 h-full bg-neutral-500 rounded-3xl">
                    2
                </div>
            </div>
            <div className="w-4/5 h-full bg-neutral-800 p-2 rounded-3xl">
                Hello
            </div>
        </div>
    )
}