/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import data from "../data/data.json"; // Import the local JSON file

const UserList = ({ admin }) => {
  const [users, setUsers] = useState([]); // All users from JSON file
  const [filteredUsers, setFilteredUsers] = useState([]); // Users to display
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [filterType, setFilterType] = useState("all"); // Filter type: "all", "name", or "location"

  useEffect(() => {
    // Load data from JSON
    setUsers(data);
    setFilteredUsers(data); // Display all users initially
  }, []);

  useEffect(() => {
    let updatedUsers = users;

    // Apply search term filtering
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      updatedUsers = users.filter((user) => {
        const nameMatch = user.fullName?.toLowerCase().includes(searchLower);
        const locationMatch = user.coordinates && JSON.stringify(user.coordinates).includes(searchLower);
        const descriptionMatch = user.description?.toLowerCase().includes(searchLower);
        const interestsMatch = user.interests.some((interest) =>
          interest.toLowerCase().includes(searchLower)
        );
        const emailMatch = user.contact?.email?.toLowerCase().includes(searchLower);
        const phoneMatch = user.contact?.phone?.toLowerCase().includes(searchLower);

        return nameMatch || locationMatch || descriptionMatch || interestsMatch || emailMatch || phoneMatch;
      });
    }

    // Apply filter type
    if (filterType === "name") {
      updatedUsers = updatedUsers.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    } else if (filterType === "location") {
      updatedUsers = updatedUsers.sort((a, b) =>
        (a.coordinates.latitude || 0) - (b.coordinates.latitude || 0)
      );
    }

    setFilteredUsers(updatedUsers);
  }, [searchTerm, filterType, users]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by any field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md mb-4 sm:mb-0"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-md ${
              filterType === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType("name")}
            className={`px-4 py-2 rounded-md ${
              filterType === "name" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Filter by Name
          </button>
          <button
            onClick={() => setFilterType("location")}
            className={`px-4 py-2 rounded-md ${
              filterType === "location" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Filter by Location
          </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-30">
        {filteredUsers.map((user) => (
          <UserCard admin={admin} key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
