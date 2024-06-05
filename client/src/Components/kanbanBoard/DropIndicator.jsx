const DropIndicator = ({ beforeId, col }) => {
  return (
    <div
      data-before={beforeId || -1}
      data-col={col}
      className="my-0.5 h-0.5 w-full bg-violet-300 opacity-0"
    />
  );
};

export default DropIndicator;
