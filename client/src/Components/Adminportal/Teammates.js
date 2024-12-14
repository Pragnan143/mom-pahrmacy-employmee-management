import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Teammates = () => {
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Navigate=useNavigate()
  useEffect(() => {
    const fetchNonAdminUsers = async () => {
      try {
        // Start loading
        setLoading(true);
        setErrorMessage(""); // Clear previous errors

        // Make API call to fetch non-admin users
        const response = await axios.get("http://localhost:5000/user/");
        // Update state with the fetched users
        setTeammates(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        // Handle error
        console.error("Error fetching non-admin users:", error);
        setErrorMessage("Failed to fetch users.");
      } finally {
        // End loading
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchNonAdminUsers();
  }, []);

  const handleDetailsClick = (id) => {
  Navigate(`/employee-details/${id}`)
  };

  const handleDeleteClick = (id) => {
    setTeammates((prev) => prev.filter((teammate) => teammate.id !== id));
  };

  const handleAddUserClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="flex flex-col items-center w-full space-y-10">
        <div className="flex items-center justify-center relative w-full">
          <h2 className="text-4xl font-medium text-gray-600 mb-6 text-center">
            Hi There This is your team
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
        <div className="">
          {teammates.map((teammate) => (
            <div
              key={teammate._id} // Use _id as the unique key for each teammate
              className="bg-white shadow-md rounded-lg p-4 flex gap-6 justify-center items-center"
            >
              <img
                // If the 'photo' field exists, use it, otherwise use a default placeholder
                src={teammate.photo || "default-avatar.png"} // Assuming 'photo' is available or provide a fallback
                alt={`${teammate.username}'s avatar`}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
              <p className="text-lg font-semibold text-gray-800">{teammate.username}</p>
              <div className="flex space-x-2 justify-center items-center">
                <button
                  onClick={() => handleDetailsClick(teammate._id)} // Pass _id to handleDetailsClick
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500"
                >
                  Details
                </button>
                <button
                  onClick={() => handleDeleteClick(teammate._id)} // Pass _id to handleDeleteClick
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
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Add User</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                axios.post('http://localhost:5000/user/register',{
                  username: formData.get("username"),
                  email: formData.get("email"),
                  password: formData.get("password"),
                  isAdmin: formData.get("isAdmin") === "true",
                })
                console.log(formData)
                console.log({
                  username: formData.get("username"),
                  email: formData.get("email"),
                  password: formData.get("password"),
                  isAdmin: formData.get("isAdmin") === "true",
                });
                closeModal();
              }}
              className="space-y-4"
            >
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
