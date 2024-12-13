import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Teammates = () => {
  const navigate=useNavigate();
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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
        console.log(response.data.users)

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
    navigate(`/employee-details/${id}`); // Include the user id in the URL
    console.log(id)
  };
  

  const handleDeleteClick = (id) => {
    setTeammates((prev) => prev.filter((teammate) => teammate.id !== id));
  };

  
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 ">
        <div className="text-center space-y-10" >
          <h2 className="text-4xl font-medium text-gray-600 mb-6 ">Hi There This is your team</h2>
          {loading && <p>Loading...</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
                  onClick={() => handleDetailsClick(teammate._id)} // Pass _id to handleEditClick
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
        {
          
        }
    </div>
  );
};

export default Teammates;
