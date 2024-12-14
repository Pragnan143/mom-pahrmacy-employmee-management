import React, { useState } from 'react';
import axios from 'axios';

const EmployeeLearnings = () => {
  const [techDescription, setTechDescription] = useState('');
  const [nonTechDescription, setNonTechDescription] = useState('');
  const [reviewOrSuggestion, setReviewOrSuggestion] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the word count for technical and non-technical descriptions
    if (!isEditable) {
      if (techDescription.split(' ').length < 30 || nonTechDescription.split(' ').length < 30) {
        alert('Both descriptions must contain at least 30 words');
        return;
      }
    }

    const learnings = {
      techLearnings: techDescription,
      nonTechLearnings: nonTechDescription,
      remarks: reviewOrSuggestion,
    };

    const user = sessionStorage.getItem('user');
    const _id = JSON.parse(user)._id;

    try {
      const response = await axios.post(
        'http://localhost:5000/user/add-learnings',
        { learnings, _id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      console.log('Success:', response.data);

      // Update submitted data state
      setSubmittedData({
        techDescription,
        nonTechDescription,
        reviewOrSuggestion,
      });

      if (isEditable) {
        alert('Data edited successfully!');
      }

      // Toggle editability based on submission state
      setIsEditable(!isEditable);
      setHasEdited(isEditable); // Only lock editing after a successful edit
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  return (
    <div className="flex gap-10 max-w-6xl mx-auto my-16 p-6">
      {/* Left Section - Display Submitted Data */}
      <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Submitted Data</h2>

        {submittedData ? (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Technical Description</h3>
              <p className="text-gray-600">{submittedData.techDescription || 'No description provided.'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Non-Technical Description</h3>
              <p className="text-gray-600">{submittedData.nonTechDescription || 'No description provided.'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Review / Complaint / Suggestion</h3>
              <p className="text-gray-600">{submittedData.reviewOrSuggestion || 'No review or suggestion provided.'}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No data submitted yet.</p>
        )}
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg">
        <form className="flex flex-col gap-6">
          {/* Technical Description */}
          <div>
            <label htmlFor="techDescription" className="block font-semibold text-lg text-gray-800">
              Technical Description <span className="text-sm text-gray-500">(minimum 30 words)</span>
            </label>
            <textarea
              id="techDescription"
              className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={techDescription}
              onChange={(e) => setTechDescription(e.target.value)}
              placeholder="Enter technical description..."
              readOnly={hasEdited} // Disable editing after submission
            />
            {techDescription && techDescription.split(' ').length < 30 && !submittedData && (
              <p className="text-red-600 text-sm">{`Need ${30 - techDescription.split(' ').length} more words`}</p>
            )}
          </div>

          {/* Non-Technical Description */}
          <div>
            <label htmlFor="nonTechDescription" className="block font-semibold text-lg text-gray-800">
              Non-Technical Description <span className="text-sm text-gray-500">(minimum 30 words)</span>
            </label>
            <textarea
              id="nonTechDescription"
              className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={nonTechDescription}
              onChange={(e) => setNonTechDescription(e.target.value)}
              placeholder="Enter non-technical description..."
              readOnly={hasEdited} // Disable editing after submission
            />
            {nonTechDescription && nonTechDescription.split(' ').length < 30 && !submittedData && (
              <p className="text-red-600 text-sm">{`Need ${30 - nonTechDescription.split(' ').length} more words`}</p>
            )}
          </div>

          {/* Review or Suggestion */}
          <div>
            <label htmlFor="reviewOrSuggestion" className="block font-semibold text-lg text-gray-800">
              Review / Complaint / Suggestion
            </label>
            <textarea
              id="reviewOrSuggestion"
              className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={reviewOrSuggestion}
              onChange={(e) => setReviewOrSuggestion(e.target.value)}
              placeholder="Enter your review, complaint, or suggestion..."
              readOnly={hasEdited} // Disable editing after submission
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`px-6 py-3 ${hasEdited ? 'bg-gray-400' : 'bg-teal-500 hover:bg-teal-600'} text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition`}
            disabled={hasEdited}
            onClick={handleSubmit}
          >
            {isEditable ? 'Edit' : hasEdited ? 'Edit Disabled' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLearnings;
