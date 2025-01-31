import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import UserList from "./UserList";
import { MdClose } from "react-icons/md";
import { IoPersonAddOutline, IoSettingsOutline } from "react-icons/io5";
import UserForm from "./UserForm";
import Loader from "./Loader";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDrawer = (state) => {
    setDrawerOpen(state);
  };

  const toggleFlip = () => {
    setLoading(true);
    setTimeout(() => {
      setToggleOpen(!toggleOpen);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex bg-gray-100">
      {loading && <Loader />}

      {/* Drawer background overlay for mobile view */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-gray-400 bg-opacity-50 z-40"
          onClick={() => toggleDrawer(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50`}
      >
        <div className="p-4 relative">
          {/* Close Button for Drawer */}
          <MdClose
            className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-700 lg:hidden"
            onClick={() => toggleDrawer(false)}
          />
          <div className="flex items-center space-x-2">
            <img src="./bynry_logo.jpg" alt="img-logo" className="h-12" />
          </div>
          <nav className="mt-6">
            <ul>
              <li
                className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => toggleDrawer(false)}
              >
                Users
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ms-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
              Users Management{" "}
              <IoSettingsOutline className="font-bold text-lg md:text-2xl" />
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFlip}
              className="bg-blue-600 px-3 md:px-4 py-2 flex items-center shadow-md gap-1 text-white text-sm md:text-base"
            >
              New User
              <IoPersonAddOutline className="text-white text-lg md:text-xl" />
            </button>
            {drawerOpen ? (
              <MdClose
                className="text-2xl cursor-pointer lg:hidden text-gray-700"
                onClick={() => toggleDrawer(false)}
              />
            ) : (
              <FaBars
                className="text-2xl cursor-pointer lg:hidden text-gray-700"
                onClick={() => toggleDrawer(true)}
              />
            )}
          </div>
        </div>

        {/* User List */}
        <UserList admin={true} />
      </div>

      {/* User Form */}
      {toggleOpen && (
        <UserForm user={null} onSubmit={null} onClose={toggleFlip} />
      )}
    </div>
  );
};

export default Dashboard;
