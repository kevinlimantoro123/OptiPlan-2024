import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faExclamation,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//User and PW boundaries
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus(); //Sets focus to current user ref
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(name); //Checks validation of username
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd); //Checks validation of pw
    setValidPwd(result);
    const match = pwd === matchPwd; //Checks if matchpw == original pw
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg(""); //clears err msg
  }, [name, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const body = { name, pwd };
      const res = await fetch(
        "http://opti-plan-2024-backend.vercel.app/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await res.json();

      setName("");
      setPwd("");
      setMatchPwd("");
      setSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setErrMsg("Username taken / Registration failed");
      errRef.current.focus();
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-neutral-800 to-black left-0 top-0 flex items-center">
      <div className="w-5/12 min-w-96 h-full flex items-center shrink-0">
        <div className="w-full">
          {success ? (
            <section>
              <h1 className="p-3 pt-8 text-center text-xl text-neutral-200 font-bold">
                Your account has been created!
              </h1>
              <div className="grid p-3 pb-6">
                <span className="w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-neutral-200">
                  <a
                    className="w-full h-full flex items-center justify-center"
                    href="/login"
                  >
                    Sign in
                  </a>
                </span>
              </div>
            </section>
          ) : (
            <section>
              <p
                ref={errRef}
                className="w-full text-center text-neutral-200"
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1 className="p-5 pt-8 text-center text-xl text-neutral-200 font-bold">
                Register
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
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                    />
                    <div className="w-5 h-5 mb-0.5 absolute justify-self-end text-center mr-10 pointer-events-none">
                      {name ? (
                        validName ? (
                          <span className="text-green-500">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : (
                          <span className="text-red-500">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        )
                      ) : (
                        <span>
                          <FontAwesomeIcon icon={faExclamation} />
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {userFocus && name && !validName ? (
                      <div className="text-red-500 pl-12 px-5 py-2 w-11/12 h-3 text-xs justify-self-center">
                        <p>
                          4 - 24 characters, first character has to be a letter,
                          no special characters/symbols
                        </p>
                      </div>
                    ) : (
                      <div className="pl-12 px-5 py-2 w-11/12 text-xs"></div>
                    )}
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
                      className="pl-12 px-5 py-2 w-11/12 h-12 justify-self-center font-semibold bg-neutral-500 placeholder-gray-300 text-neutral-200 rounded-2xl border-none focus:ring-0"
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                    <div
                      className="w-5 h-5 mb-0.5 absolute justify-self-end mr-16"
                      onClick={() => setPwdVisible(!pwdVisible)}
                    >
                      {pwdVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                    <div className="w-5 h-5 mb-0.5 absolute justify-self-end text-center mr-10 pointer-events-none">
                      {pwd ? (
                        validPwd ? (
                          <span className="text-green-500">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : (
                          <span className="text-red-500">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        )
                      ) : (
                        <span>
                          <FontAwesomeIcon icon={faExclamation} />
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {pwdFocus && !validPwd ? (
                      <div className="text-red-500 pl-12 px-5 py-2 w-11/12 h-3 text-xs justify-self-center">
                        <p>
                          8 - 24 characters with numbers, uppercase, and
                          lowercase letters
                        </p>
                      </div>
                    ) : (
                      <div className="pl-12 px-5 py-2 w-11/12 text-xs"></div>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <div className="grid relative items-center text-gray-300 focus-within:text-neutral-200">
                    <span className="w-5 h-5 mb-0.5 absolute ml-10 pointer-events-none">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type={matchVisible ? "text" : "password"}
                      id="confirm_pwd"
                      placeholder="Confirm Password"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      className="pl-12 px-5 py-2 w-11/12 h-12 justify-self-center font-semibold bg-neutral-500 placeholder-gray-300 text-neutral-200 rounded-2xl border-none focus:ring-0"
                      required
                      aria-invalid={validMatchPwd ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchPwdFocus(true)}
                      onBlur={() => setMatchPwdFocus(false)}
                    />
                    <div
                      className="w-5 h-5 mb-0.5 absolute justify-self-end mr-16"
                      onClick={() => setMatchVisible(!matchVisible)}
                    >
                      {matchVisible ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </div>
                    <div className="w-5 h-5 absolute justify-self-end text-center mr-10 pointer-events-none">
                      {matchPwd ? (
                        validMatchPwd ? (
                          <span className="text-green-500">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : (
                          <span className="text-red-500">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        )
                      ) : (
                        <span>
                          <FontAwesomeIcon icon={faExclamation} />
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {matchPwdFocus && !validMatchPwd ? (
                      <div className="text-red-500 pl-12 px-5 py-2 w-11/12 h-3 text-xs justify-self-center">
                        <p>Must match the password input field</p>
                      </div>
                    ) : (
                      <div className="pl-12 px-5 py-2 w-11/12 text-xs"></div>
                    )}
                  </div>
                </div>
                <div className="grid p-3 relative items-center">
                  {isLoading && (
                    <div
                      className="inline-block absolute justify-self-end mr-[51px] text-neutral-200 h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={
                      !validName || !validPwd || !validMatchPwd ? true : false
                    }
                    className={
                      !validName || !validPwd || !validMatchPwd
                        ? "w-11/12 h-12 justify-self-center rounded-2xl border-none bg-neutral-500 text-neutral-200"
                        : "w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-neutral-200"
                    }
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="p-3 flex items-center justify-center">
                <p className="text-neutral-200">Already registered?</p>
              </div>
              <div className="grid p-3 pb-6">
                <span className="w-11/12 h-12 justify-self-center rounded-2xl border-none ring-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-neutral-200">
                  <a
                    className="w-full h-full flex items-center justify-center"
                    href="/login"
                  >
                    Sign in
                  </a>
                </span>
              </div>
            </section>
          )}
        </div>
      </div>
      <div className="w-7/12 h-screen">
        <img
          src="/images/tagline.png"
          className="absolute top-0 h-2/5 pt-14 pl-14"
        />
        <img
          src="/images/optiplanNoBg.gif"
          className="absolute bottom-0 right-0 m-12 h-[30vh]"
        />
      </div>
    </div>
  );
};

export default Register;
