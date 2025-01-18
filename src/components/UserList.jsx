import { useEffect, useState } from "react";
import api from "../data/api";
import UserCard from "./UserCard";
import MapComponent from "./MapComponent";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const coordinates = [-74.0060, 40.7128];
    useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      const fetchedUsers = await api.getUsers();
      setUsers(fetchedUsers);
      setLoading(false); // End loading
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">User List</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <MapComponent coordinates={coordinates}/>
    </div>
  );
};

export default UserList;
