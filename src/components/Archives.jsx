import React, { useState, useEffect, useMemo } from "react";
import Header from "./header";
import { 
  FaSearch, FaClipboardList, FaVoteYea, FaDownload, FaFilter, 
FaChartBar,   FaChevronDown, FaChevronUp, FaRegCalendarAlt,
  FaSort, FaSortUp, FaSortDown, FaEye, FaChevronLeft, FaChevronRight,
  FaUsers, FaTrophy, FaRegClock
} from "react-icons/fa";

const Archives = () => {
  // Sample data with more entries for pagination demo
  const candidatesArchiveData = [
    { archiveId: 1, candidateId: 101, name: "John Smith", group: "CCS Student Council", position: "President", archivedYear: 2023, createdAt: "2023-03-15", votes: 254 },
    { archiveId: 2, candidateId: 102, name: "Maria Garcia", group: "ELITES", position: "Secretary", archivedYear: 2023, createdAt: "2023-03-10", votes: 187 },
    { archiveId: 3, candidateId: 103, name: "David Johnson", group: "SPECS", position: "Treasurer", archivedYear: 2022, createdAt: "2022-02-28", votes: 203 },
    { archiveId: 4, candidateId: 104, name: "Linda Chen", group: "IMAGES", position: "President", archivedYear: 2022, createdAt: "2022-03-05", votes: 312 },
    { archiveId: 5, candidateId: 105, name: "Robert Wilson", group: "CCS Student Council", position: "Vice President", archivedYear: 2023, createdAt: "2023-03-12", votes: 229 },
    { archiveId: 6, candidateId: 106, name: "Emma Rodriguez", group: "ELITES", position: "Treasurer", archivedYear: 2023, createdAt: "2023-03-08", votes: 176 },
    { archiveId: 7, candidateId: 107, name: "James Taylor", group: "SPECS", position: "Secretary", archivedYear: 2022, createdAt: "2022-02-25", votes: 198 },
    { archiveId: 8, candidateId: 108, name: "Olivia Martinez", group: "IMAGES", position: "Vice President", archivedYear: 2022, createdAt: "2022-03-01", votes: 287 },
  ];

  const votesArchiveData = [
    { id: 1, voterId: "V2023001", userId: "U1001", candidateId: 101, position: "President", groupName: "CCS Student Council", voteTime: "2023-03-20 14:30:25", archiveYear: 2023 },
    { id: 2, voterId: "V2023002", userId: "U1002", candidateId: 102, position: "Secretary", groupName: "ELITES", voteTime: "2023-03-20 15:45:12", archiveYear: 2023 },
    { id: 3, voterId: "V2022001", userId: "U1003", candidateId: 103, position: "Treasurer", groupName: "SPECS", voteTime: "2022-03-18 10:22:47", archiveYear: 2022 },
    { id: 4, voterId: "V2022002", userId: "U1004", candidateId: 104, position: "President", groupName: "IMAGES", voteTime: "2022-03-18 11:15:33", archiveYear: 2022 },
    { id: 5, voterId: "V2023003", userId: "U1005", candidateId: 105, position: "Vice President", groupName: "CCS Student Council", voteTime: "2023-03-20 16:12:38", archiveYear: 2023 },
    { id: 6, voterId: "V2023004", userId: "U1006", candidateId: 106, position: "Treasurer", groupName: "ELITES", voteTime: "2023-03-20 17:25:54", archiveYear: 2023 },
    { id: 7, voterId: "V2022003", userId: "U1007", candidateId: 107, position: "Secretary", groupName: "SPECS", voteTime: "2022-03-18 12:36:19", archiveYear: 2022 },
    { id: 8, voterId: "V2022004", userId: "U1008", candidateId: 108, position: "Vice President", groupName: "IMAGES", voteTime: "2022-03-18 13:47:22", archiveYear: 2022 },
    { id: 9, voterId: "V2023005", userId: "U1009", candidateId: 101, position: "President", groupName: "CCS Student Council", voteTime: "2023-03-21 09:18:43", archiveYear: 2023 },
    { id: 10, voterId: "V2023006", userId: "U1010", candidateId: 102, position: "Secretary", groupName: "ELITES", voteTime: "2023-03-21 10:29:57", archiveYear: 2023 },
    { id: 11, voterId: "V2022005", userId: "U1011", candidateId: 103, position: "Treasurer", groupName: "SPECS", voteTime: "2022-03-19 14:51:08", archiveYear: 2022 },
    { id: 12, voterId: "V2022006", userId: "U1012", candidateId: 104, position: "President", groupName: "IMAGES", voteTime: "2022-03-19 15:22:31", archiveYear: 2022 },
  ];

  // State variables
  const [activeTab, setActiveTab] = useState("candidates");
  const [candidatesSearchTerm, setCandidatesSearchTerm] = useState("");
  const [votesSearchTerm, setVotesSearchTerm] = useState("");
  const [candidatesYearFilter, setCandidatesYearFilter] = useState("all");
  const [votesYearFilter, setVotesYearFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Sorting states
  const [candidatesSortField, setCandidatesSortField] = useState("archiveId");
  const [candidatesSortDirection, setCandidatesSortDirection] = useState("asc");
  const [votesSortField, setVotesSortField] = useState("id");
  const [votesSortDirection, setVotesSortDirection] = useState("asc");
  
  // Pagination states
  const [candidatesPage, setCandidatesPage] = useState(1);
  const [votesPage, setVotesPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Load data with a simulated delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort candidates data
  const filteredCandidates = useMemo(() => {
    return candidatesArchiveData
      .filter(candidate => 
        (candidatesYearFilter === "all" || candidate.archivedYear.toString() === candidatesYearFilter) &&
        (candidatesSearchTerm === "" || 
          candidate.name.toLowerCase().includes(candidatesSearchTerm.toLowerCase()) ||
          candidate.group.toLowerCase().includes(candidatesSearchTerm.toLowerCase()) ||
          candidate.position.toLowerCase().includes(candidatesSearchTerm.toLowerCase()) ||
          candidate.candidateId.toString().includes(candidatesSearchTerm))
      )
      .sort((a, b) => {
        const aValue = a[candidatesSortField];
        const bValue = b[candidatesSortField];
        
        if (candidatesSortDirection === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
  }, [candidatesArchiveData, candidatesSearchTerm, candidatesYearFilter, candidatesSortField, candidatesSortDirection]);

  // Filter and sort votes data
  const filteredVotes = useMemo(() => {
    return votesArchiveData
      .filter(vote => 
        (votesYearFilter === "all" || vote.archiveYear.toString() === votesYearFilter) &&
        (votesSearchTerm === "" || 
          vote.voterId.toLowerCase().includes(votesSearchTerm.toLowerCase()) ||
          vote.userId.toLowerCase().includes(votesSearchTerm.toLowerCase()) ||
          vote.candidateId.toString().includes(votesSearchTerm) ||
          vote.position.toLowerCase().includes(votesSearchTerm.toLowerCase()) ||
          vote.groupName.toLowerCase().includes(votesSearchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        const aValue = a[votesSortField];
        const bValue = b[votesSortField];
        
        if (votesSortDirection === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
  }, [votesArchiveData, votesSearchTerm, votesYearFilter, votesSortField, votesSortDirection]);

  // Calculate pages for pagination
  const totalCandidatesPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const totalVotesPages = Math.ceil(filteredVotes.length / itemsPerPage);
  
  // Get current page items
  const currentCandidates = filteredCandidates.slice(
    (candidatesPage - 1) * itemsPerPage,
    candidatesPage * itemsPerPage
  );
  
  const currentVotes = filteredVotes.slice(
    (votesPage - 1) * itemsPerPage,
    votesPage * itemsPerPage
  );

  // Calculate statistics for dashboard
  const stats = useMemo(() => {
    const years = [...new Set([
      ...candidatesArchiveData.map(c => c.archivedYear),
      ...votesArchiveData.map(v => v.archiveYear)
    ])].sort((a, b) => b - a);
    
    const totalCandidates = candidatesArchiveData.length;
    const totalVotes = votesArchiveData.length;
    const totalGroups = [...new Set(candidatesArchiveData.map(c => c.group))].length;
    
    return { years, totalCandidates, totalVotes, totalGroups };
  }, [candidatesArchiveData, votesArchiveData]);

  // Sorting handlers
  const handleCandidatesSort = (field) => {
    if (candidatesSortField === field) {
      setCandidatesSortDirection(candidatesSortDirection === "asc" ? "desc" : "asc");
    } else {
      setCandidatesSortField(field);
      setCandidatesSortDirection("asc");
    }
  };

  const handleVotesSort = (field) => {
    if (votesSortField === field) {
      setVotesSortDirection(votesSortDirection === "asc" ? "desc" : "asc");
    } else {
      setVotesSortField(field);
      setVotesSortDirection("asc");
    }
  };

  // Get appropriate sort icon
  const getSortIcon = (field, currentSortField, direction) => {
    if (field !== currentSortField) return <FaSort className="text-gray-400" />;
    return direction === "asc" ? <FaSortUp className="text-orange-600" /> : <FaSortDown className="text-orange-600" />;
  };

  // Format date string for better display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes(" ")) {
      // Handle datetime format
      const [date, time] = dateString.split(" ");
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year} ${time}`;
    }
    // Handle date only format
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-6">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-xl shadow-md border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaClipboardList className="text-orange-600 mr-3" />
                Archives Dashboard
              </h1>
              <p className="text-gray-600 mt-1">View and analyze historical election data</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Archives Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FaClipboardList className="text-2xl text-orange-600" />
                </div>
              </div>
              <h3 className="text-base font-medium text-gray-500">Total Archived Candidates</h3>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{stats.totalCandidates}</p>
                <span className="text-sm text-orange-600 font-medium mb-1">From {stats.years.length} elections</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 w-full"></div>
          </div>

          {/* Total Votes Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaVoteYea className="text-2xl text-blue-600" />
                </div>
              </div>
              <h3 className="text-base font-medium text-gray-500">Total Archived Votes</h3>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{stats.totalVotes}</p>
                <span className="text-sm text-blue-600 font-medium mb-1">Across all elections</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 w-full"></div>
          </div>

          {/* Total Organizations Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaUsers className="text-2xl text-green-600" />
                </div>
              </div>
              <h3 className="text-base font-medium text-gray-500">Organizations</h3>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{stats.totalGroups}</p>
                <span className="text-sm text-green-600 font-medium mb-1">Student Organizations</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 w-full"></div>
          </div>

          {/* Archive Years Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaRegCalendarAlt className="text-2xl text-purple-600" />
                </div>
              </div>
              <h3 className="text-base font-medium text-gray-500">Archive Years</h3>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{stats.years.length}</p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {stats.years.slice(0, 3).map(year => (
                    <span key={year} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {year}
                    </span>
                  ))}
                  {stats.years.length > 3 && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      +{stats.years.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 w-full"></div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              className={`py-3 px-4 font-medium text-sm border-b-2 ${
                activeTab === "candidates"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition-colors duration-200 focus:outline-none`}
              onClick={() => setActiveTab("candidates")}
            >
              <div className="flex items-center">
                <FaClipboardList className={`mr-2 ${activeTab === "candidates" ? "text-orange-600" : "text-gray-500"}`} />
                Candidates Archives
              </div>
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm border-b-2 ${
                activeTab === "votes"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition-colors duration-200 focus:outline-none`}
              onClick={() => setActiveTab("votes")}
            >
              <div className="flex items-center">
                <FaVoteYea className={`mr-2 ${activeTab === "votes" ? "text-orange-600" : "text-gray-500"}`} />
                Votes Archives
              </div>
            </button>
          </div>
        </div>

        {/* Candidates Archive Section */}
        {activeTab === "candidates" && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              {/* Search and Filter Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaClipboardList className="text-orange-600 mr-2" />
                  Candidates Archives
                </h2>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaFilter className="text-gray-500" />
                    </div>
                    <select
                      value={candidatesYearFilter}
                      onChange={(e) => {
                        setCandidatesYearFilter(e.target.value);
                        setCandidatesPage(1);
                      }}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white text-sm"
                    >
                      <option value="all">All Years</option>
                      {stats.years.map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="text-xs" />
                    </div>
                  </div>
                  
                  <div className="relative w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={candidatesSearchTerm}
                      onChange={(e) => {
                        setCandidatesSearchTerm(e.target.value);
                        setCandidatesPage(1);
                      }}
                      placeholder="Search candidates..."
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-sm"
                    />
                    {candidatesSearchTerm && (
                      <button
                        onClick={() => setCandidatesSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="text-sm text-gray-600 mb-4">
                Showing {currentCandidates.length} of {filteredCandidates.length} candidates
                {candidatesYearFilter !== "all" && <span> from {candidatesYearFilter}</span>}
                {candidatesSearchTerm && <span> matching "{candidatesSearchTerm}"</span>}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                {isLoading ? (
                  // Loading skeleton
                  <div className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded mb-4"></div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
                    ))}
                  </div>
                ) : filteredCandidates.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          { field: "archiveId", label: "Archive ID" },
                          { field: "candidateId", label: "Candidate ID" },
                          { field: "name", label: "Name" },
                          { field: "group", label: "Organization" },
                          { field: "position", label: "Position" },
                          { field: "archivedYear", label: "Archived Year" },
                          { field: "createdAt", label: "Created At" },
                          { field: "votes", label: "Votes" },
                        ].map(({ field, label }) => (
                          <th
                            key={field}
                            onClick={() => handleCandidatesSort(field)}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <span>{label}</span>
                              <div className="ml-1">
                                {getSortIcon(field, candidatesSortField, candidatesSortDirection)}
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentCandidates.map((candidate) => (
                        <tr key={candidate.archiveId} className="hover:bg-orange-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            #{candidate.archiveId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {candidate.candidateId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {candidate.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              candidate.group === "CCS Student Council" ? "bg-blue-100 text-blue-800" :
                              candidate.group === "ELITES" ? "bg-purple-100 text-purple-800" :
                              candidate.group === "SPECS" ? "bg-green-100 text-green-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {candidate.group}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {candidate.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {candidate.archivedYear}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(candidate.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                              {candidate.votes}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredCandidates.length === 0 && (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center">
                            <p className="text-gray-500 text-lg">No candidate archives found.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No candidate archives found.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                  Page {candidatesPage} of {totalCandidatesPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCandidatesPage((prev) => Math.max(prev - 1, 1))}
                    disabled={candidatesPage === 1}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      candidatesPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => setCandidatesPage((prev) => Math.min(prev + 1, totalCandidatesPages))}
                    disabled={candidatesPage === totalCandidatesPages}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      candidatesPage === totalCandidatesPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Votes Archive Section */}
        {activeTab === "votes" && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              {/* Search and Filter Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaVoteYea className="text-orange-600 mr-2" />
                  Votes Archives
                </h2>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaFilter className="text-gray-500" />
                    </div>
                    <select
                      value={votesYearFilter}
                      onChange={(e) => {
                        setVotesYearFilter(e.target.value);
                        setVotesPage(1);
                      }}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white text-sm"
                    >
                      <option value="all">All Years</option>
                      {stats.years.map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="text-xs" />
                    </div>
                  </div>
                  
                  <div className="relative w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={votesSearchTerm}
                      onChange={(e) => {
                        setVotesSearchTerm(e.target.value);
                        setVotesPage(1);
                      }}
                      placeholder="Search votes..."
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-sm"
                    />
                    {votesSearchTerm && (
                      <button
                        onClick={() => setVotesSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="text-sm text-gray-600 mb-4">
                Showing {currentVotes.length} of {filteredVotes.length} votes
                {votesYearFilter !== "all" && <span> from {votesYearFilter}</span>}
                {votesSearchTerm && <span> matching "{votesSearchTerm}"</span>}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                {isLoading ? (
                  // Loading skeleton
                  <div className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded mb-4"></div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
                    ))}
                  </div>
                ) : filteredVotes.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          { field: "id", label: "ID" },
                          { field: "voterId", label: "Voter ID" },
                          { field: "userId", label: "User ID" },
                          { field: "candidateId", label: "Candidate ID" },
                          { field: "position", label: "Position" },
                          { field: "groupName", label: "Organization" },
                          { field: "voteTime", label: "Vote Time" },
                          { field: "archiveYear", label: "Archive Year" }
                        ].map(({ field, label }) => (
                          <th
                            key={field}
                            onClick={() => handleVotesSort(field)}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <span>{label}</span>
                              <div className="ml-1">
                                {getSortIcon(field, votesSortField, votesSortDirection)}
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentVotes.map((vote) => (
                        <tr key={vote.id} className="hover:bg-orange-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            #{vote.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {vote.voterId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {vote.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {vote.candidateId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {vote.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              vote.groupName === "CCS Student Council" ? "bg-blue-100 text-blue-800" :
                              vote.groupName === "ELITES" ? "bg-purple-100 text-purple-800" :
                              vote.groupName === "SPECS" ? "bg-green-100 text-green-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {vote.groupName}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(vote.voteTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {vote.archiveYear}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredVotes.length === 0 && (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center">
                            <p className="text-gray-500 text-lg">No vote archives found.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No vote archives found.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                  Page {votesPage} of {totalVotesPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setVotesPage((prev) => Math.max(prev - 1, 1))}
                    disabled={votesPage === 1}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      votesPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => setVotesPage((prev) => Math.min(prev + 1, totalVotesPages))}
                    disabled={votesPage === totalVotesPages}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      votesPage === totalVotesPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archives;