/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../data/api";
import UserCard from "./UserCard";

const UserList = ({admin}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard admin={admin} key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
