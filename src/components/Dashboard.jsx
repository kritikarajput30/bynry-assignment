import React, { useState } from "react";
import { FaBars, FaUsers } from "react-icons/fa";
import UserList from "./UserList"; // Assuming you have a UserList component
import { MdClose } from "react-icons/md";
import { IoPersonAddOutline, IoSettingsOutline } from "react-icons/io5";
import UserForm from "./UserForm";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);

  const toggleDrawer = (state) => {
    setDrawerOpen(state);
  };
  const toggleFlip = () => {
    setToggleOpen(!toggleOpen);
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar (Mobile Drawer) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="p-4">
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
              {/* Add more sidebar options here */}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ms-64 ">
        <div className="flex items-center justify-between mb-4">
          <div className=" flex md:justify-between items-center gap-2 w-full">
          <h2 className="md:text-2xl text-xl font-bold text-gray-800 flex items-center gap-2">Users Management <IoSettingsOutline className=" font-bold text-xl md:text-3xl"/>
          </h2>
<button onClick={toggleFlip}  className=" bg-blue-600 px-4 flex items-center shadow-md p-2 gap-1 text-white">New User <IoPersonAddOutline className='text-white rounded-md text-3x' />
</button>
          </div>
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
        <UserList admin={true} />
      </div>
      {
        toggleOpen && (
          <UserForm
        user={null}
        onSubmit={null}
        onClose={toggleFlip}
      />
        )
      }
    </div>
  );
};

export default Dashboard;
