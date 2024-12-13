import React, { useState } from 'react';
import axios from "axios"; 

const EmployeeLearnings = () => {
  const [techDescription, setTechDescription] = useState('');
  const [nonTechDescription, setNonTechDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the word count for both descriptions
    if (techDescription.split(' ').length < 30 || nonTechDescription.split(' ').length < 30) {
      alert('Both descriptions must contain at least 30 words');
      return;
    }
  
    // Data to be sent to the server
    const learnings={
      techLearnings:techDescription,
      nonTechLearnings:nonTechDescription
    }
    
    const user=sessionStorage.getItem('user')
    const _id=JSON.parse(user)._id
    console.log(learnings,_id);
    
    try {
      // Make a POST request to the backend API using axios
      const response = await axios.post(
        'http://localhost:5000/user/add-learnings', 
        {
         learnings,_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Example using token from localStorage
          }
        }
      );
  
      console.log('Success:', response.data);
      alert('Learning data submitted successfully!');
    } catch (error) {
      if (error.response) {
        // Server responded with a non-2xx status
        console.error('Error response:', error.response.data);
        alert('There was an error submitting your data.');
      } else if (error.request) {
        // No response received
        console.error('Error request:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        // Other errors
        console.error('Error:', error.message);
        alert('Error submitting the form. Please try again later.');
      }
    }
  };
  

  return (
    <div className="p-6 sm:p-10 lg:p-16 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg my-16">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="techDescription" className="font-semibold text-lg text-gray-800">
            Technical Description <span className="text-sm text-gray-500">(minimum 30 words)</span>
          </label>
          <textarea
            id="techDescription"
            className="p-3 h-36 sm:h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition duration-200 ease-in-out"
            value={techDescription}
            onChange={(e) => setTechDescription(e.target.value)}
            placeholder="Enter technical description..."
          />
          {techDescription && techDescription.split(' ').length < 30 && (
            <span className="text-red-600 text-sm font-medium">
              {`Need ${30 - techDescription.split(' ').length} more words`}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="nonTechDescription" className="font-semibold text-lg text-gray-800">
            Non-Technical Description <span className="text-sm text-gray-500">(minimum 30 words)</span>
          </label>
          <textarea
            id="nonTechDescription"
            className="p-3 h-36 sm:h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition duration-200 ease-in-out"
            value={nonTechDescription}
            onChange={(e) => setNonTechDescription(e.target.value)}
            placeholder="Enter non-technical description..."
          />
          {nonTechDescription && nonTechDescription.split(' ').length < 30 && (
            <span className="text-red-600 text-sm font-medium">
              {`Need ${30 - nonTechDescription.split(' ').length} more words`}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeLearnings;
