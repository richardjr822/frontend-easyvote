import React, { useState, useEffect } from "react";
import { 
  FaStar, FaFilter, FaSearch, FaUserTie, FaBriefcase, 
  FaEye, FaThLarge, FaList, FaLightbulb, FaAward, 
  FaHistory, FaQuoteRight, FaGraduationCap
} from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";

const Candidates = () => {
  const [searchParams] = useSearchParams();
  const electionIdParam = searchParams.get('election');
  
  const [activeGroup, setActiveGroup] = useState(electionIdParam || "all");
  const [activePosition, setActivePosition] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Student info - in a real app, this would come from authentication/context
  const studentInfo = {
    name: "John Doe",
    id: "2021-12345",
    program: "BSIT", // Bachelor of Science in Information Technology
    year: "3rd Year",
    department: "CCS" // College of Computing Sciences
  };

  // Define which organizations are relevant for which departments/programs
  const programOrganizationMap = {
    "BSIT": ["CCS Student Council", "ELITES"],
    "BSCS": ["CCS Student Council", "SPECS"],
    "BSEMC": ["CCS Student Council", "IMAGES"],
    // Add other programs as needed
  };

  // Get the allowed organizations for this student
  const allowedOrganizations = programOrganizationMap[studentInfo.program] || [];

  useEffect(() => {
    // If specific election is provided in URL, set it as active group
    if (electionIdParam) {
      // Convert election ID to organization name if needed
      const orgName = 
        electionIdParam === "ccs-student-council" ? "CCS Student Council" :
        electionIdParam === "elites" ? "ELITES" :
        electionIdParam === "specs" ? "SPECS" :
        electionIdParam === "images" ? "IMAGES" : 
        "all";
      
      setActiveGroup(orgName);
    }
  }, [electionIdParam]);

  // Example candidate data - in real app, you would fetch this from an API
  const candidatesData = [
    {
      id: 1,
      name: "John Smith",
      position: "President",
      group: "CCS Student Council",
      photo: "/assets/STUDENT-COUNCIL.jpg", // replace with actual candidate photo
      skills: ["Leadership", "Communication", "Problem Solving", "Event Planning"],
      experience: "2 years as Class Representative, Organized campus-wide technology fair, Led student mentorship program",
      vision: "My vision is to foster a more inclusive and technologically advanced environment for all CCS students. I aim to create more opportunities for hands-on learning, industry collaboration, and community outreach."
    },
    {
      id: 2,
      name: "Maria Garcia",
      position: "Secretary",
      group: "ELITES",
      photo: "/assets/ELITES.jpg", // replace with actual candidate photo
      skills: ["Documentation", "Organization", "Time Management", "Attention to Detail"],
      experience: "1 year as Committee Secretary, Handled documentation for multiple campus events, Coordinated with administration for student concerns",
      vision: "I believe in transparent and efficient communication between student government and the student body. My goal is to establish better information systems and ensure all students have access to resources they need to succeed."
    },
    {
      id: 3,
      name: "David Johnson",
      position: "Treasurer",
      group: "SPECS",
      photo: "/assets/STUDENT-COUNCIL.jpg", // replace with actual candidate photo
      skills: ["Financial Management", "Budgeting", "Analytical Thinking", "Integrity"],
      experience: "Managed finances for two major campus events, Worked as student assistant in the accounting office, Treasurer for campus organization",
      vision: "I will ensure transparent financial management and equitable distribution of resources. My plan includes implementing a more efficient fund allocation system and creating more funding opportunities for student projects."
    },
    {
      id: 4,
      name: "Linda Chen",
      position: "President",
      group: "IMAGES",
      photo: "/assets/ELITES.jpg", // replace with actual candidate photo
      skills: ["Leadership", "Creative Direction", "Team Building", "Project Management"],
      experience: "Vice President of Multimedia Arts Club, Directed two campus video productions, Led design team for college website redesign",
      vision: "As president, I want to elevate IMAGES to be a hub for creativity and innovation. I plan to establish partnerships with industry professionals, create more showcases for student work, and foster interdisciplinary collaboration."
    },
    {
      id: 5,
      name: "Robert Wilson",
      position: "Vice President",
      group: "CCS Student Council",
      photo: "/assets/STUDENT-COUNCIL.jpg",
      skills: ["Team Management", "Strategic Planning", "Public Speaking", "Networking"],
      experience: "1 year as Committee Head, Represented students in faculty meetings, Organized inter-department competitions",
      vision: "I will work to bridge the gap between students and faculty, ensuring student voices are heard and concerns are addressed. My focus is on creating a supportive learning environment and expanding opportunities for professional development."
    },
    {
      id: 6,
      name: "Emma Rodriguez",
      position: "Public Relations Officer",
      group: "ELITES",
      photo: "/assets/ELITES.jpg",
      skills: ["Communication", "Social Media Management", "Event Coordination", "Graphic Design"],
      experience: "Social Media Manager for student publication, Coordinated promotional campaigns for campus events, Experience in student recruitment",
      vision: "My aim is to increase visibility of IT student achievements and create stronger connections with industry partners. I plan to develop innovative outreach programs and showcase the talent within our department."
    }
  ];

  // First filter by student's program - only show candidates from allowed organizations
  const programFilteredCandidates = candidatesData.filter(candidate => 
    allowedOrganizations.includes(candidate.group)
  );

  // Extract unique groups and positions for filters - only from allowed organizations
  const groups = ["all", ...new Set(programFilteredCandidates.map(candidate => candidate.group))];
  const positions = ["all", ...new Set(programFilteredCandidates.map(candidate => candidate.position))];

  // Then apply user-selected filters
  const filteredCandidates = programFilteredCandidates.filter(candidate => {
    return (
      (activeGroup === "all" || candidate.group === activeGroup) &&
      (activePosition === "all" || candidate.position === activePosition) &&
      (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
       candidate.experience.toLowerCase().includes(searchTerm.toLowerCase()) ||
       candidate.vision.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Function to view candidate details
  const viewCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailModal(true);
  };

  // Group color styling
  const getGroupColor = (group) => {
    switch(group) {
      case "CCS Student Council":
        return "bg-blue-100 text-blue-800";
      case "ELITES":
        return "bg-purple-100 text-purple-800";
      case "SPECS":
        return "bg-green-100 text-green-800";
      case "IMAGES":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Position color styling
  const getPositionColor = (position) => {
    switch(position) {
      case "President":
        return "bg-red-100 text-red-800";
      case "Vice President":
        return "bg-orange-100 text-orange-800";
      case "Secretary":
        return "bg-green-100 text-green-800";
      case "Treasurer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="main-content ml-[250px] p-5">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">View Candidates</h1>
          <p className="text-gray-600">
            Learn about the candidates running for various positions in your eligible organizations.
          </p>
          
          {/* Student Info Summary */}
          <div className="mt-3 flex items-center">
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <FaGraduationCap className="text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">{studentInfo.program} • {studentInfo.year}</span>
            </div>
            <div className="ml-2 text-xs text-gray-500">
              Showing candidates for your eligible organizations
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0 flex items-center">
              <FaFilter className="mr-2 text-orange-500" /> Filter Candidates
            </h2>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              {/* Organization Filter */}
              <div className="relative w-full md:w-auto">
                <select
                  value={activeGroup}
                  onChange={(e) => setActiveGroup(e.target.value)}
                  className="w-full md:w-48 pl-4 pr-10 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                >
                  <option value="all">All Organizations</option>
                  {groups.filter(group => group !== "all").map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 px-3 flex items-center">
                  <FaFilter className="text-orange-500 text-xs" />
                </div>
              </div>

              {/* Position Filter */}
              <div className="relative w-full md:w-auto">
                <select
                  value={activePosition}
                  onChange={(e) => setActivePosition(e.target.value)}
                  className="w-full md:w-48 pl-4 pr-10 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                >
                  <option value="all">All Positions</option>
                  {positions.filter(pos => pos !== "all").map((position) => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 px-3 flex items-center">
                  <FaUserTie className="text-orange-500 text-xs" />
                </div>
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-orange-500" />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-orange-300 rounded-md overflow-hidden shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 flex items-center justify-center ${
                    viewMode === "grid" 
                      ? "bg-orange-500 text-white" 
                      : "bg-white text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <FaThLarge size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 flex items-center justify-center ${
                    viewMode === "list" 
                      ? "bg-orange-500 text-white" 
                      : "bg-white text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <FaList size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Found {filteredCandidates.length} candidates
          {activeGroup !== "all" && <span> in {activeGroup}</span>}
          {activePosition !== "all" && <span> for {activePosition} position</span>}
          {searchTerm && <span> matching "{searchTerm}"</span>}
        </div>

        {/* Candidates Display - Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-4 flex items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white mr-4 shadow-md">
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{candidate.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getGroupColor(candidate.group)}`}>
                        {candidate.group}
                      </span>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getPositionColor(candidate.position)}`}>
                        {candidate.position}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  {/* Skills Section */}
                  <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaAward className="text-orange-500 mr-2" /> Skills
                  </h4>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Experience Section - Truncated */}
                  <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaHistory className="text-orange-500 mr-2" /> Experience
                  </h4>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {candidate.experience}
                  </p>
                  
                  {/* Vision Section - Truncated */}
                  <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaLightbulb className="text-orange-500 mr-2" /> Vision
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {candidate.vision}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 p-3 flex justify-end">
                  <button
                    onClick={() => viewCandidateDetails(candidate)}
                    className="flex items-center text-sm text-orange-600 hover:text-orange-800 transition-colors"
                  >
                    <FaEye className="mr-1" /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Candidates Display - List View */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <div 
                key={candidate.id} 
                className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row"
              >
                <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-4 flex items-center md:w-1/4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white mr-3 shadow-md">
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{candidate.name}</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getGroupColor(candidate.group)}`}>
                        {candidate.group}
                      </span>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getPositionColor(candidate.position)}`}>
                        {candidate.position}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col md:flex-row">
                  {/* Skills Column */}
                  <div className="md:w-1/3 md:pr-4 mb-4 md:mb-0">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FaAward className="text-orange-500 mr-2" /> Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience Column */}
                  <div className="md:w-1/3 md:px-4 md:border-x border-gray-200 mb-4 md:mb-0">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FaHistory className="text-orange-500 mr-2" /> Experience
                    </h4>
                    <p className="text-xs text-gray-600">
                      {candidate.experience}
                    </p>
                  </div>
                  
                  {/* Vision Column */}
                  <div className="md:w-1/3 md:pl-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FaLightbulb className="text-orange-500 mr-2" /> Vision
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-4">
                      {candidate.vision}
                    </p>
                    <button
                      onClick={() => viewCandidateDetails(candidate)}
                      className="flex items-center text-sm text-orange-600 hover:text-orange-800 transition-colors mt-2"
                    >
                      <FaEye className="mr-1" /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-300 p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-orange-500 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No candidates found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
            <button
              onClick={() => {
                setActiveGroup("all");
                setActivePosition("all");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Candidate Detail Modal */}
        {showDetailModal && selectedCandidate && (
          <div className="fixed inset-0 backdrop-blur-md bg-opacity-20 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mr-6 shadow-lg">
                  <img
                    src={selectedCandidate.photo}
                    alt={selectedCandidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedCandidate.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2.5 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${getGroupColor(selectedCandidate.group)}`}>
                      {selectedCandidate.group}
                    </span>
                    <span className={`px-2.5 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${getPositionColor(selectedCandidate.position)}`}>
                      {selectedCandidate.position}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="ml-auto bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full p-2 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Skills Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaAward className="text-orange-500 mr-2" /> Skills & Qualifications
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-sm bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-full shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Experience Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaHistory className="text-orange-500 mr-2" /> Experience
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedCandidate.experience.split(', ').join('\n• ')}
                    </p>
                  </div>
                </div>
                
                {/* Vision Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaLightbulb className="text-orange-500 mr-2" /> Vision Statement
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex">
                      <FaQuoteRight className="text-orange-300 text-2xl mr-3 flex-shrink-0" />
                      <p className="text-gray-700 italic">{selectedCandidate.vision}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-200 p-4 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 mr-2 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;