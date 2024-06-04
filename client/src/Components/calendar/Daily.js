import ScrollDay from "./ScrollDay";
import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Daily() {

    const { monthIndex, setMonthIndex, daySelected, setDaySelected } = useContext(GlobalContext);
    
    function handleNextDay() {
        if (dayjs().date(daySelected.date() + 1).date() === 1) {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex + 1, 1)));
            setMonthIndex(monthIndex + 1);
        } else {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() + 1)));
        }
    }

    function handlePrevDay() {
        if (daySelected.date() === 1) {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex - 1, dayjs().date(daySelected.date() - 1).date())));
            setMonthIndex(monthIndex - 1);
        } else {
            setDaySelected(dayjs(new Date(dayjs().year(), monthIndex, daySelected.date() - 1)));
        }
    }

    return (
        <div>
            <div>
                <button onClick={handlePrevDay}>
                    <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                        chevron_left
                    </span>
                </button>
                <button onClick={handleNextDay}>
                    <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                        chevron_right
                    </span>
                </button>
            </div>
            <ScrollDay />
        </div>
    );
}