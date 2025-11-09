import React from "react";
import { useLoaderData } from "react-router";
import { FaArrowLeft, FaMoneyBillWave, FaRegCalendarAlt, FaTag } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const TransactionDetails = () => {
  const transaction = useLoaderData();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 py-16 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-green-50 to-teal-50"
      }`}
    >
      <div
        className={`rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`px-10 py-8 ${
            isDarkMode
              ? "bg-gradient-to-r from-green-700 via-teal-600 to-teal-500"
              : "bg-gradient-to-r from-green-600 via-teal-500 to-teal-400"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-white tracking-wide mb-1">
            Transaction Details
          </h1>
          <p className="text-green-100 text-sm font-medium">
            Detailed view of your transaction
          </p>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2
              className={`text-2xl font-bold flex items-center gap-2 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <FaTag className="text-teal-500" /> {transaction.category}
            </h2>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                transaction.type === "Income"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {transaction.type}
            </span>
          </div>

          <div className="text-center space-y-2">
            <p
              className={`text-5xl font-extrabold flex justify-center items-center gap-2 ${
                transaction.type === "Income" ? "text-green-500" : "text-red-500"
              }`}
            >
              <FaMoneyBillWave /> ৳{transaction.amount}
            </p>
            <p
              className={`flex justify-center items-center gap-1 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <FaRegCalendarAlt />{" "}
              {new Date(transaction.date).toLocaleDateString("en-GB")}
            </p>
          </div>

          {transaction.description && (
            <div
              className={`rounded-xl p-6 shadow-sm border transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Description
              </h3>
              <p
                className={`leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {transaction.description}
              </p>
            </div>
          )}

          <div
            className={`grid grid-cols-2 gap-6 pt-6 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Category
              </p>
              <p>{transaction.category}</p>
            </div>
            <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Type
              </p>
              <p>{transaction.type}</p>
            </div>
            <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Amount
              </p>
              <p>৳{transaction.amount}</p>
            </div>
            <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Date
              </p>
              <p>{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div
          className={`px-8 py-6 flex justify-center transition-all duration-500 ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-700 to-gray-800"
              : "bg-gradient-to-r from-green-100 to-teal-100"
          }`}
        >
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-semibold text-sm hover:scale-105 transform transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <FaArrowLeft /> Back to Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
