import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export default function MiniChart() {

    const initialData = [
        {
            name: "Jan",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Feb",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Mar",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Apr",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "May",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Jun",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Jul",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Aug",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Sep",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Oct",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Nov",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
        {
            name: "Dec",
            count: 0,
            indigo: 0,
            emerald: 0,
            blue: 0,
            red: 0,
            yellow: 0
        },
    ];

    const { savedEvents } = useContext(GlobalContext);
    const [ monthEvents, setMonthEvents ] = useState(initialData);

    useEffect(() => {
        let tempData = [...initialData];
        savedEvents
            .filter(event => dayjs(Number(event.day)).year() === dayjs().year())
            .forEach(event => {
                const month = dayjs(Number(event.day)).month();
                tempData[month].count++;
                if (event.label === "indigo") {
                    tempData[month].indigo++;
                } else if (event.label === "emerald") {
                    tempData[month].emerald++;
                } else if (event.label === "blue") {
                    tempData[month].blue++;
                } else if (event.label === "red") {
                    tempData[month].red++;
                } else {
                    tempData[month].yellow++;
                }
            });
        setMonthEvents(tempData);
    }, [savedEvents]);

    return (
        <div className="h-full w-full flex items-center justify-center p-2">
            <ResponsiveContainer width="95%" height="80%">
                <LineChart
                    width={500}
                    height={300}
                    data={monthEvents}
                    margin={{
                    right: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Legend />
                    <Line type="monotone" dataKey="count" name="Total" stroke="#3b82f6" dot={false} />
                    <Line type="monotone" dataKey="indigo" name="Work" stroke="#c7d2fe" dot={false} />
                    <Line type="monotone" dataKey="emerald" name="Study" stroke="#a7f3d0" dot={false} />
                    <Line type="monotone" dataKey="blue" name="Meeting" stroke="#bfdbfe" dot={false} />
                    <Line type="monotone" dataKey="red" name="Important" stroke="#fecaca" dot={false} />
                    <Line type="monotone" dataKey="yellow" name="Leisure" stroke="#fef08a" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}