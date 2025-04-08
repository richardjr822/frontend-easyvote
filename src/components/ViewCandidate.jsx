import React, { useState } from "react";
import Header from "./header";
import { FaSearch, FaPaperclip, FaSort, FaFilter, FaEdit, FaTrashAlt, FaUserEdit, FaImage } from "react-icons/fa";

const ViewCandidate = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", position: "President", group: "CCS Student Council", photo: "john_doe.jpg" },
    { id: 2, name: "Jane Smith", position: "Vice President", group: "ELITES", photo: "jane_smith.jpg" },
    { id: 3, name: "Alice Johnson", position: "Secretary", group: "SPECS", photo: "alice_johnson.jpg" },
    { id: 4, name: "Bob Brown", position: "Treasurer", group: "IMAGES", photo: "bob_brown.jpg" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("id");

  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState("");

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredCandidates(
      candidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(term) ||
          candidate.position.toLowerCase().includes(term) ||
          candidate.group.toLowerCase().includes(term)
      )
    );
  };

  // Handle column-based sorting
  const handleSort = (key) => {
    // Toggle sort direction if clicking the same column
    const newDirection = key === activeSortField && sortDirection === "asc" ? "desc" : "asc";
    setActiveSortField(key);
    setSortDirection(newDirection);
    
    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
      if (newDirection === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      } else {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
      }
      return 0;
    });
    setFilteredCandidates(sortedCandidates);
  };

  // Handle delete action
  const handleDelete = (id) => {
    const updatedCandidates = candidates.filter((candidate) => candidate.id !== id);
    setCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);
  };

  // Handle update action - open modal with candidate data
  const handleUpdate = (id) => {
    const candidate = candidates.find((c) => c.id === id);
    if (candidate) {
      setCurrentCandidate({ ...candidate });
      setPhotoName(candidate.photo);
      setIsUpdateModalOpen(true);
    }
  };

  // Handle input change in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCandidate({ ...currentCandidate, [name]: value });
  };

  // Handle photo change in the update form
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentCandidate({ ...currentCandidate, photo: file.name });
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoName(file.name);
    }
  };

  // Submit updated candidate
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    // Update the candidate in the list
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === currentCandidate.id ? currentCandidate : candidate
    );
    
    setCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);
    
    // Close modal and reset states
    setIsUpdateModalOpen(false);
    setCurrentCandidate(null);
    setPhotoPreview(null);
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentCandidate(null);
    setPhotoPreview(null);
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5 mt-5">
        {/* Page Title and Search Bar */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaUserEdit className="text-3xl text-orange-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Manage Candidates</h1>
            </div>
            <div className="relative w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-orange-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search candidates..."
                className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-gray-600 flex items-center justify-between">
          <span>
            Showing {filteredCandidates.length} of {candidates.length} candidates
          </span>
          <div className="flex items-center">
            <FaFilter className="mr-2 text-orange-600" />
            <span>Filter by: </span>
            <button 
              className={`ml-2 px-3 py-1 rounded-md transition-colors ${activeSortField === 'id' ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => handleSort("id")}
            >
              ID
            </button>
            <button 
              className={`ml-2 px-3 py-1 rounded-md transition-colors ${activeSortField === 'name' ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => handleSort("name")}
            >
              Name
            </button>
            <button 
              className={`ml-2 px-3 py-1 rounded-md transition-colors ${activeSortField === 'position' ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => handleSort("position")}
            >
              Position
            </button>
            <button 
              className={`ml-2 px-3 py-1 rounded-md transition-colors ${activeSortField === 'group' ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => handleSort("group")}
            >
              Group
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-orange-50 to-gray-100">
              <tr>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors flex items-center"
                  onClick={() => handleSort("id")}
                >
                  <span>ID</span>
                  <FaSort className={`ml-2 text-xs ${activeSortField === 'id' ? 'text-orange-600' : 'text-gray-400'}`} />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    <span>Name</span>
                    <FaSort className={`ml-2 text-xs ${activeSortField === 'name' ? 'text-orange-600' : 'text-gray-400'}`} />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => handleSort("position")}
                >
                  <div className="flex items-center">
                    <span>Position</span>
                    <FaSort className={`ml-2 text-xs ${activeSortField === 'position' ? 'text-orange-600' : 'text-gray-400'}`} />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => handleSort("group")}
                >
                  <div className="flex items-center">
                    <span>Group</span>
                    <FaSort className={`ml-2 text-xs ${activeSortField === 'group' ? 'text-orange-600' : 'text-gray-400'}`} />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {candidate.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{candidate.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {candidate.group}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaImage className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{candidate.photo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center"
                        onClick={() => handleUpdate(candidate.id)}
                      >
                        <FaEdit className="mr-2" />
                        <span>Update</span>
                      </button>
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center"
                        onClick={() => handleDelete(candidate.id)}
                      >
                        <FaTrashAlt className="mr-2" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <FaSearch className="text-gray-400 text-4xl mb-3" />
                      <p className="text-gray-500 text-lg">No candidates found matching your search.</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && currentCandidate && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-xl p-8 w-[90%] max-w-[600px] relative z-10 border-t-4 border-orange-600">
            <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
              <div className="flex items-center">
                <FaUserEdit className="text-orange-600 text-2xl mr-3" />
                <h5 className="text-xl font-bold text-gray-800">Update Candidate</h5>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                onClick={closeUpdateModal}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentCandidate.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              {/* Position Dropdown */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  id="position"
                  name="position"
                  value={currentCandidate.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                >
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                </select>
              </div>

              {/* Group Dropdown */}
              <div>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                  Group
                </label>
                <select
                  id="group"
                  name="group"
                  value={currentCandidate.group}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                >
                  <option value="CCS Student Council">CCS Student Council</option>
                  <option value="ELITES">ELITES</option>
                  <option value="SPECS">SPECS</option>
                  <option value="IMAGES">IMAGES</option>
                </select>
              </div>

              {/* Photo Upload */}
              <div>
                <label htmlFor="updatePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="updatePhoto"
                    className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm px-4 py-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  >
                    <FaPaperclip className="text-orange-500" />
                    <span className="text-sm text-gray-700">Upload New Photo</span>
                  </label>
                  <input
                    type="file"
                    id="updatePhoto"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
                
                <div className="mt-4 flex items-center">
                  {photoName && (
                    <div className="text-sm text-gray-700 flex items-center">
                      <FaImage className="text-gray-400 mr-2" />
                      <span>{photoName}</span>
                    </div>
                  )}
                </div>
                
                {photoPreview && (
                  <div className="mt-4">
                    <div className="w-32 h-32 rounded-lg border-2 border-orange-200 overflow-hidden">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCandidate;