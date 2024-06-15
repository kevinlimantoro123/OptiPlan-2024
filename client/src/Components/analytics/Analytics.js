import React, { useContext, useEffect, useState, PureComponent } from "react";
import GlobalContext from "../../context/GlobalContext";
import EventCountPieChart from "./EventCountPieChart";
import AnalyticsSelector from "./AnalyticsSelector";
import YearChart from "./YearChart";

export default function Analytics() {

    const { analyticsView } = useContext(GlobalContext);

    return (
        <div className="bg-neutral-900 text-neutral-200 h-full min-h-[500px] w-full justify-center flex">
            <div className="absolute right-5 z-20">
                <AnalyticsSelector />
            </div>
            <div className="h-[400px] w-full flex justify-center items-center mt-20">
                { analyticsView === "Event Count"
                    ? <EventCountPieChart />
                    : <YearChart />
                }
            </div>
        </div>
    )
}