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
        return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;
    }
    const longitude = parseFloat(user.coordinates.longitude);
    const latitude = parseFloat(user.coordinates.latitude);
    if (isNaN(longitude) || isNaN(latitude)) {
        return <div>Please provide valid coordinates in the URL.</div>;
    }
    return (
        <div className="max-h-screen   md:px-80 p-6">
            <h3 className=" text-3xl">User Details</h3>
        <div className="md:flex items-center justify-center">
           
            <div className=" w-full flex-1 rounded-lg p-6">
                <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="w-full h-96 object-cover object-top  rounded-xl mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-center mb-2">{user.fullName}</h2>
                <p className="text-gray-600 text-center mb-4">{user.description}</p>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Interests:</h3>
                    <ul className="list-disc list-inside">
                        {user.interests.map((interest, index) => (
                            <li key={index} className="text-gray-700">
                                {interest}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Contact:</h3>
                    <p className="text-gray-700">Email: {user.contact.email}</p>
                    <p className="text-gray-700">Phone: {user.contact.phone}</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Coordinates:</h3>
                    <p className="text-gray-700">
                        Latitude: {user.coordinates.latitude}, Longitude: {user.coordinates.longitude}
                    </p>
                </div>
            </div>
            <div className="flex-1">
                <h3 className=" text-2xl py-4">Location</h3>
            <MapComponent coordinates={[longitude, latitude]} />

            </div>
        </div>
        </div>
    );
};

export default Profile;
