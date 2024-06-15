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

export default function YearChart() {

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
    ]

    const [ monthEvents, setMonthEvents ] = useState(initialData);
    const { savedEvents } = useContext(GlobalContext);
    const [ showWork, setShowWork ] = useState(true);
    const [ showStudy, setShowStudy ] = useState(true);
    const [ showMeet, setShowMeet ] = useState(true);
    const [ showImpt, setShowImpt ] = useState(true);
    const [ showLeis, setShowLeis ] = useState(true);
    const [ showTotal, setShowTotal ] = useState(true);

    function indexCalc(type) {
        const counter = [ showTotal, showWork, showStudy, showMeet, showImpt, showLeis ];
        let index = 0;
        for (let i = 0; i < type; i++) {
            if (counter[i]) {
                index++;
            }
        }
        return index;
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-4 bg-neutral-800/50 flex flex-col gap-4 rounded-md">
                    <p className="text-medium text-lg">{label}</p>
                    { showTotal && 
                    <p className="text-sm text-blue-400">
                    Total Events:
                    <span className="ml-2">{payload[indexCalc(0)].value}</span>
                    </p>
                    }
                    { showWork && 
                    <p className="text-sm text-indigo-200">
                    Work Events:
                    <span className="ml-2">{payload[indexCalc(1)].value}</span>
                    </p>
                    }
                    { showStudy && 
                    <p className="text-sm text-emerald-200">
                    Study Events:
                    <span className="ml-2">{payload[indexCalc(2)].value}</span>
                    </p>
                    }
                    { showMeet && 
                    <p className="text-sm text-blue-200">
                    Meetings:
                    <span className="ml-2">{payload[indexCalc(3)].value}</span>
                    </p>
                    }
                    { showImpt && 
                    <p className="text-sm text-red-200">
                    Important Events:
                    <span className="ml-2">{payload[indexCalc(4)].value}</span>
                    </p>
                    }
                    { showLeis && 
                    <p className="text-sm text-yellow-200">
                    Leisure Events:
                    <span className="ml-2">{payload[indexCalc(5)].value}</span>
                    </p>
                    }
                </div>
            );
        }
    };

    useEffect(() => {
        let tempData = [...initialData];
        savedEvents.forEach(event => {
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
        <div className="h-full w-10/12 relative">
            <div>
                Hello
            </div>
            <ResponsiveContainer width="100%" height="80%">
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
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    { showTotal && <Line type="monotone" dataKey="count" name="Total" stroke="#3b82f6" dot={false} /> }
                    { showWork && <Line type="monotone" dataKey="indigo" name="Work" stroke="#c7d2fe" dot={false} /> }
                    { showStudy && <Line type="monotone" dataKey="emerald" name="Study" stroke="#a7f3d0" dot={false} /> }
                    { showMeet && <Line type="monotone" dataKey="blue" name="Meeting" stroke="#bfdbfe" dot={false} /> }
                    { showImpt && <Line type="monotone" dataKey="red" name="Important" stroke="#fecaca" dot={false} /> }
                    { showLeis && <Line type="monotone" dataKey="yellow" name="Leisure" stroke="#fef08a" dot={false} /> }
                </LineChart>
            </ResponsiveContainer>
            <button
                onClick={() => setShowWork(!showWork)}
                className={`absolute left-8 mt-[8px] bg-neutral-900 ${showWork ? "text-indigo-200" : "text-neutral-400"} text-xl font-semibold py-[4.8px] px-6 mr-5 hover:text-white`}
            >
                Show Work Events
            </button>
            <button
                onClick={() => setShowStudy(!showStudy)}
                className={`absolute left-8 mt-[42px] bg-neutral-900 ${showStudy ? "text-emerald-200" : "text-neutral-400"} text-xl font-semibold py-[4.8px] px-6 mr-5 hover:text-white`}
            >
                Show Study Events
            </button>
            <button
                onClick={() => setShowMeet(!showMeet)}
                className={`absolute left-8 mt-[76px] bg-neutral-900 ${showMeet ? "text-blue-200" : "text-neutral-400"} text-xl font-semibold py-[4.8px] px-6 mr-5 hover:text-white`}
            >
                Show Meetings
            </button>
            <button
                onClick={() => setShowImpt(!showImpt)}
                className={`absolute left-8 mt-[110px] bg-neutral-900 ${showImpt ? "text-red-200" : "text-neutral-400"} text-xl font-semibold py-[4.8px] px-6 mr-5 hover:text-white`}
            >
                Show Important Events
            </button>
            <button
                onClick={() => setShowLeis(!showLeis)}
                className={`absolute left-8 mt-[144px] bg-neutral-900 ${showLeis ? "text-yellow-200" : "text-neutral-400"} text-xl font-semibold py-[4.8px] px-6 mr-5 hover:text-white`}
            >
                Show Leisure Events
            </button>
            <button
                onClick={() => setShowTotal(!showTotal)}
                className={`absolute right-0 mt-[8px] bg-neutral-900 ${showTotal ? "text-blue-500" : "text-neutral-400"} text-xl font-semibold py-[4.8px] px-6 mr-5 hover:text-white`}
            >
                Show Total Count
            </button>
        </div>
    );
}