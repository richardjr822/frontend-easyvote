import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaUserCircle, FaVoteYea, FaCheckCircle } from "react-icons/fa";

const Login = () => {
  const [role, setRole] = useState("Admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Login successful", { username, password, role });
      setIsLoading(false);
      
      // Navigate based on role
      if (role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/voter");
      }
    }, 1000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50">
      {/* Background Image with parallax effect */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/assets/campus-bg.jpg')" }}>
        <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Circle */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-orange-100 opacity-70"></div>
        
        {/* Bottom Right Circle */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-100 opacity-60"></div>
        
        {/* Scattered Icons */}
        <div className="absolute top-20 right-20 text-orange-200 opacity-50 text-6xl">
          <FaVoteYea />
        </div>
        <div className="absolute bottom-40 left-40 text-orange-200 opacity-40 text-5xl transform rotate-12">
          <FaCheckCircle />
        </div>
        <div className="absolute top-1/2 left-20 text-orange-200 opacity-50 text-4xl transform -rotate-12">
          <FaVoteYea />
        </div>
        
        {/* Dotted Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.4
        }}></div>
      </div>

      {/* Login Container */}
      <div 
        className="z-10 flex flex-col md:flex-row items-center w-11/12 max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn relative border border-gray-100"
      >
        {/* Decorative shapes inside container */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full opacity-65 z-0"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-50 rounded-full opacity-65 z-0"></div>
        
        {/* Left Section (Logo & Welcome Text) */}
        <div 
          className="w-full md:w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800 p-8 md:p-12 flex flex-col items-center justify-center h-full relative overflow-hidden"
        >
          {/* Decorative elements for left panel */}
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-orange-100/65 to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-orange-100/65 to-transparent"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-orange-200 opacity-45"></div>
          
          <div className="mb-8 transform transition-all hover:scale-105 duration-300 relative z-10">
            <img
              src="/assets/blacklogo.png"
              alt="EasyVote Logo"
              className="w-32 md:w-40"
            />
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center relative z-10">
            Welcome to <span className="text-orange-500">EasyVote</span>
          </h1>
          
          <p className="text-gray-600 text-center text-sm md:text-base mb-8 relative z-10">
            Secure, fast, and hassle-free voting for CCS student elections—
            anytime, anywhere!
          </p>
          
          <div className="grid grid-cols-3 gap-4 w-full max-w-xs relative z-10">
            <div className="bg-white shadow-sm p-3 rounded-xl flex flex-col items-center transform transition hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/65 to-transparent"></div>
              <div className="text-orange-500 text-xl mb-1 relative">🔒</div>
              <p className="text-xs text-center text-gray-700 relative">Secure Voting</p>
            </div>
            <div className="bg-white shadow-sm p-3 rounded-xl flex flex-col items-center transform transition hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/65 to-transparent"></div>
              <div className="text-orange-500 text-xl mb-1 relative">⚡</div>
              <p className="text-xs text-center text-gray-700 relative">Fast Results</p>
            </div>
            <div className="bg-white shadow-sm p-3 rounded-xl flex flex-col items-center transform transition hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/65 to-transparent"></div>
              <div className="text-orange-500 text-xl mb-1 relative">📱</div>
              <p className="text-xs text-center text-gray-700 relative">Mobile Ready</p>
            </div>
          </div>
          
          {/* Bottom decorative line */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 relative">
          {/* Subtle pattern for right panel */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(#f8f8f8 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.6
          }}></div>
          
          <div className="flex flex-col items-center relative z-10">
            <div className="text-orange-600 mb-6 relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-100 rounded-full opacity-65"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-100 rounded-full opacity-65"></div>
              <FaUserCircle className="text-7xl animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
            
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              {/* Username Input */}
              <div className="mb-5">
                <div className={`flex items-center border-2 ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all bg-white`}>
                  <span className="px-4 py-3 bg-gray-50 text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 p-3 text-gray-700 focus:outline-none"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <div className={`flex items-center border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all bg-white`}>
                  <span className="px-4 py-3 bg-gray-50 text-gray-500">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 p-3 text-gray-700 focus:outline-none"
                    required
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Role and Login Button */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                {/* Role Selector */}
                <div className="relative flex-1">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all h-12"
                  >
                    <option value="Admin">Administrator</option>
                    <option value="Voter">Voter</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-orange-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all flex items-center justify-center relative overflow-hidden h-12"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-white opacity-10 rounded-full transform rotate-45"></div>
                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
                  </div>
                  <div className="relative flex items-center gap-2">
                    {isLoading ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <FaSignInAlt className="text-lg" /> {/* Icon aligned to the left */}
                        <span>Sign In</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Need help? <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">Contact system administrator</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 text-center w-full text-gray-600 text-xs z-20">
        <p>© 2025 EasyVote - Gordon College CCS Elections System</p>
      </div>
    </div>
  );
};

export default Login;