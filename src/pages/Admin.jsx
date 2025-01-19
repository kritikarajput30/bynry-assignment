import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

const Admin = () => {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <div>{loading ? <Loader /> : <Dashboard />}</div>;
};

export default Admin;
