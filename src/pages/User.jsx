import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import Loader from "../components/Loader";

const User = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="md:px-80 pt-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-3xl text-center font-semibold">Users List</h3>
          <UserList admin={false} />
        </>
      )}
    </div>
  );
};

export default User;
