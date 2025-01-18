import { useState } from 'react';

// UserForm Component
const UserForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(user || {
    fullName: '',
    description: '',
    coordinates: {
      latitude: '',
      longitude: '',
    },
    profilePic: '',  // New field
    interests: [],   // New field
    contact: {
      email: '',     // New field
      phone: '',     // New field
    },
  });

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
    const value = Array.from(e.target.selectedOptions, option => option.value);
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
      // Update existing user
      onSubmit(formData);
    } else {
      // Create new user
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{user ? 'Update User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.coordinates.latitude}
              onChange={handleCoordinateChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.coordinates.longitude}
              onChange={handleCoordinateChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Pic</label>
            <input
              type="text"
              name="profilePic"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Interests</label>
            <select
              name="interests"
              value={formData.interests}
              onChange={handleInterestsChange}
              multiple
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Coding">Coding</option>
              <option value="Gaming">Gaming</option>
              <option value="Traveling">Traveling</option>
              {/* You can add more interests as options */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.contact.email}
              onChange={handleContactChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.contact.phone}
              onChange={handleContactChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-400 p-2 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 p-2 text-white rounded">
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
