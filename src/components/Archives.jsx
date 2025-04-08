import React, { useState } from "react";
import Header from "./header";
import { FaSearch, FaClipboardList, FaVoteYea } from "react-icons/fa";

const Archives = () => {
  // Sample data for Candidates Archive Table (changed from useState to constant)
  const candidatesArchive = [
    { archiveId: 1, candidateId: 101, name: "John Smith", group: "CCS Student Council", position: "President", archivedYear: 2023, createdAt: "2023-03-15", votes: 254 },
    { archiveId: 2, candidateId: 102, name: "Maria Garcia", group: "ELITES", position: "Secretary", archivedYear: 2023, createdAt: "2023-03-10", votes: 187 },
    { archiveId: 3, candidateId: 103, name: "David Johnson", group: "SPECS", position: "Treasurer", archivedYear: 2022, createdAt: "2022-02-28", votes: 203 },
    { archiveId: 4, candidateId: 104, name: "Linda Chen", group: "IMAGES", position: "President", archivedYear: 2022, createdAt: "2022-03-05", votes: 312 },
  ];

  // Sample data for Votes Archive Table (changed from useState to constant)
  const votesArchive = [
    { id: 1, voterId: "V2023001", userId: "U1001", candidateId: 101, position: "President", groupName: "CCS Student Council", voteTime: "2023-03-20 14:30:25", archiveYear: 2023 },
    { id: 2, voterId: "V2023002", userId: "U1002", candidateId: 102, position: "Secretary", groupName: "ELITES", voteTime: "2023-03-20 15:45:12", archiveYear: 2023 },
    { id: 3, voterId: "V2022001", userId: "U1003", candidateId: 103, position: "Treasurer", groupName: "SPECS", voteTime: "2022-03-18 10:22:47", archiveYear: 2022 },
    { id: 4, voterId: "V2022002", userId: "U1004", candidateId: 104, position: "President", groupName: "IMAGES", voteTime: "2022-03-18 11:15:33", archiveYear: 2022 },
  ];

  // Search states
  const [candidatesSearchTerm, setCandidatesSearchTerm] = useState("");
  const [votesSearchTerm, setVotesSearchTerm] = useState("");
  const [filteredCandidatesArchive, setFilteredCandidatesArchive] = useState(candidatesArchive);
  const [filteredVotesArchive, setFilteredVotesArchive] = useState(votesArchive);

  // Handle Candidates Archive search
  const handleCandidatesSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setCandidatesSearchTerm(term);
    setFilteredCandidatesArchive(
      candidatesArchive.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(term) ||
          candidate.group.toLowerCase().includes(term) ||
          candidate.position.toLowerCase().includes(term) ||
          candidate.archivedYear.toString().includes(term) ||
          candidate.candidateId.toString().includes(term)
      )
    );
  };

  // Handle Votes Archive search
  const handleVotesSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setVotesSearchTerm(term);
    setFilteredVotesArchive(
      votesArchive.filter(
        (vote) =>
          vote.voterId.toLowerCase().includes(term) ||
          vote.userId.toLowerCase().includes(term) ||
          vote.candidateId.toString().includes(term) ||
          vote.position.toLowerCase().includes(term) ||
          vote.groupName.toLowerCase().includes(term) ||
          vote.voteTime.includes(term) ||
          vote.archiveYear.toString().includes(term)
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5 mt-5">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Archives</h1>
        </div>

        {/* Candidates Archive Table */}
        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FaClipboardList className="text-orange-600 text-xl mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Candidates Archive Table</h2>
              </div>
              <div className="relative w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-orange-500" />
                </div>
                <input
                  type="text"
                  value={candidatesSearchTerm}
                  onChange={handleCandidatesSearch}
                  placeholder="Search candidates archives..."
                  className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-orange-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Archive ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Candidate ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Archived Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Votes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCandidatesArchive.map((candidate) => (
                    <tr key={candidate.archiveId} className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.archiveId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.candidateId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.group}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.archivedYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm bg-green-50 text-green-700 font-medium">
                        {candidate.votes}
                      </td>
                    </tr>
                  ))}
                  {filteredCandidatesArchive.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center">
                        <p className="text-gray-500 text-lg">No candidate archives found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Votes Archive Table */}
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FaVoteYea className="text-orange-600 text-xl mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Votes Archive Table</h2>
              </div>
              <div className="relative w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-orange-500" />
                </div>
                <input
                  type="text"
                  value={votesSearchTerm}
                  onChange={handleVotesSearch}
                  placeholder="Search votes archives..."
                  className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-orange-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Voter ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Candidate ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Group Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Vote Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Archive Year
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVotesArchive.map((vote) => (
                    <tr key={vote.id} className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.voterId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.candidateId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.groupName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.voteTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.archiveYear}
                      </td>
                    </tr>
                  ))}
                  {filteredVotesArchive.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center">
                        <p className="text-gray-500 text-lg">No vote archives found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archives;