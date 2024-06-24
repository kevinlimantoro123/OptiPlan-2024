import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import EventCountPieChart from "./EventCountPieChart";
import AnalyticsSelector from "./AnalyticsSelector";
import YearChart from "./YearChart";
import TimeSpent from "./TimeSpent";

export default function Analytics() {

    const { analyticsView } = useContext(GlobalContext);

    return (
        <div className="bg-neutral-900 text-neutral-200 h-full min-h-[500px] w-full justify-center flex">
            <div className="absolute right-5 z-20">
                <AnalyticsSelector />
            </div>
            <div className="h-[400px] w-full flex justify-center items-center mt-20">
                { analyticsView === "Total Event Count"
                    ? <EventCountPieChart />
                    : analyticsView === "Time Spent on Events"
                    ? <TimeSpent />
                    : <YearChart />
                }
            </div>
        </div>
    )
}