import { Fragment, useEffect, useContext, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./dashboard/Navbar";
import Sidebar from "./dashboard/Sidebar";
import Calendar from "./calendar/Calendar";
import Kanban from "./kanbanBoard/Kanban";
import GlobalContext from "../context/GlobalContext";
import Analytics from "./analytics/Analytics";

const Home = () => {
  const { verified, setVerified, activeMenu, setActiveMenu, notifEvents } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [ homeNotifs, setHomeNotifs ] = useState([]);

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

  useEffect(() => {
    verify();
  }, []);

  const showNotif = () => {
    console.log(notifEvents);
  };

  useEffect(() => {
    setHomeNotifs(
      notifEvents.map((event) => {
        toast.info("Upcoming event: " + `${event.title}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
    }));
  }, [notifEvents]);

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
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </div>
            <div>
              {homeNotifs}
              <ToastContainer stacked />
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
