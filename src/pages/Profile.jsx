// Profile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../data/api";
import MapComponent from "../components/MapComponent";

const Profile = () => {
  const { id } = useParams(); // Get ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await api.getUser(Number(id));
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  const longitude = parseFloat(user.coordinates.longitude);
  const latitude = parseFloat(user.coordinates.latitude);
  if (isNaN(longitude) || isNaN(latitude)) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Invalid coordinates provided.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold text-center mb-10">User Profile</h1>
      <div className="md:flex items-start  space-y-6 md:space-y-0 md:space-x-10">
        <div className="md:w-1/2 bg-white  shadow-lg rounded-lg p-6">
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="w-82 h-80 object-cover  rounded-lg mb-6"
          />
          <h2 className="text-3xl font-semibold text-center mb-4">
            {user.fullName}
          </h2>
          <p className="text-gray-700 text-center mb-6">{user.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Interests:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {user.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact:</h3>
            <p className="text-gray-700">Email: {user.contact.email}</p>
            <p className="text-gray-700">Phone: {user.contact.phone}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Coordinates:</h3>
            <p className="text-gray-700">
              Latitude: {user.coordinates.latitude}, Longitude:{" "}
              {user.coordinates.longitude}
            </p>
          </div>
        </div>

        <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-center">Location</h3>
          <div className="h-72 w-full rounded-lg overflow-hidden">
            <MapComponent coordinates={[longitude, latitude]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
