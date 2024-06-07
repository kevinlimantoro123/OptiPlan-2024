import { useRef, useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);

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

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="h-screen w-full bg-blue-100 fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-5/12 min-w-96">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="p-5 text-center text-xl text-gray-500 font-bold">
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="p-3">
            <div className="grid relative items-center text-gray-400 focus-within:text-gray-600">
              <span className="w-5 h-5 absolute ml-10 pointer-events-none">
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
                className="pl-12 px-5 py-2 w-11/12 h-12 justify-self-center font-semibold placeholder-gray-400 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              />
            </div>
          </div>
          <div className="p-3">
            <div className="grid relative items-center text-gray-400 focus-within:text-gray-600">
              <span className="w-5 h-5 absolute ml-10 pointer-events-none">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type={pwdVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="pl-12 px-5 pr-14 py-2 w-11/12 h-12 justify-self-center font-semibold placeholder-gray-400 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              />
              <div
                className="w-5 h-5 absolute justify-self-end mr-10"
                onClick={() => setPwdVisible(!pwdVisible)}
              >
                {pwdVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
>>>>>>> bc38d8429ad8ead81c93ba639296536b3f9b0d04
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
                  onClick={() => setPwdVisible(!pwdVisible)}>
                  {pwdVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              </div>
            </div>
            <div className="grid p-3">
              <button 
                type="submit"
                disabled={
                  !name || !pwd ? true : false
                }
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
<<<<<<< HEAD
          <div className="grid p-3 pb-6">
            <span className="w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-neutral-200">
              <a className="w-full h-full flex items-center justify-center" href="/register">Sign up</a>
            </span>
=======
          <div className="grid p-3">
            <button
              type="submit"
              disabled={!name || !pwd ? true : false}
              className={
                !name || !pwd
                  ? "w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 ring-gray-300 bg-gray-300 text-white"
                  : "w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-blue-500 text-white"
              }
            >
              Sign In
            </button>
>>>>>>> bc38d8429ad8ead81c93ba639296536b3f9b0d04
          </div>
        </div>
<<<<<<< HEAD
      </div>
      <div>
        <div className="text-neutral-200 text-6xl absolute top-0 font-bold pl-14 pt-14 pr-24">
          Your One-Stop Solution to Seamless Scheduling
=======
        <div className="grid p-3 pb-6">
          <span className="w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-blue-500 text-white">
            <a
              className="w-full h-full flex items-center justify-center"
              href="/register"
            >
              Sign up
            </a>
          </span>
>>>>>>> bc38d8429ad8ead81c93ba639296536b3f9b0d04
        </div>
        <img src="/images/optiplanSquares.gif" className="absolute bottom-0 right-0 m-12 h-56"/>
      </div>
    </div>
  );
};

export default Login;
