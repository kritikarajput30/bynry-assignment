import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome</h1>
      <div className="space-y-4">
        {/* User Button */}
        <button
          onClick={() => navigate("/user")}
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          <FaUser className="mr-2 text-lg" />
          User
        </button>

        {/* Admin Button */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          <FaUserShield className="mr-2 text-lg" />
          Admin
        </button>
      </div>
    </div>
  );
};

export default Home;
