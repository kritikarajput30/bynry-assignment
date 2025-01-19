/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast
import api from "../data/api";
import UserForm from "./UserForm";
import { LuMapPin } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

// Retrieve users from local storage, if any
const getUsersFromStorage = () => {
  const storedData = localStorage.getItem('userProfiles');
  return storedData ? JSON.parse(storedData) : [];
};

// Save users to local storage
const saveUsersToStorage = (data) => {
  localStorage.setItem('userProfiles', JSON.stringify(data));
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
    e.stopPropagation(); // Prevent event bubbling to the parent <a>
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
        // Update local storage after successful update
        const updatedUsers = users.map(u => u.id === updatedUser.id ? result : u);
        saveUsersToStorage(updatedUsers);
        toast.success("User updated successfully!");
        onUserUpdate(); // Trigger parent to refresh data
      } else {
        toast.error("Failed to update user.");
      }
      handleModalClose();
    } catch (error) {
      console.error("An error occurred while updating the user.");
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Prevent event bubbling to the parent <a>
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const users = getUsersFromStorage();
        await api.deleteUser(user.id);
        // Update local storage after successful deletion
        const updatedUsers = users.filter(u => u.id !== user.id);
        saveUsersToStorage(updatedUsers);
        toast.success("User deleted successfully!");
        onUserUpdate(); // Trigger parent to refresh data
      } catch (error) {
        console.error("Error deleting user.");
      }
    }
  };

  return (
    <div
      className="max-w-sm bg-white rounded-lg shadow-md border flex items-center border-gray-200"
    >
      <img
        className="w-28 h-full object-cover"
        src={user.profilePicture}
        alt={`${user.fullName}'s profile`}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{user.fullName}</h2>
        <p className="text-gray-600 mt-2">{user.description}</p>
        <a
          href={`/profile/${user.id}`} 
          className="text-blue-600 underline"
        >
          View Profile
        </a>
        <button
          className="border-green-500 border-2 shadow-md p-2 text-sm my-4 text-green-500 flex items-center"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling to the parent <a>
            handleSummaryClick();
          }}
        >
          Summary <LuMapPin className="text-green-500 rounded-md text-2xl" />
        </button>
        {admin && (
          <div className="flex space-x-2 mt-4">
            <button onClick={handleUpdateClick}>
              <FiEdit2 className="text-blue-600 bg-gray-50 rounded-md text-2xl" />
            </button>
            <button onClick={handleDeleteClick}>
              <AiOutlineDelete className="text-red-600 bg-gray-50 rounded-md text-2xl" />
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
