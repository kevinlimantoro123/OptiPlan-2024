import { useRef, useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const LOGIN_URL = "/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type={pwdVisible ? "text" : "password"}
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <div className="p-1" onClick={() => setPwdVisible(!pwdVisible)}>
          {pwdVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </div>
        <button>Sign In</button>
      </form>
      <p>
        Haven't registered?
        <br />
        <span className="line">
          <a href="/register">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
