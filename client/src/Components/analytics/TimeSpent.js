import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";

export default function TimeSpent() {

    const initialData = [
        {
            name: "Work",
            label: "indigo",
            time: 0
        },
        {
            name: "Study",
            label: "emerald",
            time: 0
        },
        {
            name: "Meeting",
            label: "blue",
            time: 0
        },
        {
            name: "Important",
            label: "red",
            time: 0
        },
        {
            name: "Leisure",
            label: "yellow",
            time: 0
        }
    ];
    const { savedEvents } = useContext(GlobalContext);
    const [ timeSpentData, setTimeSpentData ] = useState(initialData);

    function timeCalc(event) {
        const startHr = Number(event.starttime.substring(0, 2));
        const endHr = Number(event.endtime.substring(0, 2));
        const minuteDiff = Number(event.endtime[3]) - Number(event.starttime[3]);
        const minute = minuteDiff === 3 ? 0.5 : minuteDiff === -3 ? -0.5 : 0;
        const time = endHr - startHr + minute;
        return time;
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-4 bg-neutral-800/50 flex flex-col gap-4 rounded-md">
                    <p className="text-medium text-lg">{label}</p>
                    <p className="text-sm">
                    Hours Spent: 
                    <span className="ml-2">{payload[0].value}</span>
                    </p>
                </div>
            );
        }
    };

    useEffect(() => {
        let tempData = [...initialData];
        savedEvents.forEach(event => {
            const eventTime = timeCalc(event);
            if (event.label === "indigo") {
                tempData[0].time += eventTime;
            } else if (event.label === "emerald") {
                tempData[1].time += eventTime;
            } else if (event.label === "blue") {
                tempData[2].time += eventTime;
            } else if (event.label === "red") {
                tempData[3].time += eventTime;
            } else {
                tempData[4].time += eventTime;
            }
        });
        setTimeSpentData(tempData);
    }, [savedEvents]);

    return (
        <div className="h-full w-10/12 relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={timeSpentData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Radar name="Hours Spent" dataKey="time" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}