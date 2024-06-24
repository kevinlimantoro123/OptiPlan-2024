import Register from "./Components/Register";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Calendar from "./Components/calendar/Calendar";
import Kanban from "./Components/kanbanBoard/Kanban";
import { Routes, Route } from "react-router-dom";
import Analytics from "./Components/analytics/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home/*" element={<Home />}>
          <Route path="calendar" element={<Calendar />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="home" />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
