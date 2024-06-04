import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function ScrollDay() {

    const { monthIndex, setMonthIndex, daySelected, setDaySelected } = useContext(GlobalContext);

    return (
        <div>
            <div>
                {daySelected.format("DD-MM-YYYY")} {daySelected.format('ddd').toUpperCase()}
            </div>
        </div>
    )
}