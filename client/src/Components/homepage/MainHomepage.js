import React from "react";

export default function MainHomepage() {

    return (
        <div className="flex grid-rows-2">
            <div className="flex grid-rows-2">
                <div className="w-48 h-48 bg-neutral-800">
                    1
                </div>
                <div className="w-48 h-48 bg-neutral-500">
                    2
                </div>
            </div>
            <div className="w-48 h-48 bg-neutral-800">
                Hello
            </div>
        </div>
    )
}