import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";

const Card = ({ title, id, col, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} col={col} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => {
          handleDragStart(e, { title, id, col });
        }}
        className="curson-grab rounded border 
        border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

export default Card;
