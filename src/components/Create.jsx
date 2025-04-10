import React, { useState } from "react";
import { 
  FaPaperclip, FaUserPlus, FaImage, FaHistory, 
  FaCheckCircle, FaTimes, FaExclamationCircle
} from "react-icons/fa";
import Header from "./header";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    group: "",
    photo: null,
  });

  const [history, setHistory] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.group) newErrors.group = "Group is required";
    if (!formData.photo) newErrors.photo = "Photo is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({...errors, [name]: null});
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({...errors, photo: "Image must be less than 5MB"});
        return;
      }
      
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoName(file.name);
      
      // Clear error when field is edited
      if (errors.photo) {
        setErrors({...errors, photo: null});
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form Data Submitted:", formData);

      // Add the new candidate to the history with timestamp
      const newCandidate = {
        ...formData,
        photoUrl: photoPreview,
        timestamp: new Date().toISOString()
      };
      setHistory([newCandidate, ...history]); // Add to the top

      // Reset the form
      setFormData({
        name: "",
        position: "",
        group: "",
        photo: null,
      });
      setPhotoPreview(null);
      setPhotoName("");
      setIsSubmitting(false);
      
      // Show success toast
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <div className="flex items-center">
            <FaUserPlus className="text-3xl text-orange-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Create Candidate</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Candidate Form */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 md:col-span-2">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="p-3 bg-orange-100 rounded-md mr-3">
                <FaUserPlus className="text-xl text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">New Candidate Details</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Candidate Name
                </label>
                <div className={`relative ${errors.name ? 'mb-6' : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors`}
                    placeholder="Enter candidate's full name"
                  />
                  {errors.name && (
                    <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center">
                      <FaExclamationCircle className="mr-1" /> {errors.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Two columns for Position and Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Position Dropdown */}
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <div className={`relative ${errors.position ? 'mb-6' : ''}`}>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={`block w-full border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none`}
                    >
                      <option value="" disabled>Select a position</option>
                      <option value="President">President</option>
                      <option value="Vice President">Vice President</option>
                      <option value="Secretary">Secretary</option>
                      <option value="Treasurer">Treasurer</option>
                      <option value="Public Relations Officer">Public Relations Officer</option>
                      <option value="Auditor">Auditor</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {errors.position && (
                      <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center">
                        <FaExclamationCircle className="mr-1" /> {errors.position}
                      </div>
                    )}
                  </div>
                </div>

                {/* Group Dropdown */}
                <div>
                  <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  <div className={`relative ${errors.group ? 'mb-6' : ''}`}>
                    <select
                      id="group"
                      name="group"
                      value={formData.group}
                      onChange={handleInputChange}
                      className={`block w-full border ${errors.group ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none`}
                    >
                      <option value="" disabled>Select an organization</option>
                      <option value="CCS Student Council">CCS Student Council</option>
                      <option value="ELITES">ELITES</option>
                      <option value="SPECS">SPECS</option>
                      <option value="IMAGES">IMAGES</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {errors.group && (
                      <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center">
                        <FaExclamationCircle className="mr-1" /> {errors.group}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Candidate Photo
                </label>
                <div className="flex items-start">
                  <div className={`flex-1 ${errors.photo ? 'mb-6' : ''} relative`}>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <label htmlFor="photo" className="w-full h-full flex flex-col items-center cursor-pointer">
                        <FaImage className="text-gray-400 text-3xl mb-2" />
                        <span className="text-sm font-medium text-gray-700">Click to upload photo</span>
                        <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                      </label>
                    </div>
                    {errors.photo && (
                      <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center">
                        <FaExclamationCircle className="mr-1" /> {errors.photo}
                      </div>
                    )}
                  </div>

                  {photoPreview && (
                    <div className="ml-4 w-24 h-24 rounded-lg border-2 border-orange-200 overflow-hidden flex-shrink-0">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {photoName && (
                  <p className="mt-2 text-xs text-gray-600 flex items-center">
                    <FaImage className="text-gray-400 mr-1" /> {photoName}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200 mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2" /> Create Candidate
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* History Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="p-3 bg-orange-100 rounded-md mr-3">
                <FaHistory className="text-xl text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Recently Added</h2>
            </div>
            
            {history.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {history.map((candidate, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center mb-3">
                      {candidate.photoUrl ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-200 mr-3">
                          <img
                            src={candidate.photoUrl}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <FaUserPlus className="text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-xs text-gray-500">
                          {new Date(candidate.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 rounded p-2">
                        <span className="text-gray-500">Position</span>
                        <p className="font-medium text-gray-800">{candidate.position}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <span className="text-gray-500">Organization</span>
                        <p className="font-medium text-gray-800">{candidate.group}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 rounded-full p-4 mb-3">
                  <FaUserPlus className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-500 mb-1">No candidates added yet</p>
                <p className="text-xs text-gray-400">
                  New candidates will appear here after submission
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <div 
        className={`fixed top-24 right-6 transform transition-all duration-500 ease-in-out z-50 ${
          showSuccessToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 flex items-center p-4 max-w-md">
          <div className="text-green-500 mr-3">
            <FaCheckCircle className="text-lg" />
          </div>
          <div className="flex-grow">
            <p className="font-medium text-gray-800">Candidate created successfully!</p>
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

export default Create;