import Register from "./Components/Register";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Success from "./Components/Success";
import { Routes, Route } from "react-router-dom";
import Calendar from "./Components/Calendar";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Calendar />
    </React.Fragment>
  );
}

export default App;
