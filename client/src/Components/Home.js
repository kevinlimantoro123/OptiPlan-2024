import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Navbar from "./dashboard/Navbar";
import Footer from "./dashboard/Footer";
import Sidebar from "./dashboard/Sidebar";
import ThemeSettings from "./dashboard/ThemeSettings";
import { useStateContext } from "../context/ContextProvider";

const Home = () => {
  const { activeMenu } = useStateContext();
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  async function getName() {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      setName(parseRes.name);
    } catch (err) {
      console.error(err.message);
    }
  }

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
    getName();
  }, []);

  useEffect(() => {
    verify();
  }, []);

  if (verified) {
    return (
      <div>
        <div className="flex relative bg-neutral-200">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <button
              type="button"
              className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
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
            <div className="w-0 bg-neutral-200">
              <Sidebar />
            </div>
          )}
          <div
            className={`bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed bg-main-bg navbar w-full">
              <Navbar />
            </div>
          </div>

          <div></div>
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
