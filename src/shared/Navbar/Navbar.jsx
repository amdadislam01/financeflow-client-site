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
} from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);  
  const [isOpen, setIsOpen] = useState(false);

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

  const gradient = "bg-gradient-to-r from-green-600 to-teal-600";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className={`${gradient} p-2 rounded-lg text-white`}>
            <MdAccountBalanceWallet className="text-xl" />
          </div>
          <span className="font-extrabold text-xl text-gray-800 group-hover:text-teal-600 transition">
            Finance<span className="text-teal-600">Flow</span>
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
                    ? "border border-teal-600 text-teal-600 font-semibold bg-transparent"
                    : "text-gray-700 hover:text-teal-600 hover:border-teal-500 hover:border hover:bg-teal-50"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
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
                className="px-4 py-2 rounded-md font-medium border border-teal-600 text-teal-600 hover:bg-teal-50 transition"
              >
                <FaUserPlus className="inline mr-2" />
                Signup
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                <img
                  src={user?.photoURL || user.reloadUserInfo.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-teal-600"
                />
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 text-center z-50 cursor-pointer">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.displayName || user.reloadUserInfo.displayName}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logoutUser}
                className={`${gradient} text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition cursor-pointer`}
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-teal-600 text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="flex flex-col gap-2 px-4 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? "border border-teal-600 text-teal-600 font-semibold bg-transparent"
                      : "text-gray-700 hover:text-teal-600 hover:border-teal-500 hover:border hover:bg-teal-50"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}

            {loading ? (
              <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto my-2" />
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
                  className="flex items-center justify-center px-5 py-2 rounded-md font-medium border border-teal-600 text-teal-600 hover:bg-teal-50 transition cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus className="inline mr-2" />
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  logoutUser();
                  setIsOpen(false);
                }}
                className={`${gradient} flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-white hover:opacity-90 transition cursor-pointer`}
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
