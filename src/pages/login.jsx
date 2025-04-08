import React, { useState } from "react";

const Login = () => {
  const [role, setRole] = useState("Admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Login successful", { username, password, role });
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background Image */}
      <div className="background-image"></div>

      {/* Black Tint Overlay */}
      <div className="background-overlay"></div>

      {/* Container */}
      <div className="z-10 flex flex-wrap justify-center items-center w-11/12 max-w-5xl bg-white bg-opacity-90 p-10 md:p-16 rounded-lg shadow-2xl">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center text-center mb-8 md:mb-0">
          <img
            src="/assets/blacklogo.png"
            alt="EasyVote Logo"
            className="w-32 md:w-40 mb-6"
          />
          <h1 className="hidden md:block text-3xl font-bold text-gray-800">
            Welcome to EasyVote
          </h1>
          <p className="hidden md:block text-gray-600 mt-2">
            Secure, fast, and hassle-free voting for CCS student elections—
            anytime, anywhere!
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-300 mx-8"></div>

        {/* Right Section */}
        <div className="flex-1 max-w-sm text-center">
          {/* User Icon */}
          <div className="text-orange-600 text-6xl mb-6">
            <i className="bi bi-person-circle"></i>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="mb-6 flex items-center border rounded-lg overflow-hidden shadow-sm">
              <span className="px-3 text-gray-500">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="flex-1 p-3 text-gray-700 focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6 flex items-center border rounded-lg overflow-hidden shadow-sm">
              <span className="px-3 text-gray-500">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="flex-1 p-3 text-gray-700 focus:outline-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-4">
              {/* Role Dropdown */}
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none transition-all"
                >
                  <option value="Admin">Admin</option>
                  <option value="Voter">Voter</option>
                </select>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none transition-all"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;