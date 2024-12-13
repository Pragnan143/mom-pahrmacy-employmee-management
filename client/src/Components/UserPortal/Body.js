import React, { useState } from 'react';

const Body = () => {
  const [techDescription, setTechDescription] = useState('');
  const [nonTechDescription, setNonTechDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (techDescription.split(' ').length < 60 || nonTechDescription.split(' ').length < 60) {
      alert('Both descriptions must contain at least 60 words');
      return;
    }

    console.log('Form submitted:', { techDescription, nonTechDescription });
  };

  return (
    <div className="p-6 sm:p-10 lg:p-16 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg my-16">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="techDescription" className="font-semibold text-lg text-gray-800">
            Technical Description <span className="text-sm text-gray-500">(minimum 60 words)</span>
          </label>
          <textarea
            id="techDescription"
            className="p-3 h-36 sm:h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition duration-200 ease-in-out"
            value={techDescription}
            onChange={(e) => setTechDescription(e.target.value)}
            placeholder="Enter technical description..."
          />
          {techDescription && techDescription.split(' ').length < 60 && (
            <span className="text-red-600 text-sm font-medium">
              {`Need ${60 - techDescription.split(' ').length} more words`}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="nonTechDescription" className="font-semibold text-lg text-gray-800">
            Non-Technical Description <span className="text-sm text-gray-500">(minimum 60 words)</span>
          </label>
          <textarea
            id="nonTechDescription"
            className="p-3 h-36 sm:h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition duration-200 ease-in-out"
            value={nonTechDescription}
            onChange={(e) => setNonTechDescription(e.target.value)}
            placeholder="Enter non-technical description..."
          />
          {nonTechDescription && nonTechDescription.split(' ').length < 60 && (
            <span className="text-red-600 text-sm font-medium">
              {`Need ${60 - nonTechDescription.split(' ').length} more words`}
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

export default Body;