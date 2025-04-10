import React from "react";
import VoterSidebar from "../../components/voter/VoterSidebar";
import VoterDashboard from "../../components/voter/voterDashboard"; 
import VoterHeader from "../../components/voter/voterHeader";

const Voter = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}> 
      {/* Sidebar and Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <VoterSidebar />

        {/* Main Content */}
        <div className="flex-grow-1">
          <VoterHeader />
          <VoterDashboard />
        </div>
      </div>
    </div>
  );
};

export default Voter;
