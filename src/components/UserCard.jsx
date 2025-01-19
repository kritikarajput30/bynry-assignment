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
    <div className="max-w-lg bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={user.profilePicture}
        alt={`${user.fullName}'s profile`}
      />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
        <p className="text-gray-600 mt-2">{user.description}</p>
        <div className="mt-4">
          <a
            href={`/profile/${user.id}`}
            className="text-blue-500 text-sm underline"
          >
            View Profile
          </a>
        </div>
        <button
          className="border-green-500 border-2 shadow-sm px-6 py-2 text-sm mt-4 text-green-500 rounded-md flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            handleSummaryClick();
          }}
        >
          Summary
          <LuMapPin className="ml-2 text-green-500 text-xl" />
        </button>
        {admin && (
          <div className="flex space-x-3 mt-4">
            <button onClick={handleUpdateClick}>
              <FiEdit2 className="text-blue-500 h-8 w-8 bg-gray-100 p-2 rounded-md text-xl" />
            </button>
            <button onClick={handleDeleteClick}>
              <AiOutlineDelete className="text-red-500 h-8 w-8 bg-gray-100 p-2 rounded-md text-xl" />
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
