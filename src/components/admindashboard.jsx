import React, { useState } from "react";
import { FaUsers, FaUserCheck, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./header"; // Import the Header component

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalData, setModalData] = useState({ title: "", logo: "" }); // State to store modal data
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Calculate total voted
  const totalVoted = Object.values(analyticsData.voted).reduce((a, b) => a + b, 0);

  // Function to open the modal
  const handleOpenModal = (title, logo) => {
    setModalData({ title, logo });
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to navigate to ViewCandidate page
  const handleViewCandidates = () => {
    navigate("/view-candidates"); // Navigate to the ViewCandidate page
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Voters */}
          <div className="bg-gradient-to-r from-orange-100 to-gray-100 text-gray-800 p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-shadow flex flex-col items-center gap-2">
            <FaUsers className="text-4xl text-orange-600" />
            <h3 className="text-lg font-semibold text-center">Total Voters</h3>
            <p className="text-3xl font-bold">{analyticsData.totalVoters}</p>
            <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          {/* Candidates Per Course */}
          <div className="bg-gradient-to-r from-orange-100 to-gray-100 text-gray-800 p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-shadow flex flex-col items-center gap-2">
            <FaUserGraduate className="text-3xl text-orange-600" />
            <h3 className="text-lg font-semibold text-center">Total Candidates</h3>
            <ul className="text-m font-bold text-center">
              <li>BSIT: {analyticsData.candidates.BSIT}</li>
              <li>BSCS: {analyticsData.candidates.BSCS}</li>
              <li>BSEMC: {analyticsData.candidates.BSEMC}</li>
            </ul>
            {/* View Candidates Button */}
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition mt-4"
              onClick={handleViewCandidates}
            >
              View Candidates
            </button>
          </div>

          {/* Voters Ratio */}
          <div className="bg-gradient-to-r from-orange-100 to-gray-100 text-gray-800 p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-shadow flex flex-col items-center gap-2">
            <FaUserCheck className="text-4xl text-orange-600" />
            <h3 className="text-lg font-semibold text-center">Voters Ratio</h3>
            <p className="text-lg text-center">
              {totalVoted}/{analyticsData.totalVoters} Voted
            </p>
            <div className="bg-gray-200 h-2 w-full rounded-full">
              <div
                className="bg-orange-600 h-2 rounded-full"
                style={{
                  width: `${(totalVoted / analyticsData.totalVoters) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-gradient-to-r from-orange-100 to-gray-100 text-gray-800 p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-shadow flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              <FaUserCheck className="text-4xl text-orange-600" />
              <h3 className="text-lg font-semibold text-center">Status</h3>
            </div>
            <ul className="text-sm font-medium space-y-2">
              <li className="flex justify-between items-center">
                <span>CCS Student Council</span>
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Ongoing
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>ELITES</span>
                <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Finished
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>SPECS</span>
                <span className="bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Not Yet Started
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>IMAGES</span>
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Ongoing
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="card bg-gray-100 rounded-lg shadow-md border border-gray-300 hover:shadow-xl hover:scale-105 transition-transform transform flex flex-col justify-between">
            <div className="logo-container mx-auto mt-4 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-600">
              <img
                src="/assets/STUDENT-COUNCIL.jpg"
                alt="Student Council"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-body p-4 flex flex-col justify-between flex-grow">
              <h5 className="card-title text-lg font-semibold mb-2 text-center">
                CCS Student Council
              </h5>
              <p className="card-text text-sm text-gray-600 mb-4 text-center">
                Founded in 2013, Gordon College CCS Student Council is a
                recognized Student Society on Information Technology, Computer
                Science, and Entertainment and Multimedia Computing.
              </p>
              <button
                className="manage-election-btn bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all w-full flex items-center justify-center"
                onClick={() =>
                  handleOpenModal("CCS Student Council", "/assets/STUDENT-COUNCIL.jpg")
                }
              >
                <i className="bi bi-play-circle mr-2"></i> Manage Election
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-gray-100 rounded-lg shadow-md border border-gray-300 hover:shadow-xl hover:scale-105 transition-transform transform flex flex-col justify-between">
            <div className="logo-container mx-auto mt-4 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-600">
              <img
                src="/assets/ELITES.jpg"
                alt="Elites"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-body p-4 flex flex-col justify-between flex-grow">
              <h5 className="card-title text-lg font-semibold mb-2 text-center">
                ELITES
              </h5>
              <p className="card-text text-sm text-gray-600 mb-4 text-center">
                Founded in 2022, GCCCS ELITES (Empowered League of Information
                Technology Education Students).
              </p>
              <button
                className="manage-election-btn bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all w-full flex items-center justify-center"
                onClick={() => handleOpenModal("ELITES", "/assets/ELITES.jpg")}
              >
                <i className="bi bi-play-circle mr-2"></i> Manage Election
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-gray-100 rounded-lg shadow-md border border-gray-300 hover:shadow-xl hover:scale-105 transition-transform transform flex flex-col justify-between">
            <div className="logo-container mx-auto mt-4 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-600">
              <img
                src="/assets/SPECS.jpg"
                alt="Specs"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-body p-4 flex flex-col justify-between flex-grow">
              <h5 className="card-title text-lg font-semibold mb-2 text-center">
                SPECS
              </h5>
              <p className="card-text text-sm text-gray-600 mb-4 text-center">
                The Society of Programming Enthusiasts in Computer Science
                (SPECS) is an organization under the GCCCS.
              </p>
              <button
                className="manage-election-btn bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all w-full flex items-center justify-center"
                onClick={() => handleOpenModal("SPECS", "/assets/SPECS.jpg")}
              >
                <i className="bi bi-play-circle mr-2"></i> Manage Election
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-gray-100 rounded-lg shadow-md border border-gray-300 hover:shadow-xl hover:scale-105 transition-transform transform flex flex-col justify-between">
            <div className="logo-container mx-auto mt-4 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-600">
              <img
                src="/assets/IMAGES.jpg"
                alt="Images"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-body p-4 flex flex-col justify-between flex-grow">
              <h5 className="card-title text-lg font-semibold mb-2 text-center">
                IMAGES
              </h5>
              <p className="card-text text-sm text-gray-600 mb-4 text-center">
                The Innovative Multimedia Artists Guild of Empowered Students
                (IMAGES) is a creatives organization of the GCCCS.
              </p>
              <button
                className="manage-election-btn bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all w-full flex items-center justify-center"
                onClick={() => handleOpenModal("IMAGES", "/assets/IMAGES.jpg")}
              >
                <i className="bi bi-play-circle mr-2"></i> Manage Election
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-gray-300 rounded-lg shadow-lg p-8 w-[90%] max-w-[900px] flex flex-col gap-6"
            style={{ height: "500px" }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
              <h5 className="text-xl font-semibold">{modalData.title}</h5>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-grow gap-6">
              {/* Left Section */}
              <div className="flex flex-col items-center justify-center w-1/3 gap-4">
                <div
                  className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-400"
                >
                  <img
                    id="modal-logo"
                    src={modalData.logo}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col justify-center w-2/3 gap-6">
                <form className="space-y-4">
                  {/* Start Date */}
                  <div className="flex items-center">
                    <label
                      htmlFor="startDate"
                      className="text-sm font-medium w-28"
                    >
                      Start Date
                    </label>
                    <div className="flex items-center w-full">
                      <input
                        type="date"
                        id="startDate"
                        className="w-full border border-black bg-white rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center">
                    <label
                      htmlFor="endDate"
                      className="text-sm font-medium w-28"
                    >
                      End Date
                    </label>
                    <div className="flex items-center w-full">
                      <input
                        type="date"
                        id="endDate"
                        className="w-full border border-black bg-white rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Voters */}
                  <div className="flex items-center">
                    <label
                      htmlFor="voters"
                      className="text-sm font-medium w-28"
                    >
                      Voters
                    </label>
                    <select
                      id="voters"
                      className="w-full border border-black bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All CCS Students</option>
                      <option value="bsit">BSIT Students</option>
                      <option value="bscs">BSCS Students</option>
                      <option value="bsemc">BSEMC Students</option>
                    </select>
                  </div>
                </form>

                {/* Start Election Button */}
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition self-center">
                  <i className="bi bi-play-circle mr-2"></i> Start Election
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;