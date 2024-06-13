import React, { useState } from "react";

import Board from "./Board";

const Kanban = () => {
  return (
    <div className="h-full min-h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

export default Kanban;
