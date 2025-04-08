import React, { useEffect, useState } from "react";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString("en-US", options));
    };

    const interval = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const footerStyle = {
    backgroundColor: "#000",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const dateTimeStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  };

  const iconStyle = {
    marginRight: "5px",
    fontSize: "16px",
  };

  return (
    <div style={footerStyle}>
      <div style={dateTimeStyle}>
        <i className="bi bi-calendar3" style={iconStyle}></i>
        <span>{currentDateTime}</span>
      </div>
    </div>
  );
};

export default Footer;