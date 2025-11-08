import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#34699A]/10 to-[#58A0C8]/20 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <div className="bg-[#58A0C8]/20 p-5 rounded-full inline-block mb-6">
          <FaExclamationTriangle className="text-[#34699A] text-5xl" />
        </div>

        <h1 className="text-8xl font-extrabold text-[#34699A] mb-2">404</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#34699A] to-[#58A0C8] rounded-full mx-auto mb-4"></div>
        <p className="text-lg sm:text-xl text-[#34699A] mb-8">
          Oops! The page you're looking for might have wandered off.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#34699A] to-[#58A0C8] text-white font-medium rounded-lg shadow-md hover:opacity-90 hover:scale-105 transition-all duration-300 flex-1"
          >
            <FaHome /> Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#58A0C8]/10 text-[#34699A] font-medium rounded-lg shadow-md hover:bg-[#58A0C8]/20 hover:scale-105 transition-all duration-300 flex-1 cursor-pointer"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
