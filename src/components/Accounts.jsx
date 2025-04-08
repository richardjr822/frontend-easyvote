import React, { useState } from "react";
import Header from "./header";
import { FaEdit, FaTrashAlt, FaSearch, FaSort } from "react-icons/fa";

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, username: "johndoe", password: "password123", studentNo: "2021001", course: "BSIT" },
    { id: 2, username: "janesmith", password: "password456", studentNo: "2021002", course: "BSCS" },
    { id: 3, username: "alicejohnson", password: "password789", studentNo: "2021003", course: "BSEMC" },
    { id: 4, username: "bobbrown", password: "password101", studentNo: "2021004", course: "BSIT" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("id");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredAccounts(
      accounts.filter(
        (account) =>
          account.username.toLowerCase().includes(term) ||
          account.studentNo.toLowerCase().includes(term) ||
          account.course.toLowerCase().includes(term)
      )
    );
  };

  // Handle column-based sorting
  const handleSort = (key) => {
    const newDirection = key === activeSortField && sortDirection === "asc" ? "desc" : "asc";
    setActiveSortField(key);
    setSortDirection(newDirection);

    const sortedAccounts = [...filteredAccounts].sort((a, b) => {
      if (newDirection === "asc") {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      } else {
        return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
      }
    });

    setFilteredAccounts(sortedAccounts);
  };

  // Handle delete action
  const handleDelete = (id) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts);
    setFilteredAccounts(updatedAccounts);
  };

  // Handle update action - open modal with account data
  const handleUpdate = (id) => {
    const account = accounts.find((acc) => acc.id === id);
    if (account) {
      setCurrentAccount({ ...account });
      setIsUpdateModalOpen(true);
    }
  };

  // Handle input change in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAccount({ ...currentAccount, [name]: value });
  };

  // Submit updated account
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedAccounts = accounts.map((account) =>
      account.id === currentAccount.id ? currentAccount : account
    );

    setAccounts(updatedAccounts);
    setFilteredAccounts(updatedAccounts);

    setIsUpdateModalOpen(false);
    setCurrentAccount(null);
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentAccount(null);
  };

  // Hash password for display
  const hashPassword = (password) => "*".repeat(password.length);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header username="Admin" />

      {/* Main Content */}
      <div className="main-content ml-[250px] p-5 mt-5">
        {/* Page Title and Search Bar */}
        <div className="bg-gradient-to-r from-orange-100 to-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Manage Accounts</h1>
            <div className="relative w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-orange-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search accounts..."
                className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-orange-50 to-gray-100">
              <tr>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    <span>User ID</span>
                    <FaSort className={`ml-2 text-xs ${activeSortField === "id" ? "text-orange-600" : "text-gray-400"}`} />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => handleSort("username")}
                >
                  <div className="flex items-center">
                    <span>Username</span>
                    <FaSort className={`ml-2 text-xs ${activeSortField === "username" ? "text-orange-600" : "text-gray-400"}`} />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => handleSort("studentNo")}
                >
                  <div className="flex items-center">
                    <span>Student No.</span>
                    <FaSort className={`ml-2 text-xs ${activeSortField === "studentNo" ? "text-orange-600" : "text-gray-400"}`} />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => handleSort("course")}
                >
                  <div className="flex items-center">
                    <span>Course</span>
                    <FaSort className={`ml-2 text-xs ${activeSortField === "course" ? "text-orange-600" : "text-gray-400"}`} />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{hashPassword(account.password)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.studentNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center"
                        onClick={() => handleUpdate(account.id)}
                      >
                        <FaEdit className="mr-2" />
                        Update
                      </button>
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center"
                        onClick={() => handleDelete(account.id)}
                      >
                        <FaTrashAlt className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <p className="text-gray-500 text-lg">No accounts found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && currentAccount && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-xl p-8 w-[90%] max-w-[600px] relative z-10 border-t-4 border-orange-600">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Update Account</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={currentAccount.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={currentAccount.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="studentNo" className="block text-sm font-medium text-gray-700">
                  Student No.
                </label>
                <input
                  type="text"
                  id="studentNo"
                  name="studentNo"
                  value={currentAccount.studentNo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={currentAccount.course}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="BSIT">BSIT</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSEMC">BSEMC</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;