import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UserLearning = () => {
  const { id } = useParams(); // Extract the user ID from URL parameters
  const [userLearning, setUserLearning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDateData, setSelectedDateData] = useState(null);

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

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10;
    let y = 10;

    const addSection = (title, content) => {
        // Add bold title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 10, y);
        y += lineHeight;

        // Add content with word wrapping
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(content, 180);
        lines.forEach((line) => {
            if (y + lineHeight > pageHeight - 10) {
                doc.addPage();
                y = 10; // Reset to top of new page
            }
            doc.text(line, 10, y);
            y += lineHeight;
        });

        // Add spacing after the section
        y += lineHeight;
    };

    // Add User Learning Summary Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('User Learning Summary', 10, y);
    y += lineHeight * 2;

    // Add Technical Learnings
    addSection(
        'Technical Learnings:',
        userLearning.techLearnings || 'No technical description provided.'
    );

    // Add Non-Technical Learnings
    addSection(
        'Non-Technical Learnings:',
        userLearning.nonTechLearnings || 'No non-technical description provided.'
    );

    // Add Remarks
    addSection('Remarks:', userLearning.remarks || 'No remarks provided.');

    // Add Date
    if (y + lineHeight > pageHeight - 10) {
        doc.addPage();
        y = 10;
    }
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(
        `Date Added: ${new Date(userLearning.dateAdded).toLocaleDateString()}`,
        10,
        y
    );

    // Save the PDF
    doc.save('UserLearning.pdf');
  };

  const handleDateChange = (date) => {
    setCalendarDate(date);

    // Filter user learning data for the selected date
    // if (userLearning) {
    //   const filteredData = userLearning.submissions?.find(
    //     (entry) => new Date(entry.dateAdded).toDateString() === date.toDateString()
    //   );
      // setSelectedDateData(filteredData || null);
      console.log(calendarDate.toISOString().split('T')[0])
      
  }
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 sm:p-10 lg:p-16 max-w-7xl mx-auto bg-teal-50 rounded-lg shadow-lg my-16 flex gap-8">
      {/* Calendar Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-12">
        <div className='flex flex-col gap-8 justify-center'>
        <h2 className="font-semibold text-lg text-gray-800 mb-4">Search Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={calendarDate}
          className="react-calendar"
        />
        </div>
        {!selectedDateData ? (
         <div className="bg-white p-6 rounded-lg shadow-md">
         <div className="flex flex-col gap-8">
           <div className="flex flex-col gap-3">
             <h1 className="font-semibold text-lg text-gray-800">Technical Learnings</h1>
             <p className="text-gray-700">
               {userLearning.techLearnings || 'No technical description provided.'}
             </p>
           </div>
 
           <div className="flex flex-col gap-3">
             <h1 className="font-semibold text-lg text-gray-800">Non-Technical Learnings</h1>
             <p className="text-gray-700">
               {userLearning.nonTechLearnings || 'No non-technical description provided.'}
             </p>
           </div>
 
           <div className="flex flex-col gap-3">
             <h1 className="font-semibold text-lg text-gray-800">Remarks</h1>
             <p className="text-gray-700">
               {userLearning.remarks || 'No Remarks Found.'}
             </p>
           </div>
         </div>
 
         <div className="w-full flex items-center justify-end gap-6 pt-5">
           <button
             type="button"
             onClick={handleDownloadPDF}
             className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
           >
             Download PDF
           </button>
           <p className="text-lg text-gray-900">{new Date(userLearning.dateAdded).toLocaleDateString()}</p>
         </div>
       </div>
        ) : (
          <p className="text-gray-700 mt-4">No data submitted on this date.</p>
        )}
      </div>

      {/* Learning Details Section */}
      
    </div>
  );
};

export default UserLearning;