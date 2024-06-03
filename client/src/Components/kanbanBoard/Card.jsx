import DropIndicator from "./DropIndicator";

const Card = ({ title, id, label }) => {
  return (
    <>
      <DropIndicator beforeId={id} label={label} />
      <div
        draggable="true"
        className="curson-grab rounded border 
        border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};

export default Card;
