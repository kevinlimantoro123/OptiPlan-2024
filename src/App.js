import Register from "./Components/Register";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Success from "./Components/Success";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/register" element={<Layout />}>
        <Route path="success" element={<Success />} />
      </Route>
    </Routes>
  );
}

export default App;
