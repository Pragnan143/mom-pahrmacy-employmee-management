import React, { useState } from "react";

const Teammates = () => {
  const [teammates, setTeammates] = useState([
    { id: 1, name: "John Doe", photo: "https://via.placeholder.com/50" },
    { id: 2, name: "Jane Smith", photo: "https://via.placeholder.com/50" },
    { id: 3, name: "Emily Johnson", photo: "https://via.placeholder.com/50" },
    { id: 4, name: "Michael Brown", photo: "https://via.placeholder.com/50" },
  ]);

  const [editMode, setEditMode] = useState(null);

  const [formData, setFormData] = useState({
    techLearning: "",
    nonTechLearning: "",
    remarks: "",
    date: new Date().toLocaleDateString(),
  });

  const handleEditClick = (id) => {
    const teammate = teammates.find((t) => t.id === id);
    setEditMode(teammate);
    setFormData({
      techLearning: "",
      nonTechLearning: "",
      remarks: "",
      date: new Date().toLocaleDateString(),
    });
  };

  const handleDeleteClick = (id) => {
    setTeammates((prev) => prev.filter((teammate) => teammate.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.techLearning.length < 60 ||
      formData.nonTechLearning.length < 30 ||
      formData.remarks.length < 10
    ) {
      alert("Please meet the minimum word requirements.");
      return;
    }
    setTeammates((prev) =>
      prev.map((teammate) =>
        teammate.id === editMode.id
          ? {
              ...teammate,
              techLearning: formData.techLearning,
              nonTechLearning: formData.nonTechLearning,
              remarks: formData.remarks,
            }
          : teammate
      )
    );
    setEditMode(null);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 ">
      {!editMode ? (
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
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-blue-600">
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
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Technological Learning:</label>
              <textarea
                name="techLearning"
                value={formData.techLearning}
                onChange={handleInputChange}
                placeholder="Minimum 60 words"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Non-Technological Learning:</label>
              <textarea
                name="nonTechLearning"
                value={formData.nonTechLearning}
                onChange={handleInputChange}
                placeholder="Minimum 30 words"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Remarks:</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Minimum 10 words"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date:</label>
              <input
                type="text"
                value={formData.date}
                readOnly
                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Teammates;
