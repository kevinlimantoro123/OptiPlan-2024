import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { SiShopware } from "react-icons/si";
import UserProfile from "../dashboard/UserProfile";
import { useStateContext } from "../../context/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 text-neutral-200 hover:text-white"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const [name, setName] = useState("");
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

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

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 ml=1 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        icon={<AiOutlineMenu />}
      />
      <Link
        to="/"
        className="items-center gap-3 mt-2 flex text-xl font-extrabold tracking-tight text-neutral-200"
      >
        <SiShopware /> <span>OptiPlan</span>
      </Link>
      <div className="flex">
        <div
          className="flex items-center gap-2 cursor-pointer mr-6 p-1 hover:text-white rounded-lg"
          onClick={() => handleClick("userProfile")}
        >
          <p>
            <span className="text-neutral-200 text-16">Hi, </span>{" "}
            <span className="text-neutral-200 font-bold ml-1 text-16">{name}</span>
          </p>
          <MdKeyboardArrowDown className="text-neutral-200 text-16" />
        </div>
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
