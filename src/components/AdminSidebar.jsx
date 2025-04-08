import React from "react";
import { FaUserCircle, FaHome, FaUserPlus, FaClipboardList, FaUsers, FaArchive, FaSignOutAlt } from "react-icons/fa"; // Import icons
import { useLocation } from "react-router-dom"; // Import useLocation hook

const AdminSidebar = () => {
  const location = useLocation(); // Get the current route

  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#000",
    color: "white",
    minHeight: "102vh",
    padding: "30px",
    position: "fixed",
    borderRadius: "30px",
    margin: "-8px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const userIconStyle = {
    fontSize: "100px",
    color: "#D3D3D3",
    marginBottom: "4px",
  };

  const userInfoStyle = {
    margin: "40px 5px -100px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const userNameStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#D3D3D3",
  };

  const userRoleStyle = {
    fontSize: "12px",
    color: "#A9A9A9",
  };

  const menuItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    padding: "10px 35px",
    margin: "10px 10px 10px",
    backgroundColor: isActive ? "#DC5F00" : "#D3D3D3", // Orange if active, gray otherwise
    borderRadius: "15px",
    color: isActive ? "white" : "black", // White text if active, black otherwise
    textDecoration: "none",
    transition: "background-color 0.3s ease, color 0.3s ease",
  });

  const iconStyle = (isActive) => ({
    fontSize: "20px",
    marginRight: "10px",
    color: isActive ? "white" : "black", // White icon if active, black otherwise
    transition: "color 0.3s ease",
  });

  const spanStyle = {
    fontSize: "16px",
    fontWeight: "500",
  };

  const logoutStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "#D3D3D3",
    borderRadius: "50%",
    margin: "0 auto",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const logoutIconStyle = {
    fontSize: "20px",
    color: "black",
    transition: "color 0.3s ease",
  };

  return (
    <div style={sidebarStyle}>
      {/* User Info Section */}
      <div style={userInfoStyle}>
        <FaUserCircle style={userIconStyle} />
        <div style={userNameStyle}>John Doe</div>
        <div style={userRoleStyle}>Administrator</div>
      </div>

      {/* Menu Items */}
      <div>
        <a
          href="/admin"
          style={menuItemStyle(location.pathname === "/admin")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4A4A4A"; // Dark gray on hover
            e.currentTarget.style.color = "white"; // White text on hover
            e.currentTarget.querySelector("svg").style.color = "white"; // White icon on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              location.pathname === "/admin" ? "#DC5F00" : "#D3D3D3"; // Keep orange if active
            e.currentTarget.style.color =
              location.pathname === "/admin" ? "white" : "black"; // Keep white text if active
            e.currentTarget.querySelector("svg").style.color =
              location.pathname === "/admin" ? "white" : "black"; // Keep white icon if active
          }}
        >
          <FaHome style={iconStyle(location.pathname === "/admin")} />
          <span style={spanStyle}>Home</span>
        </a>
        <a
          href="/create"
          style={menuItemStyle(location.pathname === "/create")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4A4A4A"; // Dark gray on hover
            e.currentTarget.style.color = "white"; // White text on hover
            e.currentTarget.querySelector("svg").style.color = "white"; // White icon on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              location.pathname === "/create" ? "#DC5F00" : "#D3D3D3"; // Keep orange if active
            e.currentTarget.style.color =
              location.pathname === "/create" ? "white" : "black"; // Keep white text if active
            e.currentTarget.querySelector("svg").style.color =
              location.pathname === "/create" ? "white" : "black"; // Keep white icon if active
          }}
        >
          <FaUserPlus style={iconStyle(location.pathname === "/create")} />
          <span style={spanStyle}>Create</span>
        </a>
        <a
          href="/tally"
          style={menuItemStyle(location.pathname === "/tally")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4A4A4A"; // Dark gray on hover
            e.currentTarget.style.color = "white"; // White text on hover
            e.currentTarget.querySelector("svg").style.color = "white"; // White icon on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              location.pathname === "/tally" ? "#DC5F00" : "#D3D3D3"; // Keep orange if active
            e.currentTarget.style.color =
              location.pathname === "/tally" ? "white" : "black"; // Keep white text if active
            e.currentTarget.querySelector("svg").style.color =
              location.pathname === "/tally" ? "white" : "black"; // Keep white icon if active
          }}
        >
          <FaClipboardList style={iconStyle(location.pathname === "/tally")} />
          <span style={spanStyle}>Tally</span>
        </a>
        <a
          href="/accounts"
          style={menuItemStyle(location.pathname === "/accounts")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4A4A4A"; // Dark gray on hover
            e.currentTarget.style.color = "white"; // White text on hover
            e.currentTarget.querySelector("svg").style.color = "white"; // White icon on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              location.pathname === "/accounts" ? "#DC5F00" : "#D3D3D3"; // Keep orange if active
            e.currentTarget.style.color =
              location.pathname === "/accounts" ? "white" : "black"; // Keep white text if active
            e.currentTarget.querySelector("svg").style.color =
              location.pathname === "/accounts" ? "white" : "black"; // Keep white icon if active
          }}
        >
          <FaUsers style={iconStyle(location.pathname === "/accounts")} />
          <span style={spanStyle}>Accounts</span>
        </a>
        <a
          href="/archives"
          style={menuItemStyle(location.pathname === "/archives")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4A4A4A"; // Dark gray on hover
            e.currentTarget.style.color = "white"; // White text on hover
            e.currentTarget.querySelector("svg").style.color = "white"; // White icon on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              location.pathname === "/archives" ? "#DC5F00" : "#D3D3D3"; // Keep orange if active
            e.currentTarget.style.color =
              location.pathname === "/archives" ? "white" : "black"; // Keep white text if active
            e.currentTarget.querySelector("svg").style.color =
              location.pathname === "/archives" ? "white" : "black"; // Keep white icon if active
          }}
        >
          <FaArchive style={iconStyle(location.pathname === "/archives")} />
          <span style={spanStyle}>Archives</span>
        </a>
      </div>

      {/* Logout Button */}
      <a
        href="/"
        style={logoutStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#4A4A4A"; // Dark gray on hover
          e.currentTarget.querySelector("svg").style.color = "white"; // White icon on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#D3D3D3"; // Reset to gray
          e.currentTarget.querySelector("svg").style.color = "black"; // Reset icon to black
        }}
      >
        <FaSignOutAlt style={logoutIconStyle} />
      </a>
    </div>
  );
};

export default AdminSidebar;