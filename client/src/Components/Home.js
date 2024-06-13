import { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate, Outlet, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Navbar from "./dashboard/Navbar";
import Sidebar from "./dashboard/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import Calendar from "./calendar/Calendar";
import Kanban from "./kanbanBoard/Kanban";
import GlobalContext from "../context/GlobalContext";

const Home = () => {
  const { verified, setVerified, activeMenu, setActiveMenu } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function verify() {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      setVerified(parseRes.auth);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      console.log("Logged out succcessfully");
      setVerified(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  if (verified) {
    return (
      <div>
        {activeMenu && (
          <div
            className="fixed w-full h-full bg-neutral-950/50 z-50"
            onClick={() => setActiveMenu(false)}
          ></div>
        )}
        <div className="flex relative bg-neutral-900">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <button
              type="button"
              className="text-3xl p-3 hover:drop-shadow-xl hover:bg-gray-300 text-white"
              style={{ background: "gray", borderRadius: "50%" }}
            >
              <FiSettings />
            </button>
          </div>
          {activeMenu ? (
            <div className="w-72 z-50 fixed">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 z-50">
              <Sidebar />
            </div>
          )}
          <div
            className={`bg-main-bg min-h-screen w-full ${
              activeMenu ? "" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              <Routes>
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/kanban" element={<Kanban />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Fragment>
        <h1>INVALID CREDENTIALS/SESSION HAS EXPIRED</h1>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Sign in
        </button>
      </Fragment>
    );
  }
};

export default Home;
