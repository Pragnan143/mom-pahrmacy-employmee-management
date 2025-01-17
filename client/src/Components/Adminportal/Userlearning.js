import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const UserLearning = () => {
  const { id } = useParams(); // Extract the user ID from URL parameters
  const [userLearning, setUserLearning] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDateData, setSelectedDateData] = useState(null);

  useEffect(() => {
    const fetchUserLearning = async () => {
      try {
        const response = await axios.get(
          `https://mom-pahrmacy-employmee-management.onrender.com/user/${id}`
        );
        setUserLearning(response.data.learnings);
      } catch (err) {
        setError("Failed to fetch user learning data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserLearning();
  }, [id]);

  useEffect(() => {
    if (userLearning.length > 0) {
      const selectedDateString = calendarDate.toLocaleDateString("en-CA"); // YYYY-MM-DD format in local timezone

      const filteredData = userLearning.filter((learning) => {
        const learningDate = new Date(learning.dateAdded).toLocaleDateString(
          "en-CA"
        );
        return learningDate === selectedDateString;
      });

      setSelectedDateData(filteredData.length > 0 ? filteredData[0] : null);
    }
  }, [calendarDate, userLearning]);

  const handleDownloadPDF = () => {
    if (!selectedDateData) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10;
    let y = 10;

    const addSection = (title, content) => {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, y);
      y += lineHeight;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(content, 180);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, 10, y);
        y += lineHeight;
      });

      y += lineHeight;
    };

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("User Learning Summary", 10, y);
    y += lineHeight * 2;

    addSection(
      "Technical Learnings:",
      selectedDateData.techLearnings || "No technical description provided."
    );
    addSection(
      "Non-Technical Learnings:",
      selectedDateData.nonTechLearnings ||
        "No non-technical description provided."
    );
    addSection("Remarks:", selectedDateData.remarks || "No remarks provided.");
    addSection(
      "Extra Curricular Activities:",
      selectedDateData.extras || "No Inputs provided."
    );
    addSection(
      "Post on linkedin:",
      selectedDateData.linkedinPost || "No Inputs"
    );

    if (y + lineHeight > pageHeight - 10) {
      doc.addPage();
      y = 10;
    }
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Date Added: ${new Date(
        selectedDateData.dateAdded
      ).toLocaleDateString()}`,
      10,
      y
    );

    doc.save("UserLearning.pdf");
  };

  const handleDateChange = (date) => {
    const normalizedDate = new Date(date);
    setCalendarDate(normalizedDate);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 sm:p-10 lg:p-16 max-w-7xl mx-auto bg-teal-50 rounded-lg shadow-lg my-16 flex gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-12 sticky justify-center">
        <div className="flex flex-col gap-8 justify-center">
          <h2 className="font-semibold text-lg text-gray-800 mb-4">
            Search Calendar
          </h2>
          <Calendar
            onChange={handleDateChange}
            value={calendarDate}
            className="react-calendar"
          />
        </div>

        {selectedDateData ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-lg text-gray-800">
                  Technical Learnings
                </h1>
                <p className="text-gray-700">
                  {selectedDateData.techLearnings ||
                    "No technical description provided."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-lg text-gray-800">
                  Non-Technical Learnings
                </h1>
                <p className="text-gray-700">
                  {selectedDateData.nonTechLearnings ||
                    "No non-technical description provided."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-lg text-gray-800">Remarks</h1>
                <p className="text-gray-700">
                  {selectedDateData.remarks || "No remarks provided."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-lg text-gray-800">
                  Extra Curricular
                </h1>
                <p className="text-gray-700">
                  {selectedDateData.extras || "No inputs provided."}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-lg text-gray-800">events </h1>
                <p className="text-gray-700">
                  {selectedDateData.events || "No inputs provided."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-lg text-gray-800">
                  Posted on LinkedIn?
                </h1>
                <p className="text-gray-700">
                  {selectedDateData.linkedinPost ? "Yes " : "NO "}
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
              <p className="text-lg text-gray-900">
                {new Date(selectedDateData.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>No data found for the selected date.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLearning;
