import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center border border-green-100">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-5 rounded-full inline-block mb-6 shadow-md">
          <FaExclamationTriangle className="text-white text-5xl" />
        </div>

        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-2">
          404
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-green-600 to-teal-600 rounded-full mx-auto mb-4"></div>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Oops! The page you're looking for might have wandered off.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg shadow-md hover:opacity-90 hover:scale-105 transition-all duration-300 flex-1"
          >
            <FaHome /> Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-50 text-green-700 font-medium rounded-lg shadow-md hover:bg-green-100 hover:scale-105 transition-all duration-300 flex-1 cursor-pointer"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
