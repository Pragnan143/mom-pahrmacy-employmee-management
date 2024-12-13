import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Teammates = () => {
  const navigate=useNavigate();
  const [teammates, setTeammates] = useState([
    { id: 1, name: "John Doe", photo: "https://via.placeholder.com/50" },
    { id: 2, name: "Jane Smith", photo: "https://via.placeholder.com/50" },
    { id: 3, name: "Emily Johnson", photo: "https://via.placeholder.com/50" },
    { id: 4, name: "Michael Brown", photo: "https://via.placeholder.com/50" },
  ]);

  // const [editMode, setEditMode] = useState(null);

  // const [formData, setFormData] = useState({
  //   techLearning: "",
  //   nonTechLearning: "",
  //   remarks: "",
  //   date: new Date().toLocaleDateString(),
  // });

  const handleEditClick = (id) => {
    // const teammate = teammates.find((t) => t.id === id)

    navigate('/employee-details/')
  };

  const handleDeleteClick = (id) => {
    setTeammates((prev) => prev.filter((teammate) => teammate.id !== id));
  };

  
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 ">
        <div className="text-center space-y-10" >
          <h2 className="text-4xl font-medium text-gray-600 mb-6 ">Hi There This is your team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {teammates.map((teammate) => (
              <div
                key={teammate.id}
                className="bg-white shadow-md rounded-lg p-4 flex  gap-6 justify-center items-center">
                <img
                  src={teammate.photo}
                  alt={`${teammate.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <p className="text-lg font-semibold text-gray-800">{teammate.name}</p>
                <div className="flex space-x-2 justify-center item-center">
                  <button
                    onClick={() => handleEditClick(teammate.id)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500">
                    Details
                  </button>
                  <button
                    onClick={() => handleDeleteClick(teammate.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
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
