import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // State to store the current date and time
  const [dateTime, setDateTime] = useState(new Date());

  // Update the date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Map routes to titles
  const getTitle = () => {
    switch (location.pathname) {
      case "/admin":
        return "Admin Dashboard";
      case "/create":
        return "Create Candidate";
      case "/tally":
        return "Tally Results";
      case "/accounts":
        return "Manage Accounts";
      case "/archives":
        return "Archives";
      default:
        return "Admin Dashboard";
    }
  };

  // Format date and time
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <header className="bg-gray-350 text-gray-800 p-5 shadow-md border border-gray-300 flex justify-between items-center">
      <h1 className="text-xl font-bold ml-60">{getTitle()}</h1> {/* Dynamically update title */}
      <div className="flex items-center gap-3">
        <FaCalendarAlt className="text-m text-gray-600" />
        <span className="text-xs font-small">
          {formattedDate} - {formattedTime}
        </span>
      </div>
    </header>
  );
};

export default Header;