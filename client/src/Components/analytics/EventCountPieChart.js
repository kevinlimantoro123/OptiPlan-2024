import React, { useContext, useEffect, useState, PureComponent } from "react";
import GlobalContext from "../../context/GlobalContext";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function EventCountPieChart() {
    
    const initialData = [
        {
            name: "Work",
            label: "indigo",
            count: 0
        },
        {
            name: "Study",
            label: "emerald",
            count: 0
        },
        {
            name: "Meeting",
            label: "blue",
            count: 0
        },
        {
            name: "Important",
            label: "red",
            count: 0
        },
        {
            name: "Leisure",
            label: "yellow",
            count: 0
        }
    ];

    const COLORS = ["#c7d2fe", "#a7f3d0", "#bfdbfe", "#fecaca", "#fef08a"]

    const { savedEvents } = useContext(GlobalContext);
    const [ eventData, setEventData ] = useState(initialData);
    
    useEffect(() => {
        let tempData = [...initialData];
        savedEvents.forEach(event => {
            if (event.label === "indigo") {
                tempData[0].count++;
            } else if (event.label === "emerald") {
                tempData[1].count++;
            } else if (event.label === "blue") {
                tempData[2].count++;
            } else if (event.label === "red") {
                tempData[3].count++;
            } else {
                tempData[4].count++;
            }
        });
        setEventData(tempData);
    }, [savedEvents]);

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Tooltip />
                    <Legend />
                    <Pie
                        dataKey="count"
                        data={eventData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={60}
                        stroke="black"
                    >
                        {eventData.map((event, index) => (
                        <Cell style={{outline: 'none'}} key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}