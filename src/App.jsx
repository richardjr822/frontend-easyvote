import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin/admin"; 
import Login from "./pages/login";
import Create from "./components/Create";
import Tally from "./components/Tally";
import Accounts from "./components/Accounts";
import Archives from "./components/Archives";
import AdminSidebar from "./components/AdminSidebar";
import ViewCandidate from "./components/ViewCandidate";
import Voter from "./pages/voter/voter";

// Import voter components
import VoterSidebar from "./components/voter/VoterSidebar";
import VoterHeader from "./components/voter/voterHeader";
import Candidates from "./components/voter/Candidates";
import VoterDashboard from "./components/voter/voterdashboard";
import VotingInterface from "./components/voter/votingInterface";

// AdminLayout Component
const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <AdminSidebar />
        {/* Main Content */}
        <div className="flex-grow-1">{children}</div>
      </div>
    </div>
  );
};

// VoterLayout Component
const VoterLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <VoterSidebar />
        {/* Main Content */}
        <div className="flex-grow-1">{children}</div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          }
        />
        <Route
          path="/create"
          element={
            <AdminLayout>
              <Create />
            </AdminLayout>
          }
        />
        <Route
          path="/tally"
          element={
            <AdminLayout>
              <Tally />
            </AdminLayout>
          }
        />
        <Route
          path="/accounts"
          element={
            <AdminLayout>
              <Accounts />
            </AdminLayout>
          }
        />
        <Route
          path="/archives"
          element={
            <AdminLayout>
              <Archives />
            </AdminLayout>
          }
        />
        <Route
          path="/view-candidates"
          element={
            <AdminLayout>
              <ViewCandidate />
            </AdminLayout>
          }
        />

        {/* Voter Routes */}
        <Route 
          path="/voter" element={
            <VoterLayout>
                <VoterDashboard />
            </VoterLayout>
          } 
        />
        <Route 
          path="/Candidates" element={
            <VoterLayout>
                <Candidates />
            </VoterLayout>
          } 
        />
        <Route 
          path="/voting-interface/:electionId" element={<VotingInterface />} />
      </Routes>
    </Router>
  );
};

export default App;