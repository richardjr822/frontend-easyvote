import React, { useState, useEffect, useMemo } from "react";
import Header from "./header";
import { 
  FaSearch, FaPaperclip, FaSort, FaFilter, FaEdit, FaTrashAlt, 
  FaUserEdit, FaImage, FaArchive, FaCheckCircle, FaTimes, 
  FaEye, FaChevronLeft, FaChevronRight, FaExclamationTriangle
} from "react-icons/fa";

const ViewCandidate = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", position: "President", group: "CCS Student Council", photo: "john_doe.jpg" },
    { id: 2, name: "Jane Smith", position: "Vice President", group: "ELITES", photo: "jane_smith.jpg" },
    { id: 3, name: "Alice Johnson", position: "Secretary", group: "SPECS", photo: "alice_johnson.jpg" },
    { id: 4, name: "Bob Brown", position: "Treasurer", group: "IMAGES", photo: "bob_brown.jpg" },
    { id: 5, name: "Carlos Rodriguez", position: "Auditor", group: "CCS Student Council", photo: "carlos.jpg" },
    { id: 6, name: "Diana Mitchell", position: "Secretary", group: "ELITES", photo: "diana.jpg" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("id");
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  
  // State for modals
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState("");
  
  // Toast notifications
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // success, error, info
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter by group
  const [groupFilter, setGroupFilter] = useState("All");
  
  // Calculate filtered candidates with memoization for better performance
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      // Apply search filter
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.group.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply group filter
      const matchesGroup = groupFilter === "All" || candidate.group === groupFilter;
      
      return matchesSearch && matchesGroup;
    });
  }, [candidates, searchTerm, groupFilter]);
  
  // Sort candidates
  const sortedCandidates = useMemo(() => {
    return [...filteredCandidates].sort((a, b) => {
      if (sortDirection === "asc") {
        if (a[activeSortField] < b[activeSortField]) return -1;
        if (a[activeSortField] > b[activeSortField]) return 1;
      } else {
        if (a[activeSortField] > b[activeSortField]) return -1;
        if (a[activeSortField] < b[activeSortField]) return 1;
      }
      return 0;
    });
  }, [filteredCandidates, activeSortField, sortDirection]);
  
  // Get paginated candidates
  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCandidates.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCandidates, currentPage, itemsPerPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedCandidates.length / itemsPerPage);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle column-based sorting
  const handleSort = (key) => {
    const newDirection = key === activeSortField && sortDirection === "asc" ? "desc" : "asc";
    setActiveSortField(key);
    setSortDirection(newDirection);
  };

  // Handle group filter
  const handleGroupFilter = (group) => {
    setGroupFilter(group);
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Handle view candidate
  const handleView = (id) => {
    const candidate = candidates.find((c) => c.id === id);
    if (candidate) {
      setCurrentCandidate({ ...candidate });
      setIsViewModalOpen(true);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (id) => {
    setCandidateToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  // Handle delete action
  const handleDelete = () => {
    const updatedCandidates = candidates.filter((candidate) => candidate.id !== candidateToDelete);
    setCandidates(updatedCandidates);
    setIsDeleteConfirmOpen(false);
    
    // Show success toast
    setToastType("success");
    setToastMessage("Candidate deleted successfully!");
    setShowSuccessToast(true);
    
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
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

  // Handle archive all confirmation
  const handleArchiveAllConfirm = () => {
    setIsArchiveConfirmOpen(true);
  };

  // Handle archive all action
  const handleArchiveAll = () => {
    // Here you would typically send a request to your backend to archive all candidates
    console.log("Archiving all candidates:", candidates);
    
    // For demo purposes, we'll just clear the list
    setCandidates([]);
    setIsArchiveConfirmOpen(false);
    
    // Show success toast
    setToastType("success");
    setToastMessage("All candidates have been archived successfully!");
    setShowSuccessToast(true);
    
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
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
    
    // Close modal and reset states
    setIsUpdateModalOpen(false);
    setCurrentCandidate(null);
    setPhotoPreview(null);
    
    // Show success toast
    setToastType("success");
    setToastMessage("Candidate updated successfully!");
    setShowSuccessToast(true);
    
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  // Close modals
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentCandidate(null);
    setPhotoPreview(null);
  };
  
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentCandidate(null);
  };

  // Get unique groups for filter dropdown
  const uniqueGroups = useMemo(() => {
    return ["All", ...new Set(candidates.map(candidate => candidate.group))];
  }, [candidates]);

  // Mock photo URLs for demo
  const getPhotoUrl = (filename) => {
    // In a real app, this would be a path to your images
    return `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5 mt-5">
        {/* Page Title and Search/Actions Bar */}
        <div className="bg-gradient-to-r from-orange-50 to-gray-50 p-6 rounded-xl shadow-md border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg mr-3 shadow-sm">
                <FaUserEdit className="text-2xl text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Candidates</h1>
                <p className="text-sm text-gray-500 mt-1">View, edit, and manage election candidates</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-orange-500" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search candidates..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="relative">
                <select
                  value={groupFilter}
                  onChange={(e) => handleGroupFilter(e.target.value)}
                  className="w-full py-2 pl-4 pr-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                >
                  {uniqueGroups.map((group) => (
                    <option key={group} value={group}>
                      {group === "All" ? "All Groups" : group}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaFilter className="text-orange-500" />
                </div>
              </div>
              
              <button
                onClick={handleArchiveAllConfirm}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center"
              >
                <FaArchive className="mr-2" />
                <span>Archive All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-sm text-gray-600">
              Showing {paginatedCandidates.length} of {filteredCandidates.length} candidates
              {groupFilter !== "All" && (
                <span className="ml-1">
                  in <span className="font-medium text-orange-600">{groupFilter}</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              {["id", "name", "position", "group"].map((field) => (
                <button
                  key={field}
                  className={`ml-2 px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    activeSortField === field
                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                  onClick={() => handleSort(field)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {activeSortField === field && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedCandidates.length > 0 ? (
                  paginatedCandidates.map((candidate) => (
                    <tr 
                      key={candidate.id} 
                      className="hover:bg-orange-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{candidate.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                          <img
                            src={getPhotoUrl(candidate.photo)}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {candidate.position}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.group}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleView(candidate.id)}
                            className="bg-gray-100 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleUpdate(candidate.id)}
                            className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors"
                            title="Edit Candidate"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(candidate.id)}
                            className="bg-red-100 p-2 rounded-lg text-red-600 hover:bg-red-200 transition-colors"
                            title="Delete Candidate"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-4 bg-gray-100 rounded-full mb-4">
                          <FaSearch className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 text-lg font-medium">No candidates found.</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, sortedCandidates.length)}
                    </span>{' '}
                    of <span className="font-medium">{sortedCandidates.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <FaChevronLeft className="h-3 w-3" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                          ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <FaChevronRight className="h-3 w-3" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Candidate Modal */}
      {isViewModalOpen && currentCandidate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-0 w-[90%] max-w-[500px] relative z-10 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-orange-400 to-orange-600 relative">
              <button
                className="absolute top-3 right-3 bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors text-white"
                onClick={closeViewModal}
              >
                <FaTimes />
              </button>
              <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full bg-white p-1.5">
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={getPhotoUrl(currentCandidate.photo)}
                    alt={currentCandidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-20 px-6 pb-6">
              <h3 className="text-2xl font-bold text-gray-800">{currentCandidate.name}</h3>
              
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-gray-500">ID</div>
                  <div className="font-medium text-gray-800">#{currentCandidate.id}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-500">Position</div>
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                    {currentCandidate.position}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-500">Organization</div>
                  <div className="font-medium text-gray-800">{currentCandidate.group}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-500">Photo</div>
                  <div className="font-medium text-gray-800">{currentCandidate.photo}</div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeViewModal();
                    handleUpdate(currentCandidate.id);
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Edit Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {isArchiveConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-[400px] relative z-10">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <FaArchive className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Archive All Candidates</h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to archive all candidate data? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsArchiveConfirmOpen(false)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleArchiveAll}
                className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Archive All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-[400px] relative z-10">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Delete Candidate</h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to delete this candidate? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && currentCandidate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-[600px] relative z-10">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <FaEdit className="text-blue-500 text-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Update Candidate</h3>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
                onClick={closeUpdateModal}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                    className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="President">President</option>
                    <option value="Vice President">Vice President</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Auditor">Auditor</option>
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
                    className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="CCS Student Council">CCS Student Council</option>
                    <option value="ELITES">ELITES</option>
                    <option value="SPECS">SPECS</option>
                    <option value="IMAGES">IMAGES</option>
                  </select>
                </div>

                {/* Photo Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Photo
                  </label>
                  <div className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden border border-gray-300">
                    <img
                      src={photoPreview || getPhotoUrl(currentCandidate.photo)}
                      alt={currentCandidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label htmlFor="updatePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload New Photo
                </label>
                <div className="flex flex-col">
                  <label
                    htmlFor="updatePhoto"
                    className="flex items-center gap-2 cursor-pointer bg-gray-100 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-200 transition-colors w-fit"
                  >
                    <FaPaperclip className="text-orange-500" />
                    <span className="text-sm text-gray-700">Select new image</span>
                  </label>
                  <input
                    type="file"
                    id="updatePhoto"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  
                  <div className="mt-2">
                    {photoName && (
                      <div className="text-sm text-gray-700 flex items-center">
                        <FaImage className="text-gray-400 mr-2" />
                        <span>{photoName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div 
        className={`fixed top-24 right-6 transform transition-all duration-500 ease-in-out z-50 ${
          showSuccessToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className={`bg-white rounded-lg shadow-lg border-l-4 ${
          toastType === "success" ? 'border-green-500' : 
          toastType === "error" ? 'border-red-500' : 
          'border-blue-500'
        } flex items-center p-4 max-w-md`}>
          <div className={`${
            toastType === "success" ? 'text-green-500' : 
            toastType === "error" ? 'text-red-500' : 
            'text-blue-500'
          } mr-3`}>
            {toastType === "success" ? (
              <FaCheckCircle className="text-lg" />
            ) : toastType === "error" ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaInfo className="text-lg" />
            )}
          </div>
          <div className="flex-grow">
            <p className="font-medium text-gray-800">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setShowSuccessToast(false)} 
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCandidate;