import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";

const REGISTER_URL = "/register";
//User and PW boundaries
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false); //valid checker
  const [userFocus, setUserFocus] = useState(false); //user focus checker

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);
  const [matchVisible, setMatchVisible] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus(); //Sets focus to current user ref
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user); //Checks validation of username
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd); //Checks validation of pw
    setValidPwd(result);
    const match = pwd === matchPwd; //Checks if matchpw == original pw
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg(""); //clears err msg
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res?.data));
      setUser("");
      setPwd("");
      setMatchPwd("");
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Your account has been created!</h1>
          <p>
            <a href="#">Sign in</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "error" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters allowed.
              <br />
              Must begin with a letter.
              <br />
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type={pwdVisible ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <div className="p-1" onClick={() => setPwdVisible(!pwdVisible)}>
              {pwdVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number.
              <br />
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatchPwd && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type={matchVisible ? "text" : "password"}
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatchPwd ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
            />
            <div className="p-2" onClick={() => setMatchVisible(!matchVisible)}>
              {matchVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
            <p
              id="confirmnote"
              className={
                matchPwdFocus && !validMatchPwd ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the password input field.
            </p>

            <button
              disabled={
                !validName || !validPwd || !validMatchPwd ? true : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*CHANGE HREF TO ACTUAL ROUTER LINK*/}
              <a href="#">Sign in</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
