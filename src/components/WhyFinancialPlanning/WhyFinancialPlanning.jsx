import React from "react";
import { FaBullseye, FaBalanceScale, FaShieldAlt } from "react-icons/fa";

const benefits = [
  {
    icon: <FaBullseye size={28} />,
    title: "Achieve Goals Faster",
    description:
      "Effectively plan your finances to reach short-term and long-term goals efficiently and stress-free.",
    bgColor: "bg-blue-500",
  },
  {
    icon: <FaBalanceScale size={28} />,
    title: "Minimize Debt",
    description:
      "Control your spending and reduce unnecessary debt through strategic financial planning.",
    bgColor: "bg-green-500",
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: "Secure Your Future",
    description:
      "Build savings and investments wisely to ensure long-term financial stability and peace of mind.",
    bgColor: "bg-yellow-500",
  },
];

const WhyFinancialPlanning = () => {
  return (
    <section className="py-20">
      <div className="max-w-[1520px] mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Why Financial Planning Matters
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Financial planning empowers you to manage your money wisely, achieve your goals, and secure your future. With a well-structured plan, you can minimize debt, maximize savings, and ensure peace of mind for yourself and your family.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className={`${benefit.bgColor} text-white p-5 rounded-full mb-5`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFinancialPlanning;
