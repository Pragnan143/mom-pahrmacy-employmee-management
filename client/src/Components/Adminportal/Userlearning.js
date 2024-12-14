import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';

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
        console.log(response.data.learnings);
      } catch (err) {
        setError('Failed to fetch user learning data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserLearning();
  }, [id]); // Re-run the effect when the id changes

  const handleDownloadPDF = () => {
    if (!userLearning) return;

    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('User Learning Summary', 10, 10);

    doc.setFontSize(12);
    doc.text('Technical Learnings:', 10, 20);
    doc.setFontSize(10);
    doc.text(userLearning.techLearnings || 'No technical description provided.', 10, 30, { maxWidth: 190 });

    doc.setFontSize(12);
    doc.text('Non-Technical Learnings:', 10, 50);
    doc.setFontSize(10);
    doc.text(userLearning.nonTechLearnings || 'No non-technical description provided.', 10, 60, { maxWidth: 190 });

    doc.setFontSize(12);
    doc.text('Remarks:', 10, 80);
    doc.setFontSize(10);
    doc.text(userLearning.remarks || 'No Remarks provided.', 10, 90, { maxWidth: 190 });

    doc.setFontSize(12);
    doc.text(`Date Added: ${new Date(userLearning.dateAdded).toLocaleDateString()}`, 10, 120);

    // Save the PDF
    doc.save('UserLearning.pdf');
  };

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
          <p className="text-gray-700">
            {userLearning.techLearnings || 'No technical description provided.'}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg text-gray-800">Non-Technical Description</h1>
          <p className="text-gray-700">
            {userLearning.nonTechLearnings || 'No non-technical description provided.'}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg text-gray-800">Remarks </h1>
          <p className="text-gray-700">
            {userLearning.remarks || 'No Remarks Found.'}
          </p>
        </div>
      </div>

      <div className="w-full px-10 flex items-center justify-end gap-6 pt-5">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
        >
          Download PDF
        </button>
        <button
          type="button"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
        >
          Review
        </button>
        <p className="text-lg text-gray-900">{new Date(userLearning.dateAdded).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserLearning;
