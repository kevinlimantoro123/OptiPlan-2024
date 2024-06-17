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
import dayjs from "dayjs";
import ChartTimeSelector from "./ChartTimeSelector";

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
    const [ timeSelected, setTimeSelected ] = useState("All Time");
    const [ selectedYear, setSelectedYear ] = useState(dayjs().year());
    const [ selectedMonth, setSelectedMonth ] = useState(dayjs().month());

    function timeCalc(event) {
        const startHr = Number(event.starttime.substring(0, 2));
        const endHr = Number(event.endtime.substring(0, 2));
        const minuteDiff = Number(event.endtime[3]) - Number(event.starttime[3]);
        const minute = minuteDiff === 3 ? 0.5 : minuteDiff === -3 ? -0.5 : 0;
        const time = endHr - startHr + minute;
        return time;
    }

    function handlePrevYear() {
        setSelectedMonth(dayjs().month());
        setSelectedYear(dayjs().year(selectedYear - 1).year());
    }

    function handleNextYear() {
        setSelectedMonth(dayjs().month());
        setSelectedYear(dayjs().year(selectedYear + 1).year());
    }

    function handlePrevMonth() {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(dayjs().year(selectedYear - 1).year());
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    }

    function handleNextMonth() {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(dayjs().year(selectedYear + 1).year());
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
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
        let filteredEvents = [...savedEvents];
        if (timeSelected === "Yearly") {
            filteredEvents = filteredEvents.filter(event => dayjs(Number(event.day)).year() === selectedYear);
        } else if (timeSelected === "Monthly") {
            filteredEvents = filteredEvents.filter(event => 
                dayjs(Number(event.day)).year() === selectedYear &&
                dayjs(Number(event.day)).month() === selectedMonth
            );
        }
        filteredEvents.forEach(event => {
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
    }, [savedEvents, selectedYear, selectedMonth, timeSelected]);

    return (
        <div className="h-full w-10/12 relative">
            <div className="flex flex-row items-center p-2 pb-4 ml-8 mt-2">
                { timeSelected !== "All Time" && <div className="absolute flex flex-row items-center">
                    <button 
                        onClick={ timeSelected === "Yearly"
                            ? handlePrevYear
                            : handlePrevMonth
                        }
                        className='pt-1'
                    >
                        <span className='material-icons-outlined cursor-pointer text-neutral-200 hover:text-white mx-1'>
                            chevron_left
                        </span>
                    </button>
                    <button 
                        onClick={ timeSelected === "Yearly"
                            ? handleNextYear
                            : handleNextMonth
                        }
                        className='pt-1'
                    >
                        <span className='material-icons-outlined cursor-pointer text-neutral-200 hover:text-white mx-1'>
                            chevron_right
                        </span>
                    </button>
                    <div className="ml-2 text-xl font-bold pb-0.5">
                        {timeSelected === "Yearly" ? selectedYear : dayjs(new Date(selectedYear, selectedMonth)).format("MMMM YYYY")}
                    </div>
                </div> }
                <div className="absolute right-0">
                    <ChartTimeSelector timeSelected={timeSelected} setTimeSelected={setTimeSelected} />
                </div>
            </div>
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