import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaCheck, FaTimesCircle, FaVoteYea, FaArrowLeft, 
  FaExclamationCircle, FaCheckCircle, FaInfo
} from "react-icons/fa";

const VotingInterface = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  
  // States for voting and UI
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [positions, setPositions] = useState([]);
  const [electionInfo, setElectionInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get election data on component mount
  useEffect(() => {
    // This would be an API call in a real application
    const fetchElectionData = () => {
      setLoading(true);
      
      // Simulating an API response with election data
      setTimeout(() => {
        // Mock elections data - in a real app this would come from your API
        const elections = {
          "ccs-student-council": {
            id: "ccs-student-council",
            name: "CCS Student Council",
            logo: "/assets/STUDENT-COUNCIL.jpg",
            description: "Student Council Election for College of Computing Sciences",
            candidates: [
              {
                id: 101,
                name: "John Smith",
                position: "President",
                group: "CCS Student Council",
                photo: "/assets/STUDENT-COUNCIL.jpg",
                skills: ["Leadership", "Communication", "Problem Solving"],
                experience: "2 years as Class Representative",
                vision: "I aim to foster a more inclusive and technologically advanced environment for all CCS students."
              },
              {
                id: 102,
                name: "Sarah Johnson",
                position: "President",
                group: "CCS Student Council",
                photo: "/assets/STUDENT-COUNCIL.jpg",
                skills: ["Leadership", "Public Speaking", "Event Organization"],
                experience: "Vice President of Computer Society",
                vision: "My goal is to improve student engagement with industry partners and create more internship opportunities."
              },
              {
                id: 103,
                name: "Michael Chen",
                position: "Vice President",
                group: "CCS Student Council",
                photo: "/assets/STUDENT-COUNCIL.jpg",
                skills: ["Team Management", "Strategic Planning", "Project Coordination"],
                experience: "Project Manager for Hackathon Event",
                vision: "I want to establish more workshops and hands-on learning opportunities for students."
              },
              {
                id: 104,
                name: "Amanda Rodriguez",
                position: "Vice President",
                group: "CCS Student Council",
                photo: "/assets/STUDENT-COUNCIL.jpg",
                skills: ["Leadership", "Innovation", "Communication"],
                experience: "Lead Developer for Student Projects",
                vision: "I aim to bridge the gap between different specializations in the computing sciences."
              },
              {
                id: 105,
                name: "David Wilson",
                position: "Secretary",
                group: "CCS Student Council",
                photo: "/assets/STUDENT-COUNCIL.jpg",
                skills: ["Organization", "Documentation", "Attention to Detail"],
                experience: "Secretary of Programming Club",
                vision: "I will ensure transparent communication and proper documentation of all council activities."
              },
              {
                id: 106,
                name: "Emily Garcia",
                position: "Secretary",
                group: "CCS Student Council",
                photo: "/assets/STUDENT-COUNCIL.jpg",
                skills: ["Documentation", "Time Management", "Communication"],
                experience: "Administrative Assistant for Department Events",
                vision: "I plan to create efficient systems for information dissemination and record keeping."
              },
              {
                id: 107,
                name: "James Taylor",
                position: "Treasurer",
                group: "CCS Student Council",
                photo: "/assets/STUDENT-COUNCIL.jpg",
                skills: ["Financial Management", "Budgeting", "Analytical Thinking"],
                experience: "Treasurer for College Organization",
                vision: "I will ensure financial transparency and proper allocation of resources."
              }
            ]
          },
          "elites": {
            id: "elites",
            name: "ELITES",
            logo: "/assets/ELITES.jpg",
            description: "Empowered League of Information Technology Education Students",
            candidates: [
              {
                id: 201,
                name: "Alex Rivera",
                position: "President",
                group: "ELITES",
                photo: "/assets/ELITES.jpg",
                skills: ["Leadership", "Technical Knowledge", "Mentoring"],
                experience: "IT Project Lead for 3 campus initiatives",
                vision: "I want to create a community where IT students can collaborate and grow their skills."
              },
              {
                id: 202,
                name: "Jessica Patel",
                position: "President",
                group: "ELITES",
                photo: "/assets/ELITES.jpg",
                skills: ["Leadership", "Strategic Planning", "Innovation"],
                experience: "Student Ambassador for Technology Companies",
                vision: "My goal is to bridge the gap between academia and industry in IT education."
              },
              {
                id: 203,
                name: "Ryan Thompson",
                position: "Vice President",
                group: "ELITES",
                photo: "/assets/ELITES.jpg",
                skills: ["Team Building", "Communication", "Technical Skills"],
                experience: "Technical Lead for Student Projects",
                vision: "I plan to establish peer mentoring programs to support IT students."
              },
              {
                id: 204,
                name: "Sophia Kim",
                position: "Secretary",
                group: "ELITES",
                photo: "/assets/ELITES.jpg",
                skills: ["Organization", "Documentation", "Digital Tools"],
                experience: "Digital Content Creator for Department",
                vision: "I will implement digital systems to improve communication and record keeping."
              },
              {
                id: 205,
                name: "Daniel Martinez",
                position: "Treasurer",
                group: "ELITES",
                photo: "/assets/ELITES.jpg",
                skills: ["Financial Planning", "Budget Management", "Accountability"],
                experience: "Finance Officer for Tech Initiatives",
                vision: "I aim to secure more funding opportunities for IT student projects."
              }
            ]
          }
        };
        
        // Get the selected election data based on the URL parameter
        const election = elections[electionId];
        
        if (!election) {
          setError("Election not found. Please return to the dashboard.");
          setLoading(false);
          return;
        }
        
        setElectionInfo(election);
        
        // Group candidates by position
        const positionGroups = election.candidates.reduce((groups, candidate) => {
          const position = candidate.position;
          if (!groups[position]) {
            groups[position] = [];
          }
          groups[position].push(candidate);
          return groups;
        }, {});
        
        // Convert to array format for rendering
        const positionsArray = Object.keys(positionGroups).map(position => ({
          name: position,
          candidates: positionGroups[position]
        }));
        
        setPositions(positionsArray);
        setLoading(false);
      }, 1000);
    };

    fetchElectionData();
  }, [electionId]);

  // Handle candidate selection
  const handleSelectCandidate = (positionName, candidateId) => {
    setSelectedCandidates({
      ...selectedCandidates,
      [positionName]: candidateId
    });
  };

  // Check if all positions have selections
  const allPositionsSelected = () => {
    return positions.every(position => 
      selectedCandidates[position.name] !== undefined
    );
  };

  // Handle submit button click
  const handleSubmitClick = () => {
    if (allPositionsSelected()) {
      setShowConfirmation(true);
    } else {
      // Highlight unselected positions
      setError("Please select a candidate for all positions before submitting.");
      
      // Auto-scroll to the first unselected position
      const firstUnselected = positions.find(position => 
        selectedCandidates[position.name] === undefined
      );
      
      if (firstUnselected) {
        const element = document.getElementById(`position-${firstUnselected.name}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  // Get selected candidate details by position
  const getSelectedCandidate = (positionName) => {
    const candidateId = selectedCandidates[positionName];
    if (!candidateId) return null;
    
    const position = positions.find(p => p.name === positionName);
    if (!position) return null;
    
    return position.candidates.find(c => c.id === candidateId);
  };

  // Handle final vote submission
  const handleFinalSubmit = () => {
    setSubmitting(true);
    
    // This would be an API call to submit votes in a real app
    setTimeout(() => {
      console.log("Submitting votes:", selectedCandidates);
      setSubmitting(false);
      setSubmitSuccess(true);
      
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        navigate("/voter");
      }, 3000);
    }, 1500);
  };

  // Handle back to voting from confirmation modal
  const handleBackToVoting = () => {
    setShowConfirmation(false);
  };

  // Return to dashboard
  const handleBackToDashboard = () => {
    navigate("/voter");
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-5 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Loading election data...</h2>
            <p className="text-gray-500">Please wait while we prepare your ballot.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !electionInfo) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-5 flex items-center justify-center h-screen">
          <div className="text-center bg-white p-8 rounded-xl shadow-md border border-gray-200 max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
              <FaExclamationCircle className="text-3xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{error}</h2>
            <p className="text-gray-600 mb-6">Unable to load the election data.</p>
            <button
              onClick={handleBackToDashboard}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-5">
        {/* Election Header */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 flex items-center">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={electionInfo.logo} 
                  alt={electionInfo.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="ml-6 flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{electionInfo.name}</h1>
              <p className="text-gray-600">{electionInfo.description}</p>
            </div>
            <button
              onClick={handleBackToDashboard}
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Dashboard
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-start">
              <div className="p-3 bg-blue-100 rounded-md mr-4">
                <FaInfo className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-800 mb-2">Voting Instructions</h2>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Select <strong>one candidate</strong> for each position</li>
                  <li>You must vote for all positions to submit your ballot</li>
                  <li>Review your choices carefully in the confirmation screen before final submission</li>
                  <li>Once submitted, your vote cannot be changed</li>
                </ul>
              </div>
              
              <div className="ml-4 bg-orange-100 p-3 rounded-lg">
                <div className="text-sm text-orange-800">
                  <div className="font-semibold mb-1">Ballot Status:</div>
                  <div className="flex items-center">
                    {allPositionsSelected() ? (
                      <>
                        <FaCheckCircle className="text-green-500 mr-2" /> 
                        Ready to submit
                      </>
                    ) : (
                      <>
                        <FaExclamationCircle className="text-orange-500 mr-2" /> 
                        {positions.length - Object.keys(selectedCandidates).length} positions left
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationCircle className="text-red-500 mt-0.5" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button 
                className="ml-auto text-red-500 hover:text-red-700" 
                onClick={() => setError(null)}
              >
                <FaTimesCircle />
              </button>
            </div>
          </div>
        )}
        
        {/* Voting Sections by Position */}
        {positions.map((position) => (
          <div 
            key={position.name} 
            id={`position-${position.name}`}
            className={`mb-8 bg-white rounded-xl shadow-md border ${
              selectedCandidates[position.name] ? 'border-green-200' : 'border-gray-200'
            }`}
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {position.name}
              </h2>
              <div>
                <span className="text-gray-500 text-sm">
                  Select one candidate
                </span>
                {selectedCandidates[position.name] && (
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheck className="mr-1" /> Selected
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {position.candidates.map((candidate) => (
                  <label 
                    key={candidate.id}
                    htmlFor={`candidate-${candidate.id}`}
                    className={`relative block cursor-pointer rounded-xl border p-4 transition-all ${
                      selectedCandidates[position.name] === candidate.id 
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-500' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      id={`candidate-${candidate.id}`}
                      name={`position-${position.name}`}
                      value={candidate.id}
                      className="sr-only"
                      checked={selectedCandidates[position.name] === candidate.id}
                      onChange={() => handleSelectCandidate(position.name, candidate.id)}
                    />
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
                          selectedCandidates[position.name] === candidate.id 
                            ? 'border-green-500' 
                            : 'border-gray-200'
                        }`}>
                          <img 
                            src={candidate.photo} 
                            alt={candidate.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{candidate.name}</div>
                        
                        <div className="mt-1">
                          <div className="text-xs font-medium text-gray-500 mb-1">Skills</div>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map((skill, idx) => (
                              <span key={idx} className="inline-flex text-xs leading-5 font-medium bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="text-xs font-medium text-gray-500 mb-1">Vision</div>
                          <p className="text-sm text-gray-700 line-clamp-2">{candidate.vision}</p>
                        </div>
                      </div>
                      
                      {selectedCandidates[position.name] === candidate.id && (
                        <div className="absolute top-4 right-4 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center">
                          <FaCheck size={12} />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-t-xl shadow-md z-10">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <p className="text-sm text-gray-600">
                {allPositionsSelected() 
                  ? "All positions selected. Your ballot is ready for submission." 
                  : `Please select candidates for ${positions.length - Object.keys(selectedCandidates).length} more position(s).`
                }
              </p>
            </div>
            <button
              onClick={handleSubmitClick}
              disabled={!allPositionsSelected()}
              className={`flex items-center py-2 px-6 rounded-lg font-medium ${
                allPositionsSelected() 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-all`}
            >
              <FaVoteYea className="mr-2" /> Submit Ballot
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Confirm Your Vote</h2>
              <p className="text-gray-600">Please review your selections before final submission</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {positions.map((position) => (
                  <div key={position.name} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">{position.name}</h3>
                    
                    {getSelectedCandidate(position.name) ? (
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-green-500">
                          <img 
                            src={getSelectedCandidate(position.name).photo} 
                            alt={getSelectedCandidate(position.name).name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {getSelectedCandidate(position.name).name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getSelectedCandidate(position.name).experience}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-red-500">No candidate selected</div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="text-orange-500 mt-0.5">
                    <FaExclamationCircle />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-orange-800">Important Notice</h3>
                    <p className="text-orange-700 text-sm">
                      Your vote is final once submitted and cannot be changed. Please ensure your selections are correct.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleBackToVoting}
                className="py-2 px-6 border border-gray-300 hover:bg-gray-100 rounded-lg flex items-center font-medium text-gray-700 transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Back to Ballot
              </button>
              
              <button
                onClick={handleFinalSubmit}
                disabled={submitting}
                className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center font-medium transition-colors"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" /> Confirm and Submit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submitSuccess && (
        <div className="fixed inset-0 backdrop-blur-md bg-black bg-opacity-20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Vote Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for participating in the {electionInfo.name} election.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
              <p className="text-gray-800 font-medium">Your vote has been recorded for:</p>
              <ul className="mt-2 space-y-1 text-gray-600">
                {positions.map((position) => (
                  <li key={position.name} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    {position.name}: {getSelectedCandidate(position.name).name}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              You will be redirected to the dashboard shortly.
            </p>
            
            <button
              onClick={handleBackToDashboard}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg transition-colors mx-auto"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingInterface;