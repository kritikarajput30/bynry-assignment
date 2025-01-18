/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleSummaryClick = () => {
    // Extract latitude and longitude from user object
    const { latitude, longitude } = user.coordinates;

    // Redirect to the map page with coordinates
    navigate(`/map?lat=${latitude}&lng=${longitude}`);
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden border flex items-center border-gray-200 p-4">
      <img
        className="w-88 h-28 object-cover rounded-full"
        src={user.profilePicture}
        alt={`${user.fullName}'s profile`}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{user.fullName}</h2>
        <p className="text-gray-600 mt-2">{user.description}</p>
        <button
          className="bg-green-400 shadow-md p-2 text-sm my-4"
          onClick={handleSummaryClick}
        >
          Summary
        </button>
      </div>
    </div>
  );
};

export default UserCard;
