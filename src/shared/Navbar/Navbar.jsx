import React, { useState, useContext } from "react";
import { NavLink } from "react-router";
import {
  FaHome,
  FaChartPie,
  FaPlusCircle,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const Navbar = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/add-transaction", label: "Add Transaction", icon: <FaPlusCircle /> },
    ...(user
      ? [
          { to: "/my-transactions", label: "My Transactions", icon: <FaChartPie /> },
          { to: "/reports", label: "Reports", icon: <FaChartPie /> },
          { to: "/profile", label: "My Profile", icon: <FaUserCircle /> },
        ]
      : []),
  ];

  const gradient = isDarkMode
    ? "bg-gradient-to-r from-green-600 to-teal-600"
    : "bg-gradient-to-r from-green-600 to-teal-600";
  const textColor = isDarkMode ? "text-gray-200" : "text-gray-800";
  const hoverBg = isDarkMode ? "hover:bg-gray-800" : "hover:bg-teal-50";
  const borderColor = isDarkMode ? "border-gray-600" : "border-teal-600";

  return (
    <header className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} sticky top-0 z-50 border-b shadow-sm`}>
      <nav className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className={`${gradient} p-2 rounded-lg text-white`}>
            <MdAccountBalanceWallet className="text-xl" />
          </div>
          <span className={`font-extrabold text-xl ${textColor}`}>
            Finance<span className="text-teal-500">Flow</span>
          </span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? `border ${borderColor} text-teal-500 font-semibold bg-transparent`
                    : `${textColor} hover:text-teal-500 hover:border ${borderColor} ${hoverBg}`
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 relative">
          <button
            onClick={toggleTheme}
            className={`${textColor} p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-400 transition`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {loading ? (
            <div className={`w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin`} />
          ) : !user ? (
            <>
              <NavLink
                to="/login"
                className={`${gradient} text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition`}
              >
                <FaSignInAlt className="inline mr-2" />
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={`px-4 py-2 rounded-md font-medium border ${borderColor} text-teal-500 hover:bg-teal-50 transition`}
              >
                <FaUserPlus className="inline mr-2" />
                Signup
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={user?.photoURL || user.reloadUserInfo.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-teal-500"
                />
              </div>

              {profileOpen && (
                <div className={`${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} absolute right-0 mt-3 w-56 shadow-lg rounded-xl p-4`}>
                  <p className="text-sm font-semibold text-center">
                    {user.displayName || user.reloadUserInfo.displayName}
                  </p>
                  <p className="text-xs text-gray-500 text-center mb-3">
                    {user.email}
                  </p>
                  <button
                    onClick={logoutUser}
                    className={`${gradient} text-white w-full py-2 rounded-md font-medium hover:opacity-90 transition cursor-pointer`}
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${textColor} text-2xl lg:hidden focus:outline-none`}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {isOpen && (
        <div className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} lg:hidden border-t shadow-md`}>
          <div className="flex flex-col gap-2 px-4 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? `border ${borderColor} text-teal-500 font-semibold bg-transparent`
                      : `${textColor} hover:text-teal-500 hover:border ${borderColor} ${hoverBg}`
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}

            <button
              onClick={toggleTheme}
              className={`${textColor} p-2 rounded-md dark:hover:bg-gray-700 transition flex items-center justify-start ml-2.5 cursor-pointer`}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            {loading ? (
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto my-2" />
            ) : !user ? (
              <>
                <NavLink
                  to="/login"
                  className={`${gradient} text-white flex items-center justify-center px-5 py-2 rounded-md font-medium hover:opacity-90 transition cursor-pointer`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignInAlt className="inline mr-2" />
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={`flex items-center justify-center px-5 py-2 rounded-md font-medium border ${borderColor} text-teal-500 hover:bg-teal-50 transition cursor-pointer`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus className="inline mr-2" />
                  Signup
                </NavLink>
              </>
            ) : (
              <div className="flex flex-col items-center mt-2">
                <img
                  src={user?.photoURL || user.reloadUserInfo.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-teal-500 mb-2"
                />
                <p className={`font-semibold text-xs text-center ${textColor}`}>
                  {user.displayName || user.reloadUserInfo.displayName}
                </p>
                <p className="text-xs text-gray-500 text-center mb-3">
                  {user.email}
                </p>
                <button
                  onClick={() => {
                    logoutUser();
                    setIsOpen(false);
                  }}
                  className={`${gradient} flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-white hover:opacity-90 transition cursor-pointer w-full cursor-pointer`}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
