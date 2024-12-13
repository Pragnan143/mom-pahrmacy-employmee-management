import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserLearning = () => {
  const { id } = useParams(); // Extract the user ID from URL parameters
  const [userLearning, setUserLearning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserLearning = async () => {
      try {
        // Fetch user learning data from the server
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setUserLearning(response.data.learnings);
        console.log(response.data.learnings)
      } catch (err) {
        setError("Failed to fetch user learning data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserLearning();
  }, [id]); // Re-run the effect when the id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userLearning) {
    return <div>No learning data found for this user.</div>;
  }

  return (
    <div className="p-6 sm:p-10 lg:p-16 max-w-4xl mx-auto bg-teal-50 rounded-lg shadow-lg my-16">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg text-gray-800">Technical Learnings</h1>
          <p className="p-3 h-36 sm:h-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out">
            {userLearning.techLearnings}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg text-gray-800">Non-Technical Description</h1>
          <p className="p-3 h-36 sm:h-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out">
            {userLearning.nonTechLearnings}
          </p>
        </div>
      </div>

      <div className="w-full px-10 flex items-center justify-end gap-6 pt-5">
        <button
          type="submit"
          className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
        >
          Get Pdf
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
        >
          Review
        </button>
        <p className="text-lg text-gray-900 ">{new Date(userLearning.dateAdded).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserLearning;
