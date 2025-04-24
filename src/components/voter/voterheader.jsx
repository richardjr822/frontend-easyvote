import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const VoterHeader = ({ username = "Voter" }) => {
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

  // Map routes to titles with icons or badges
  const getTitle = () => {
    switch (location.pathname) {
      case "/voter":
        return "Student Elections";
      case "/view-candidates":
        return "View Candidates";
      case "/voting-interface":
        return "Cast Your Vote";
      default:
        return "Student Elections";
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
    <header className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-6 px-6 shadow-md border-b border-gray-300 flex justify-between items-center transition-all duration-300 ml-[250px]">
      {/* Title Section */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold flex items-center">
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 h-6 w-1.5 rounded-full mr-3"></span>
          <span className="text-gray-800 tracking-wide">
            {getTitle()}
          </span>
        </h1>
      </div>
      
      {/* Right Section: Date & Time */}
      <div className="flex items-center">
        {/* Date and Time */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="text-orange-500 mr-2" size={14} />
            <span className="text-xs font-medium">{formattedDate}</span>
          </div>
          <div className="h-3 w-px bg-gray-300 mx-1"></div>
          <div className="flex items-center text-gray-600">
            <FaClock className="text-orange-500 mr-2" size={14} />
            <span className="text-xs font-medium animate-pulse-subtle">{formattedTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VoterHeader;