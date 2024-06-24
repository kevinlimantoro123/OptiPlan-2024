import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import UserProfile from "../dashboard/UserProfile";
import GlobalContext from "../../context/GlobalContext";

const NavButton = ({ customFunc, icon, color, dotColor }) => (
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
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    name,
    setRefreshKey,
    refreshKey,
  } = useContext(GlobalContext);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    }
  }, [screenSize]);

  const handleActiveMenu = () => {
    setActiveMenu(!activeMenu);
    setRefreshKey(!refreshKey);
  };

  return (
    <div className="flex justify-between p-2 ml=1 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        icon={<AiOutlineMenu />}
      />
      <Link
        to="/"
        className="items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3 mt-1 flex text-xl absolute font-extrabold tracking-tight text-neutral-200"
      >
        <img src="/images/optiplanNoNameNoBg.gif" className="h-6" />
        <span>OptiPlan</span>
      </Link>
      <div className="flex">
        <div
          className="flex items-center gap-2 cursor-pointer mr-6 p-1 hover:text-white rounded-lg"
          onClick={() => setOpenProfile(!openProfile)}
        >
          <p>
            <span className="text-neutral-200 text-16">Hi, </span>{" "}
            <span className="text-neutral-200 font-bold ml-1 text-16">
              {name}
            </span>
          </p>
          {openProfile ? (
            <MdKeyboardArrowUp className="text-neutral-200 text-16" />
          ) : (
            <MdKeyboardArrowDown className="text-neutral-200 text-16" />
          )}
        </div>
        {openProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
