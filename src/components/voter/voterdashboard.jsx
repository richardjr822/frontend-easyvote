import React, { useState, useEffect } from "react";
import { 
  FaVoteYea, FaInfoCircle, FaClock, FaChevronRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VoterDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedCards, setAnimatedCards] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Get student info - in a real app, this would come from authentication context
  const studentInfo = {
    name: "John Doe",
    id: "2021-12345",
    program: "Bachelor of Science in Information Technology",
    year: "3rd Year",
    section: "A"
  };
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Animate cards on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Election data
  const elections = [
    {
      id: "ccs-student-council",
      name: "CCS Student Council",
      logo: "/assets/STUDENT-COUNCIL.jpg",
      description: "Founded in 2013, Gordon College CCS Student Council is a recognized Student Society on Information Technology, Computer Science, and Entertainment and Multimedia Computing.",
      endTime: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        return date;
      })(),
      positions: ["President", "Vice President", "Secretary", "Treasurer", "Auditor"],
      totalCandidates: 15,
      participation: 68, // percentage of eligible voters who have voted
      bgGradient: "from-blue-100 to-gray-100",
      borderColor: "border-blue-600"
    },
    {
      id: "elites",
      name: "ELITES",
      logo: "/assets/ELITES.jpg",
      description: "Founded in 2022, GCCCS ELITES (Empowered League of Information Technology Education Students) represents the collective voice of IT students at Gordon College.",
      endTime: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date;
      })(),
      positions: ["President", "Vice President", "Secretary", "Treasurer", "Public Relations Officer"],
      totalCandidates: 12,
      participation: 45,
      bgGradient: "from-purple-100 to-gray-100",
      borderColor: "border-purple-600"
    }
  ];

  // Function to navigate to voting interface
  const handleStartVoting = (electionId) => {
    navigate(`/voting-interface/${electionId}`);
  };

  // Calculate remaining time
  const getRemainingTime = (endTime) => {
    const timeDiff = endTime - currentTime;
    if (timeDiff <= 0) return "Voting has ended";
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    let timeString = "";
    if (days > 0) timeString += `${days}d `;
    if (hours > 0) timeString += `${hours}h `;
    timeString += `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s remaining`;
    
    return timeString;
  };
  
  // Get formatted date
  const getFormattedDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // Show tooltip with information about a term
  const handleInfoHover = (e, content) => {
    setTooltipContent(content);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-200 mb-6 transform transition-all duration-500 ease-in-out">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
              Welcome, <span className="text-orange-600 ml-1">{studentInfo.name}!</span>
            </h1>
            <p className="text-gray-600">
              <span className="font-medium">{studentInfo.program}</span> • {studentInfo.year} • ID: {studentInfo.id}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaVoteYea className="mr-2 text-orange-600" /> Available Elections
        </h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {elections.map((election, index) => (
            <div 
              key={election.id}
              className={`card bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all h-full transform ${
                animatedCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`flex items-center justify-between p-5 bg-gradient-to-r ${election.bgGradient} rounded-t-lg`}>
                <div className="flex items-center">
                  <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${election.borderColor} mr-4 shadow-md`}>
                    <img
                      src={election.logo}
                      alt={election.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{election.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        Ongoing
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        Ends: {getFormattedDate(election.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex flex-col">
                <p className="text-gray-600 text-sm mb-4">
                  {election.description}
                </p>
                
                {/* Election stats */}
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <h4 className="text-xs text-gray-500 mb-1 flex items-center">
                    <FaClock className="mr-1 text-orange-500" /> TIME REMAINING
                  </h4>
                  <p className="text-sm font-medium text-green-600">
                    {getRemainingTime(election.endTime)}
                  </p>
                </div>
                
                {/* Positions */}
                <div className="mb-4">
                  <h4 className="text-xs text-gray-500 mb-2">POSITIONS</h4>
                  <div className="flex flex-wrap gap-1">
                    {election.positions.map(position => (
                      <span key={position} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {position}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="mt-auto flex justify-center">
                  <button
                    onClick={() => handleStartVoting(election.id)}
                    className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all w-full"
                  >
                    <FaVoteYea className="mr-2" /> Start Voting
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Information Box */}
        <div className="mt-6 p-5 border border-blue-200 rounded-lg bg-blue-50 text-sm text-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <FaInfoCircle className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-blue-800">Important Information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-blue-700">
                <li>You can only vote once for each election. Your choices cannot be changed after submission.</li>
                <li>Make sure to review your selections carefully before finalizing your ballot.</li>
                <li>You must vote for all available positions to submit your ballot.</li>
                <li>If you encounter any issues, please contact <span className="font-medium">election.support@gordoncollege.edu</span>.</li>
              </ul>
              
              <div className="mt-4 flex items-center">
                <a href="/voter/help" className="text-blue-600 hover:text-blue-800 flex items-center font-medium text-sm">
                  View Voting Instructions <FaChevronRight className="ml-1 text-xs" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="fixed bg-gray-900 text-white text-xs rounded py-1 px-2 z-50 max-w-xs pointer-events-none"
          style={{ 
            left: `${tooltipPosition.x + 15}px`, 
            top: `${tooltipPosition.y - 20}px`,
            opacity: 0.9
          }}
        >
          {tooltipContent}
          <div className="absolute left-0 top-1/2 -ml-2 -mt-1 border-t-2 border-r-2 border-transparent border-r-gray-900" style={{ transform: "rotate(45deg)" }}></div>
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;