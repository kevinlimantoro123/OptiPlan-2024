import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { links } from "./data";
import GlobalContext from "../../context/GlobalContext";

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

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useContext(GlobalContext);

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-neutral-400 text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-neutral-200 hover:bg-neutral-700 m-2";

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="h-screen overflow-auto bg-neutral-800">
      {activeMenu && (
        <>
          <div className="p-1 pt-2 ml-1">
            <NavButton
              title="Menu"
              customFunc={handleActiveMenu}
              icon={<AiOutlineMenu />}
            />
          </div>
          <div className="mt-100 ml-3">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-neutral-200 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={
                      `${link.name}` === `home` ? `/home` : `/home/${link.name}`
                    }
                    key={link.name}
                    onClick={() => handleCloseSidebar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
