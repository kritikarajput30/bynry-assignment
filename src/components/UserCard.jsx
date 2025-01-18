/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../data/api';  // Assume this imports your API module
import UserForm from './UserForm';  // Importing the UserForm component
import { FaMapLocation } from 'react-icons/fa6';
import { MdDelete, MdDeleteOutline, MdOutlineUpdate, MdUpdate } from 'react-icons/md';
import { LuMapPin } from 'react-icons/lu';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

const UserCard = ({ user, admin=true }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);

  const handleSummaryClick = () => {
    const { latitude, longitude } = user.coordinates;
    navigate(`/map?lat=${latitude}&lng=${longitude}`);
  };

  const handleUpdateClick = () => {
    setModalUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalUser(null);
  };

  const handleModalSubmit = async (updatedUser) => {
    try {
      if (user) {
        await api.updateUser(user.id, updatedUser);
      } else {
        await api.addUser(updatedUser);
      }
      setIsModalOpen(false);
      // Optionally, you can refresh user data or do something else
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        await api.deleteUser(user.id);
        alert('User deleted successfully');
        // Optionally, update the UI or refresh the users list
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden border flex items-center border-gray-200">
      <img
        className="w-28 h-full object-cover"
        src={user.profilePicture}
        alt={`${user.fullName}'s profile`}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{user.fullName}</h2>
        <p className="text-gray-600 mt-2">{user.description}</p>
        <button
          className="border-green-500 border-2 shadow-md p-2 text-sm my-4 text-green-500 flex items-center"
          onClick={handleSummaryClick}
        >
          Summary <LuMapPin className='text-green-500  rounded-md text-2xl'/>

        </button>
        {admin && (
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleUpdateClick}
            >
              <FiEdit2 className='text-blue-600 bg-gray-50 rounded-md text-2xl' />

            </button>
            <button
              
              onClick={handleDeleteClick}
            >
<AiOutlineDelete className='text-red-600 bg-gray-50 rounded-md text-2xl'/>
</button>
          </div>
        )}
      </div>
      {
        admin && isModalOpen &&  <UserForm
        user={modalUser}
        onSubmit={handleModalSubmit}
        onClose={handleModalClose}
      />
      }
     
    </div>
  );
};

export default UserCard;
