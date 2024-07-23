import { useRef, useState, useEffect, useContext } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);
  const { verified, setVerified, finishedLoading, setFinishedLoading } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name, pwd };
      //check credentials
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //store token in local machine
      const parseRes = await res.json();
      localStorage.setItem("token", parseRes.token);
      setName("");
      setPwd("");
      setLoggedIn(true);
    } catch (err) {
      setErrMsg("Login failed");
      errRef.current.focus();
    }
  };

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
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && verified && finishedLoading) {
      navigate("/home/home");
      setFinishedLoading("");
    }
  }, [verified, loggedIn, finishedLoading]);

  return (
    <div className="h-screen w-full bg-black fixed left-0 top-0 flex items-center">
      <div className="border-neutral-700 bg-neutral-800 w-5/12 min-w-96 h-full flex items-center shrink-0">
        <div className="w-full">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="p-5 pt-8 text-center text-xl text-neutral-200 font-bold">
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="p-3">
              <div className="grid relative items-center text-gray-300 focus-within:text-neutral-200">
                <span className="w-5 h-5 mb-0.5 absolute ml-10 pointer-events-none">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="pl-12 px-5 py-2 w-11/12 h-12 justify-self-center font-semibold bg-neutral-500 placeholder-gray-300 text-neutral-200 rounded-2xl border-none focus:ring-0"
                />
              </div>
            </div>
            <div className="p-3">
              <div className="grid relative items-center text-gray-300 focus-within:text-neutral-200">
                <span className="w-5 h-5 mb-0.5 absolute ml-10 pointer-events-none">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={pwdVisible ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  className="pl-12 px-5 py-2 w-11/12 h-12 justify-self-center font-semibold bg-neutral-500 placeholder-gray-300 text-neutral-200 rounded-2xl border-none focus:ring-0"
                />
                <div
                  className="w-5 h-5 mb-0.5 absolute justify-self-end mr-10 text-gray-300 focus-within:text-neutral-200"
                  onClick={() => setPwdVisible(!pwdVisible)}
                >
                  {pwdVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              </div>
            </div>
            <div className="grid p-3">
              <button
                type="submit"
                disabled={!name || !pwd ? true : false}
                className={
                  !name || !pwd
                    ? "w-11/12 h-12 justify-self-center rounded-2xl border-none bg-neutral-500 text-neutral-200"
                    : "w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-neutral-200"
                }
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="p-3 flex items-center justify-center">
            <p className="text-neutral-200">Haven't registered?</p>
          </div>
          <div className="grid p-3 pb-6">
            <span className="w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-neutral-200">
              <a
                className="w-full h-full flex items-center justify-center"
                href="/register"
              >
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="text-neutral-200 text-6xl absolute top-0 font-bold pl-14 pt-14 pr-24">
          Your One-Stop Solution to Seamless Scheduling
        </div>
        <img
          src="/images/optiplanSquares.gif"
          className="absolute bottom-0 right-0 m-12 h-56"
        />
      </div>
    </div>
  );
};

export default Login;
