import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "./header";
import { FaFilter, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Tally = () => {
  const councils = {
    "CCS Student Council": {
      President: { labels: ["Candidate A", "Candidate B", "Candidate C"], data: [120, 150, 100] },
      "Vice President": { labels: ["Candidate D", "Candidate E"], data: [80, 90] },
    },
    ELITES: {
      President: { labels: ["Candidate F", "Candidate G", "Candidate H"], data: [100, 120, 110] },
      Secretary: { labels: ["Candidate I", "Candidate J"], data: [60, 70] },
    },
    SPECS: {
      Treasurer: { labels: ["Candidate K", "Candidate L"], data: [90, 50] },
      Secretary: { labels: ["Candidate M", "Candidate N"], data: [80, 60] },
    },
    IMAGES: {
      President: { labels: ["Candidate O", "Candidate P", "Candidate Q"], data: [110, 130, 120] },
      Treasurer: { labels: ["Candidate R", "Candidate S"], data: [70, 80] },
    },
  };

  const [selectedCouncil, setSelectedCouncil] = useState("CCS Student Council");
  const [positions, setPositions] = useState(Object.keys(councils[selectedCouncil]));
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const handleCouncilSelect = (council) => {
    setSelectedCouncil(council);
    setPositions(Object.keys(councils[council]));
    setCurrentPositionIndex(0); // Reset to the first position
  };

  const handleNext = () => {
    if (currentPositionIndex < positions.length - 1) {
      setCurrentPositionIndex(currentPositionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPositionIndex > 0) {
      setCurrentPositionIndex(currentPositionIndex - 1);
    }
  };

  const currentPosition = positions[currentPositionIndex];
  const data = {
    labels: councils[selectedCouncil][currentPosition].labels,
    datasets: [
      {
        label: "Vote Count",
        data: councils[selectedCouncil][currentPosition].data,
        backgroundColor: "rgba(234, 88, 12, 0.8)", // Tailwind's orange-600 with opacity
        borderColor: "rgba(234, 88, 12, 1)", // Tailwind's orange-600
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Vote Count for ${currentPosition} (${selectedCouncil})`,
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Candidates",
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Vote Count",
          font: {
            size: 16,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5 mt-5">
        {/* Filter Buttons */}
        <div className="mb-4 text-sm text-gray-600 flex items-center justify-between">
          <div className="flex items-center">
            <FaFilter className="mr-2 text-orange-600" />
            <span>Filter by Council: </span>
            {Object.keys(councils).map((council) => (
              <button
                key={council}
                className={`ml-2 px-3 py-1 rounded-md transition-colors ${
                  selectedCouncil === council
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleCouncilSelect(council)}
              >
                {council}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Graph */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-300">
          <div className="w-full max-w-4xl mx-auto">
            <Bar data={data} options={options} />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="text-center mt-6 flex justify-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPositionIndex === 0}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentPositionIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 transition"
            }`}
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPositionIndex === positions.length - 1}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentPositionIndex === positions.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-600 text-white hover:bg-orange-700 transition"
            }`}
          >
            Next
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tally;