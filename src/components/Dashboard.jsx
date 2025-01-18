import React, { useState } from 'react';
import { FaBars, FaUsers } from 'react-icons/fa';
import UserList from './UserList';  // Assuming you have a UserList component
import { MdClose } from 'react-icons/md';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (state) => {
    setDrawerOpen(state);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (Mobile Drawer) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white transform ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <FaUsers className="" />
            <span className="text-xl font-semibold">User Management</span>
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
      <div className="flex-1 p-6 bg-gray-100 lg:ps-80 md:ps-80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Users List</h2>
          {
            drawerOpen ? (
             <MdClose className="text-2xl cursor-pointer lg:hidden text-gray-700"  onClick={() => toggleDrawer(false)}/>
            ):( <FaBars
              className="text-2xl cursor-pointer lg:hidden text-gray-700"
              onClick={() => toggleDrawer(true)}
            />)
          }
         
        </div>
        <UserList admin={true} />
      </div>
    </div>
  );
};

export default Dashboard;
