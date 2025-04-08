import React, { useState } from "react";
import { FaPaperclip } from "react-icons/fa"; // Import file attach icon
import Header from "./header"; // Import the Header component

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    group: "",
    photo: null,
  });

  const [history, setHistory] = useState([]); // State to store the history of added candidates
  const [photoPreview, setPhotoPreview] = useState(null); // State to store the preview of the uploaded photo
  const [photoName, setPhotoName] = useState(""); // State to store the name of the uploaded photo

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file)); // Generate a preview URL for the uploaded photo
      setPhotoName(file.name); // Set the name of the uploaded photo
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Add the new candidate to the history
    setHistory([...history, formData]);

    // Reset the form
    setFormData({
      name: "",
      position: "",
      group: "",
      photo: null,
    });
    setPhotoPreview(null); // Reset the photo preview
    setPhotoName(""); // Reset the photo name
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Candidate Form */}
          <div className="bg-gray-300 p-6 rounded-lg shadow-md border border-gray-400">
            <h1 className="text-2xl font-semibold mb-6 text-center">Create Candidate</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-black rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter candidate's name"
                  required
                />
              </div>

              {/* Position Dropdown */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-black rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="" disabled>
                    Select a position
                  </option>
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                </select>
              </div>

              {/* Group Dropdown */}
              <div>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                  Group
                </label>
                <select
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-black rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="" disabled>
                    Select a group
                  </option>
                  <option value="CCS Student Council">CCS Student Council</option>
                  <option value="ELITES">ELITES</option>
                  <option value="SPECS">SPECS</option>
                  <option value="IMAGES">IMAGES</option>
                </select>
              </div>

              {/* Photo Upload */}
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="relative mt-1">
                  <label
                    htmlFor="photo"
                    className="flex items-center gap-2 cursor-pointer bg-white border border-black rounded-md shadow-sm px-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <FaPaperclip className="text-gray-500" />
                    <span className="text-sm text-gray-600">Upload Photo</span>
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden" // Hide the default file input
                    required
                  />
                </div>
                {photoName && (
                  <p className="mt-2 text-sm text-gray-600">Uploaded File: {photoName}</p>
                )}
                {photoPreview && (
                  <div className="mt-4">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* History Card */}
          <div className="bg-gray-300 p-6 rounded-lg shadow-md border border-gray-400">
            <h2 className="text-2xl font-semibold mb-6 text-center">History</h2>
            {history.length > 0 ? (
              <ul className="space-y-3">
                {history.map((candidate, index) => (
                  <li
                    key={index}
                    className="bg-white p-3 rounded-md shadow-sm border border-gray-300"
                  >
                    <p className="text-sm font-medium">Name: {candidate.name}</p>
                    <p className="text-sm font-medium">Position: {candidate.position}</p>
                    <p className="text-sm font-medium">Group: {candidate.group}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 text-center">No candidates added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;