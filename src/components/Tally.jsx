import React, { useState, useRef } from "react";
import {
  FaFilter, FaEye, FaTrophy, FaTimesCircle, FaMedal
} from "react-icons/fa";
import Header from "./header";

const Tally = () => {
  const councils = {
    "CCS Student Council": {
      President: { 
        labels: ["John Smith", "Maria Rodriguez", "David Chen"], 
        data: [120, 150, 100],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)"]
      },
      "Vice President": { 
        labels: ["Sarah Johnson", "Michael Lee"], 
        data: [80, 90],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
      "Secretary": { 
        labels: ["Emma Davis", "Robert Wilson", "Lisa Taylor"], 
        data: [110, 95, 130],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)"]
      },
      "Treasurer": { 
        labels: ["Daniel Brown", "Jessica Martinez"], 
        data: [105, 115],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
    },
    "ELITES": {
      President: { 
        labels: ["Alex Thompson", "Maya Patel", "James Rivera"], 
        data: [100, 120, 110],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)"]
      },
      "Vice President": { 
        labels: ["Sophia Garcia", "Noah Kim"], 
        data: [85, 95],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
      Secretary: { 
        labels: ["Olivia Chen", "Ethan Wright"], 
        data: [60, 70],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
    },
    "SPECS": {
      President: { 
        labels: ["Isabella Lopez", "William Johnson"], 
        data: [115, 105],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
      Treasurer: { 
        labels: ["Ava Scott", "Benjamin Lee"], 
        data: [90, 50],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
      Secretary: { 
        labels: ["Mia Clark", "Lucas Martin"], 
        data: [80, 60],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
    },
    "IMAGES": {
      President: { 
        labels: ["Charlotte Adams", "Henry Wilson", "Amelia Davis"], 
        data: [110, 130, 120],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)"]
      },
      "Vice President": { 
        labels: ["Liam Park", "Harper Jones"], 
        data: [75, 85],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
      Treasurer: { 
        labels: ["Evelyn Brown", "Mason Taylor"], 
        data: [70, 80],
        colors: ["rgba(234, 88, 12, 0.8)", "rgba(59, 130, 246, 0.8)"]
      },
    },
  };

  const [selectedCouncil, setSelectedCouncil] = useState("CCS Student Council");
  const [positions, setPositions] = useState(Object.keys(councils[selectedCouncil]));
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [showWinners, setShowWinners] = useState(false);
  const tableRef = useRef(null);

  // Function to get all winners for each organization
  const getAllWinners = () => {
    const allWinners = {};
    
    Object.keys(councils).forEach(council => {
      allWinners[council] = {};
      
      Object.keys(councils[council]).forEach(position => {
        const positionData = councils[council][position];
        const highestVotes = Math.max(...positionData.data);
        const winnerIndex = positionData.data.indexOf(highestVotes);
        const totalVotes = positionData.data.reduce((sum, votes) => sum + votes, 0);
        const percentage = ((highestVotes / totalVotes) * 100).toFixed(2);
        
        allWinners[council][position] = {
          name: positionData.labels[winnerIndex],
          votes: highestVotes,
          percentage: percentage
        };
      });
    });
    
    return allWinners;
  };

  const handleCouncilSelect = (council) => {
    setSelectedCouncil(council);
    setPositions(Object.keys(councils[council]));
    setCurrentPositionIndex(0);
  };

  const handleSelectPosition = (index) => {
    setCurrentPositionIndex(index);
  };

  const currentPosition = positions[currentPositionIndex];
  const currentData = councils[selectedCouncil][currentPosition];
  const totalVotes = currentData.data.reduce((sum, votes) => sum + votes, 0);
  
  // Find highest vote getter (winner)
  const highestVotes = Math.max(...currentData.data);
  const winnerIndex = currentData.data.indexOf(highestVotes);
  const winnerName = currentData.labels[winnerIndex];
  
  // Calculate vote percentages
  const votePercentages = currentData.data.map(votes => ((votes / totalVotes) * 100).toFixed(2));

  // Prepare sorted candidate data for display
  const sortedCandidates = currentData.labels.map((name, index) => ({
    name,
    votes: currentData.data[index],
    percentage: votePercentages[index],
    isWinner: index === winnerIndex
  })).sort((a, b) => b.votes - a.votes); // Sort by votes high to low

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-3 bg-orange-500 rounded-lg text-white mr-4">
                <FaEye className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Election Results Tally</h1>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() => setShowWinners(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center"
              >
                <FaTrophy className="mr-2" />
                View Winners
              </button>
            </div>
          </div>
        </div>

        {/* Council Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center flex-wrap gap-2">
            <div className="font-medium text-gray-600 flex items-center mr-2">
              <FaFilter className="mr-1 text-orange-500" /> Council:
            </div>
            {Object.keys(councils).map((council) => (
              <button
                key={council}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCouncil === council
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => handleCouncilSelect(council)}
              >
                {council}
              </button>
            ))}
          </div>
        </div>
        
        {/* Position Navigation */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="font-medium text-gray-600 mb-2 flex items-center">
            <FaEye className="mr-1 text-orange-500" /> Position:
          </div>
          <div className="flex flex-wrap gap-2">
            {positions.map((position, index) => (
              <button
                key={position}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPositionIndex === index
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => handleSelectPosition(index)}
              >
                {position}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Total Votes Card */}
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="text-sm text-gray-500 mb-1">Total Votes Cast</div>
            <div className="text-2xl font-bold text-gray-800">{totalVotes}</div>
            <div className="text-xs text-gray-500 mt-1">For {currentPosition} position</div>
          </div>
          
          {/* Leading Candidate Card */}
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="text-sm text-gray-500 mb-1">Leading Candidate</div>
            <div className="flex items-center">
              <FaTrophy className="text-orange-500 mr-2" />
              <div className="text-2xl font-bold text-gray-800">{winnerName}</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {highestVotes} votes ({((highestVotes / totalVotes) * 100).toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div ref={tableRef}>
            <div className="overflow-x-auto" id="resultsTable">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vote Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visual
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCandidates.map((candidate, index) => (
                    <tr key={candidate.name} className={candidate.isWinner ? "bg-orange-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {index === 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              <FaTrophy className="mr-1 text-orange-500" /> {index + 1}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {index + 1}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.votes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.percentage}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-orange-600 h-2.5 rounded-full" 
                            style={{ width: `${candidate.percentage}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Winners Modal with blurry backdrop */}
      {showWinners && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex justify-between items-center">
              <div className="flex items-center">
                <FaTrophy className="text-2xl mr-3" />
                <h2 className="text-xl font-bold">Election Winners</h2>
              </div>
              <button 
                onClick={() => setShowWinners(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimesCircle className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="space-y-8">
                {Object.entries(getAllWinners()).map(([council, positions]) => (
                  <div key={council} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <span className="w-2 h-6 bg-orange-500 rounded-full mr-2"></span>
                      {council}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(positions).map(([position, winner]) => (
                        <div 
                          key={position} 
                          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h4 className="text-sm font-medium text-gray-500 mb-1">{position}</h4>
                          <div className="flex items-center mb-2">
                            <FaMedal className="text-amber-500 mr-2" />
                            <span className="text-lg font-bold text-gray-800">{winner.name}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {winner.votes} votes ({winner.percentage}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowWinners(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tally;