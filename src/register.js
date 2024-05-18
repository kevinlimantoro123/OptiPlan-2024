import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//User and PW boundaries
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3, 20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = errRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false); //valid checker
  const [userFocus, setUserFocus] = useState(false); //user focus checker

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus(); //Sets focus to current user ref
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user); //Checks validation of username
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd); //Checks validation of pw
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd; //Checks if matchpw == original pw
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErr(""); //clears err msg
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "error" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
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
          onChange={(a) => setUser(a.target.value)}
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
          4 to 21 characters allowed.
          <br />
          Must begin with a letter.
          <br />
        </p>
      </form>
    </section>
  );
};

export default Register;
