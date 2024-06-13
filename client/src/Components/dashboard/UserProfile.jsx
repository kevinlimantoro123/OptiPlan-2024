import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useStateContext } from "../../context/ContextProvider";

const UserProfile = () => {
  const { name, setVerified, setIsClicked, initialState } = useStateContext();
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      console.log("Logged out succcessfully");
      setVerified(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-8 rounded-lg w-96 z-40">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">User Profile</p>
      </div>
      <div className="flex gap-5 items-center mt-6 border-black border-b-2 pb-6">
        <div>
          <p className="font-semibold text-xl">{name}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-5 border-b-2 border-black p-4 hover:bg-gray-200 cursor-pointer">
          <button
            type="button"
            style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
            className="text-xl rounded-lg p-3 hover:bg-gray-200"
          >
            <CgProfile />
          </button>
          <div>
            <p className="font-semibold">My Profile</p>
            <p className="text-gray-500 text-sm">Account Settings</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={logout}
          style={{ backgroundColor: "gray", borderRadius: "10px" }}
          className="p-3 w-full hover:drop-shadow-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
