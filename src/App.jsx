import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin/admin"; // Adjust the path if necessary
import Login from "./pages/login"; // Example: Login page
import Create from "./components/Create"; // Import Create page
import Tally from "./components/Tally"; // Import Tally page
import Accounts from "./components/Accounts"; // Import Accounts page
import Archives from "./components/Archives"; // Import Archives page
import AdminSidebar from "./components/AdminSidebar"; // Import AdminSidebar
import ViewCandidate from "./components/ViewCandidate"; // Import ViewCandidate

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
      </Routes>
    </Router>
  );
};

export default App;