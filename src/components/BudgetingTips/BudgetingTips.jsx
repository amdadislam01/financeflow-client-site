import React from "react";
import { FaPiggyBank, FaChartLine, FaRegCalendarCheck } from "react-icons/fa";

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
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1510px] mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Budgeting Tips</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Smart budgeting empowers you to take control of your finances. Follow these key strategies to save more, spend wisely, and plan effectively for the future.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {tipsData.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className={`${tip.bgColor} text-white p-5 rounded-full mb-5`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetingTips;
