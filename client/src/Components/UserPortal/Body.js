import React, { useState } from "react";
import axios from "axios";

const EmployeeLearnings = () => {
  const [techDescription, setTechDescription] = useState("");
  const [nonTechDescription, setNonTechDescription] = useState("");
  const [reviewOrSuggestion, setReviewOrSuggestion] = useState("");
  const [extras, setExtras] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [linkedinPost, setLinkedinPost] = useState(false);
  const [events, setEvents] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditable) {
      if (
        techDescription.split(" ").length < 30 ||
        nonTechDescription.split(" ").length < 30
      ) {
        alert("Both descriptions must contain at least 30 words");
        return;
      }
    }

    const learnings = {
      techLearnings: techDescription,
      nonTechLearnings: nonTechDescription,
      remarks: reviewOrSuggestion,
      extras: extras,
      linkedinPost: linkedinPost,
      events,
    };
    const user = sessionStorage.getItem("user");
    const _id = JSON.parse(user)._id;

    try {
      const response = await axios.post(
        "https://mom-pahrmacy-employmee-management.onrender.com/user/add-learnings",
        { learnings, _id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      console.log("Success:", response.data);

      setSubmittedData({
        techDescription,
        nonTechDescription,
        reviewOrSuggestion,
        extras,
        linkedinPost,
        events,
      });
      if (isEditable) {
        alert("Data edited successfully!");
      }

      setIsEditable(!isEditable);
      setHasEdited(isEditable);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };
  console.log(submittedData);

  return (
    <div className="flex gap-10 max-w-6xl mx-auto my-16 p-6">
      <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Submitted Data
        </h2>

        {submittedData ? (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">
                Technical Description
              </h3>
              <p className="text-gray-600">
                {submittedData.techDescription || "No description provided."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">
                Non-Technical Description
              </h3>
              <p className="text-gray-600">
                {submittedData.nonTechDescription || "No description provided."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">
                Review / Complaint / Suggestion
              </h3>
              <p className="text-gray-600">
                {submittedData.reviewOrSuggestion ||
                  "No review or suggestion provided."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">
                Extra Curricular Activities{" "}
              </h3>
              <p className="text-gray-600">
                {submittedData.extras || "No Inputs provided."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">
                Posted on LinkedIn
              </h3>
              <p className="text-gray-600">
                {submittedData.linkedinPost === true ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No data submitted yet.</p>
        )}
      </div>

      <div className="w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg">
        <form className="flex flex-col gap-6">
          {/* Technical Description */}
          <div>
            <label
              htmlFor="techDescription"
              className="block font-semibold text-lg text-gray-800"
            >
              Technical Description{" "}
              <span className="text-sm text-gray-500">(minimum 30 words)</span>
            </label>
            <textarea
              id="techDescription"
              className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={techDescription}
              onChange={(e) => setTechDescription(e.target.value)}
              placeholder="Enter technical description..."
              readOnly={hasEdited} // Disable editing after submission
            />
            {techDescription &&
              techDescription.split(" ").length < 30 &&
              !submittedData && (
                <p className="text-red-600 text-sm">{`Need ${
                  30 - techDescription.split(" ").length
                } more words`}</p>
              )}
          </div>

          {/* Non-Technical Description */}
          <div>
            <label
              htmlFor="nonTechDescription"
              className="block font-semibold text-lg text-gray-800"
            >
              Non-Technical Description{" "}
              <span className="text-sm text-gray-500">(minimum 30 words)</span>
            </label>
            <textarea
              id="nonTechDescription"
              className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={nonTechDescription}
              onChange={(e) => setNonTechDescription(e.target.value)}
              placeholder="Enter non-technical description..."
              readOnly={hasEdited} // Disable editing after submission
            />
            {nonTechDescription &&
              nonTechDescription.split(" ").length < 30 &&
              !submittedData && (
                <p className="text-red-600 text-sm">{`Need ${
                  30 - nonTechDescription.split(" ").length
                } more words`}</p>
              )}
          </div>

          {/* Review or Suggestion */}
          <div>
            <label
              htmlFor="reviewOrSuggestion"
              className="block font-semibold text-lg text-gray-800"
            >
              Review / Complaint / Suggestion
            </label>
            <textarea
              id="reviewOrSuggestion"
              className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={reviewOrSuggestion}
              onChange={(e) => setReviewOrSuggestion(e.target.value)}
              placeholder="Please specify about which content you are placing here"
              readOnly={hasEdited}
            />
          </div>

          {/*Extra Carricular Activities*/}
          <div>
            <label
              className="block font-semibold text-lg text-gray-800"
              htmlFor="ExtraCurricular"
            >
              Yoga / Exercise / Book Reading
            </label>
            <textarea
              id="ExtraCurricular"
              className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={extras}
              onChange={(e) => setExtras(e.target.value)}
              placeholder="Please specify about which content you are placing here"
              readOnly={hasEdited}
            />
          </div>

          {/*Events Section*/}
          <div>
            <label
              className="block font-semibold text-lg text-gray-800"
              htmlFor="Events"
            >
              Did you found any interesting events ?<br />
              If
            </label>
            <textarea
              id="Events"
              className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
              value={extras}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="Please specify about which content you are placing here"
              readOnly={hasEdited}
            />
          </div>

          {/* LinkedIn Post Section */}
          <div>
            <label className="block font-semibold text-lg text-gray-800">
              Posted on LinkedIn?
            </label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="linkedinPost"
                  value="true"
                  checked={linkedinPost === true}
                  onChange={() => setLinkedinPost(true)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="linkedinPost"
                  value="false"
                  checked={linkedinPost === false}
                  onChange={() => setLinkedinPost(false)}
                />
                No
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`px-6 py-3 ${
              hasEdited ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
            } text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition`}
            disabled={hasEdited}
            onClick={handleSubmit}
          >
            {isEditable ? "Edit" : hasEdited ? "Edit Disabled" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLearnings;
