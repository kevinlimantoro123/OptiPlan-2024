import ScrollDay from "./ScrollDay";
import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Daily() {

    return (
        <div className="flex-1">
            <div>
                <ScrollDay />
            </div>
        </div>
    );
}