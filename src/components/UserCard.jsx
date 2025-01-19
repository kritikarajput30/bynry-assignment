/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../data/api";
import UserForm from "./UserForm";
import { LuMapPin } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const getUsersFromStorage = () => {
  const storedData = localStorage.getItem("userProfiles");
  return storedData ? JSON.parse(storedData) : [];
};

const saveUsersToStorage = (data) => {
  localStorage.setItem("userProfiles", JSON.stringify(data));
};

const UserCard = ({ user, admin = true, onUserUpdate }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);

  const handleSummaryClick = () => {
    const { latitude, longitude } = user.coordinates;
    navigate(`/map?lat=${latitude}&lng=${longitude}`);
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    setModalUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalUser(null);
  };

  const handleModalSubmit = async (updatedUser) => {
    try {
      const users = getUsersFromStorage();
      const result = await api.updateUser(updatedUser.id, updatedUser);
      if (result) {
        const updatedUsers = users.map((u) =>
          u.id === updatedUser.id ? result : u
        );
        saveUsersToStorage(updatedUsers);
        toast.success("User updated successfully!");
        onUserUpdate();
      } else {
        toast.error("Failed to update user.");
      }
      handleModalClose();
    } catch (error) {
      console.error("An error occurred while updating the user.");
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        const users = getUsersFromStorage();
        await api.deleteUser(user.id);
        const updatedUsers = users.filter((u) => u.id !== user.id);
        saveUsersToStorage(updatedUsers);
        toast.success("User deleted successfully!");
        onUserUpdate();
      } catch (error) {
        console.error("Error deleting user.");
      }
    }
  };

  return (
    <div className="max-w-md w-full bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          className="w-full h-48 object-cover object-center"
          src={user.profilePicture}
          alt={`${user.fullName}'s profile`}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <h2 className="text-white text-lg font-bold">{user.fullName}</h2>
          <p className="text-gray-200 text-sm">{user.description}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <a
          href={`/profile/${user.id}`}
          className="block text-blue-600 font-semibold text-center underline hover:text-blue-800"
        >
          View Full Profile
        </a>

        <button
          className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            handleSummaryClick();
          }}
        >
          <LuMapPin className="text-white text-lg" />
          <span>Summary</span>
        </button>

        {admin && (
          <div className="flex justify-between items-center">
            <button
              onClick={handleUpdateClick}
              className="flex items-center justify-center bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200"
            >
              <FiEdit2 className="text-xl" />
            </button>

            <button
              onClick={handleDeleteClick}
              className="flex items-center justify-center bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
            >
              <AiOutlineDelete className="text-xl" />
            </button>
          </div>
        )}
      </div>

      {admin && isModalOpen && (
        <UserForm
          user={modalUser}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default UserCard;
