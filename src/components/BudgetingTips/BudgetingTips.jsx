import React from "react";
import { FaPiggyBank, FaChartLine, FaRegCalendarCheck } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const tipsData = [
  {
    icon: <FaPiggyBank size={28} />,
    title: "Track Your Expenses",
    description:
      "Maintain a detailed record of your daily spending to pinpoint opportunities for savings.",
    bgColor: "bg-blue-500",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Set Financial Goals",
    description:
      "Establish clear short-term and long-term objectives to direct your budgeting strategies.",
    bgColor: "bg-green-500",
  },
  {
    icon: <FaRegCalendarCheck size={28} />,
    title: "Plan Ahead",
    description:
      "Prepare a monthly budget and allocate funds for necessities, savings, and leisure.",
    bgColor: "bg-yellow-500",
  },
];

const BudgetingTips = () => {
  const { isDarkMode } = useTheme();
  return (
    <section
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      } py-20 transition-colors duration-300`}
    >
      <div className="max-w-[1510px] mx-auto px-8 text-center">
        <h2
          className={`text-4xl font-bold mb-4 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Budgeting Tips
        </h2>
        <p
          className={`text-lg mb-12 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Smart budgeting empowers you to take control of your finances. Follow
          these key strategies to save more, spend wisely, and plan effectively
          for the future.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {tipsData.map((tip, index) => (
            <div
              key={index}
              className={`${
                isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-800"
              } p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center`}
            >
              <div className={`${tip.bgColor} text-white p-5 rounded-full mb-5`}>
                {tip.icon}
              </div>
              <h3
                className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {tip.title}
              </h3>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetingTips;
