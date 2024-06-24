import { AiOutlineCalendar, AiOutlineStock } from "react-icons/ai";
import { BsKanban } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

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
