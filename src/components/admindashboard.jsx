import React, { useState } from "react";
import { FaUsers, FaUserCheck, FaUserGraduate, FaChartBar, FaRegClock, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", logo: "" });
  const navigate = useNavigate();

  // Example data for analytics
  const analyticsData = {
    totalVoters: 500,
    candidates: {
      BSIT: 10,
      BSCS: 8,
      BSEMC: 6,
    },
    voted: {
      BSIT: 200,
      BSCS: 150,
      BSEMC: 100,
    },
  };

  const totalVoted = Object.values(analyticsData.voted).reduce((a, b) => a + b, 0);
  const votingPercentage = Math.round((totalVoted / analyticsData.totalVoters) * 100);

  const handleOpenModal = (title, logo) => {
    setModalData({ title, logo });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewCandidates = () => {
    navigate("/view-candidates");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header username="Admin" />

      <div className="main-content ml-[250px] p-6">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your elections today.</p>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Voters Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FaUsers className="text-2xl text-orange-600" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
              <h3 className="text-base font-medium text-gray-500">Total Voters</h3>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{analyticsData.totalVoters}</p>
                <span className="text-sm text-green-600 font-medium mb-1">+5% from last election</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 w-full"></div>
          </div>

          {/* Total Candidates Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaUserCheck className="text-2xl text-blue-600" />
                </div>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {Object.values(analyticsData.candidates).reduce((a, b) => a + b, 0)} Registered
                </span>
              </div>
              <h3 className="text-base font-medium text-gray-500">Total Candidates</h3>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-gray-50 p-2 rounded-lg text-center">
                  <p className="text-lg font-bold text-gray-800">{analyticsData.candidates.BSIT}</p>
                  <p className="text-xs text-gray-500">BSIT</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg text-center">
                  <p className="text-lg font-bold text-gray-800">{analyticsData.candidates.BSCS}</p>
                  <p className="text-xs text-gray-500">BSCS</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg text-center">
                  <p className="text-lg font-bold text-gray-800">{analyticsData.candidates.BSEMC}</p>
                  <p className="text-xs text-gray-500">BSEMC</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 w-full"></div>
          </div>

          {/* Voters Ratio Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaChartBar className="text-2xl text-green-600" />
                </div>
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {votingPercentage}% Turnout
                </span>
              </div>
              <h3 className="text-base font-medium text-gray-500">Voters Participation</h3>
              <div className="mt-2">
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-gray-600">{totalVoted} votes cast</span>
                  <span className="text-sm text-gray-600">{analyticsData.totalVoters} eligible</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    style={{ width: `${votingPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 w-full"></div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaRegClock className="text-2xl text-purple-600" />
                </div>
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Live Status
                </span>
              </div>
              <h3 className="text-base font-medium text-gray-500">Election Status</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex justify-between items-center p-1.5 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">CCS Student Council</span>
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    Ongoing
                  </span>
                </li>
                <li className="flex justify-between items-center p-1.5 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">ELITES</span>
                  <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    Finished
                  </span>
                </li>
                <li className="flex justify-between items-center p-1.5 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">SPECS</span>
                  <span className="bg-red-700 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    Not Started
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 w-full"></div>
          </div>
        </div>

        {/* Manage Elections Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Elections</h2>
          <button 
            onClick={handleViewCandidates}
            className="flex items-center text-sm text-orange-600 hover:text-orange-700"
          >
            View all candidates <FaAngleRight className="ml-1" />
          </button>
        </div>

        {/* Organization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CCS Student Council Card */}
          <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300">
            <div className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 group-hover:border-orange-200 transition-all mb-4">
                <img
                  src="/assets/STUDENT-COUNCIL.jpg"
                  alt="Student Council"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">CCS Student Council</h5>
              <div className="flex items-center mb-3">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                  Ongoing
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-5 text-center line-clamp-3">
                Founded in 2013, Gordon College CCS Student Council is a
                recognized Student Society on Information Technology, Computer
                Science, and Entertainment and Multimedia Computing.
              </p>
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center shadow-sm group-hover:shadow-md"
                onClick={() => handleOpenModal("CCS Student Council", "/assets/STUDENT-COUNCIL.jpg")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Manage Election
              </button>
            </div>
          </div>

          {/* ELITES Card */}
          <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300">
            <div className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 group-hover:border-orange-200 transition-all mb-4">
                <img
                  src="/assets/ELITES.jpg"
                  alt="Elites"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">ELITES</h5>
              <div className="flex items-center mb-3">
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-1.5"></span>
                  Finished
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-5 text-center line-clamp-3">
                Founded in 2022, GCCCS ELITES (Empowered League of Information
                Technology Education Students).
              </p>
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center shadow-sm group-hover:shadow-md"
                onClick={() => handleOpenModal("ELITES", "/assets/ELITES.jpg")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Manage Election
              </button>
            </div>
          </div>

          {/* SPECS Card */}
          <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300">
            <div className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 group-hover:border-orange-200 transition-all mb-4">
                <img
                  src="/assets/SPECS.jpg"
                  alt="Specs"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">SPECS</h5>
              <div className="flex items-center mb-3">
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                  Not Started
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-5 text-center line-clamp-3">
                The Society of Programming Enthusiasts in Computer Science
                (SPECS) is an organization under the GCCCS.
              </p>
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center shadow-sm group-hover:shadow-md"
                onClick={() => handleOpenModal("SPECS", "/assets/SPECS.jpg")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Manage Election
              </button>
            </div>
          </div>

          {/* IMAGES Card */}
          <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300">
            <div className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 group-hover:border-orange-200 transition-all mb-4">
                <img
                  src="/assets/IMAGES.jpg"
                  alt="Images"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">IMAGES</h5>
              <div className="flex items-center mb-3">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                  Ongoing
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-5 text-center line-clamp-3">
                The Innovative Multimedia Artists Guild of Empowered Students
                (IMAGES) is a creatives organization of the GCCCS.
              </p>
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center shadow-sm group-hover:shadow-md"
                onClick={() => handleOpenModal("IMAGES", "/assets/IMAGES.jpg")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Manage Election
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50 transition-all duration-300 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl w-[90%] max-w-[900px] flex flex-col overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <img
                    src={modalData.logo}
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <h5 className="text-xl font-bold text-white">{modalData.title}</h5>
              </div>
              <button
                className="text-white hover:text-gray-200 bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all hover:bg-white/30"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col md:flex-row gap-8">
              {/* Left Section */}
              <div className="flex flex-col items-center md:w-1/3 gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full blur-md"></div>
                  <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={modalData.logo}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm w-full">
                  <h6 className="font-semibold text-center text-gray-700 mb-2">Election Summary</h6>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-green-600">Ready to Start</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Candidates:</span>
                      <span className="font-medium">12 Registered</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Positions:</span>
                      <span className="font-medium">4 Available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col md:w-2/3 gap-6">
                <h6 className="font-semibold text-gray-700 border-b border-gray-200 pb-2">
                  Configure Election Settings
                </h6>
                
                <form className="space-y-5">
                  {/* Duration Selector */}
                  <div className="space-y-2">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Set Duration (hours)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="number"
                        id="duration"
                        min="1"
                        max="168"
                        defaultValue="24"
                        className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white shadow-sm"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Set how long the election will run after starting (1-168 hours)
                    </p>
                  </div>

                  {/* Voters */}
                  <div className="space-y-2">
                    <label htmlFor="voters" className="block text-sm font-medium text-gray-700">
                      Eligible Voters
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <select
                        id="voters"
                        className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white shadow-sm appearance-none"
                        style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"%23666\"><path d=\"M7 10l5 5 5-5H7z\"/></svg>')", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", paddingRight: "2.5rem" }}
                      >
                        <option value="all">All CCS Students</option>
                        <option value="bsit">BSIT Students</option>
                        <option value="bscs">BSCS Students</option>
                        <option value="bsemc">BSEMC Students</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This determines which students will be able to participate in this election.
                    </p>
                  </div>
                </form>

                {/* Action Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Election
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;