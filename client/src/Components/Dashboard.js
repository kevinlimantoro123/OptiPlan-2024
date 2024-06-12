import { Fragment, useState, useEffect } from "react";
<<<<<<< HEAD:client/src/Components/Home.js
import { useNavigate, Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Navbar from "./dashboard/Navbar";
import Footer from "./dashboard/Footer";
import Sidebar from "./dashboard/Sidebar";
import ThemeSettings from "./dashboard/ThemeSettings";
import { useStateContext } from "../context/ContextProvider";

const Home = () => {
  const { activeMenu } = useStateContext();
=======
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
>>>>>>> origin/main:client/src/Components/Dashboard.js
  const [verified, setVerified] = useState(false);

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
<<<<<<< HEAD:client/src/Components/Home.js
      <div>
        <div className="flex relative bg-neutral-200">
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
            <div className="w-72 fixed sidebar bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 bg-white">
              <Sidebar />
            </div>
          )}
          <div
            className={`bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg navbar w-full">
              <Navbar />
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
=======
      <Fragment>
        <h1>Welcome {name}</h1>
        <button
          className="btn btn-primary border-black border-2 p-2 m-2"
          onClick={logout}
        >
          Logout
        </button>
        <br />
        <span className="text-black border-black border-2 p-2 m-2">
          <a className="h-full" href="/calendar">
            calendar
          </a>
        </span>
      </Fragment>
>>>>>>> origin/main:client/src/Components/Dashboard.js
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

export default Dashboard;
