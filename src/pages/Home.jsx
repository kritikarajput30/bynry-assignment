import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome</h1>
      <img src="/bynry_logo.jpg" alt="bynry" />
      <div className="space-y-4 flex gap-8 items-center">
        <button
          onClick={() => navigate("/user")}
          className="flex items-center w-40 h-20 justify-center text-2xl border-2 border-blue-600 rounded-2xl gap-2 mt-4 shadow-md transition duration-300"
        >
          <FiUser className="text-2xl" />
          User
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="flex items-center w-40 h-20 justify-center  text-2xl border-2 border-blue-600 rounded-2xl gap-2   shadow-md transition duration-300"
        >
          <MdOutlineAdminPanelSettings className="text-2xl" />
          Admin
        </button>
      </div>
    </div>
  );
};

export default Home;
