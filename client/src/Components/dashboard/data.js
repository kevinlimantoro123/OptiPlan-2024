import {
  AiOutlineCalendar,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import { FiPieChart } from "react-icons/fi";
import { BsKanban, BsBarChart } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { RiStockLine } from "react-icons/ri";
import { GiLouvrePyramid } from "react-icons/gi";

export const links = [
  {
    title: "Pages",
    links: [
      {
        name: "home",
        icon: <FaHome />,
      },
      {
        name: "calendar",
        icon: <AiOutlineCalendar />,
      },
      {
        name: "kanban",
        icon: <BsKanban />,
      },
      {
        name: "analytics",
        icon: <AiOutlineStock />,
      },
    ],
  }
];
