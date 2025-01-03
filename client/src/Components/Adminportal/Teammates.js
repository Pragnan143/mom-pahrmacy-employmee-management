import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../Assets/profile.png";

const Teammates = () => {
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNonAdminUsers = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await axios.get(
          "https://mom-pahrmacy-employmee-management.onrender.com/user/"
        );
        setTeammates(response.data.users);
      } catch (error) {
        console.error("Error fetching non-admin users:", error);
        setErrorMessage("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchNonAdminUsers();
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/employee-details/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      // Deleting the user from the server
      await axios.delete(
        `https://mom-pahrmacy-employmee-management.onrender.com/user/${id}`
      );
      // Updating the state to remove the deleted user
      setTeammates(teammates.filter((teammate) => teammate._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("Failed to delete user.");
    }
  };

  const handleAddUserClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUserSubmit = async (e) => {
    const formData = new FormData(e.target);
    const newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      isAdmin: formData.get("isAdmin") === "true",
    };

    try {
      // Adding the new user
      const response = await axios.post(
        "https://mom-pahrmacy-employmee-management.onrender.com/user/register",
        newUser
      );
      // Adding the new user to the teammates state
      setTeammates([...teammates, response.data.user]);
      closeModal();
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorMessage("Failed to add user.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="flex flex-col items-center w-full space-y-6">
        <div className="flex items-center justify-center relative w-full">
          <h2 className="text-4xl font-medium text-gray-600 mb-6 text-center">
            Hi There, This is Your Team
          </h2>
          <button
            onClick={handleAddUserClick}
            className="absolute right-0 bg-green-600 text-white px-6 py-2 rounded-md border border-green-700 hover:bg-green-500"
          >
            Add User
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {teammates.map((teammate) => (
            <div
              key={teammate._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-4"
            >
              <img
                src={ProfilePic}
                alt={`Avatar`}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
              <p className="text-lg font-semibold text-gray-800">
                {teammate.username}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDetailsClick(teammate._id)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500"
                >
                  Details
                </button>
                <button
                  onClick={() => handleDeleteClick(teammate._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">
              Add User
            </h2>
            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Is Admin</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isAdmin"
                      value="true"
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isAdmin"
                      value="false"
                      className="mr-2"
                      defaultChecked
                    />
                    No
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500"
              >
                Submit
              </button>
            </form>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teammates;
