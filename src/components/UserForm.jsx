import { useState } from "react";
import api from "../data/api";

const UserForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    user || {
      fullName: "",
      description: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
      profilePicture: "",
      interests: [],
      contact: {
        email: "",
        phone: "",
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      coordinates: {
        ...formData.coordinates,
        [name]: value,
      },
    });
  };

  const handleInterestsChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, interests: value });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onSubmit(formData);
    } else {
      api.addUser(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">
          {user ? "Update User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-sm"
              rows="2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.coordinates.latitude}
              onChange={handleCoordinateChange}
              className="w-full border border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.coordinates.longitude}
              onChange={handleCoordinateChange}
              className="w-full border border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Profile Pic</label>
            <input
              type="text"
              name="profilePicture"
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-sm"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Interests</label>
            <select
              name="interests"
              value={formData.interests}
              onChange={handleInterestsChange}
              multiple
              className="w-full border border-gray-300 p-1 rounded text-sm"
            >
              <option value="Coding">Coding</option>
              <option value="Gaming">Gaming</option>
              <option value="Traveling">Traveling</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.contact.email}
              onChange={handleContactChange}
              className="w-full border border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.contact.phone}
              onChange={handleContactChange}
              className="w-full border border-gray-300 p-1 rounded text-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-3 py-1 text-white rounded text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-3 py-1 text-white rounded text-sm"
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
