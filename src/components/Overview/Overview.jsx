import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/addtranstion?email=${user.email}`)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      const amt = Number(t.amount);
      if (t.type.toLowerCase() === "income") totalIncome += amt;
      if (t.type.toLowerCase() === "expense") totalExpense += amt;
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
  }, [transactions]);

  const balance = income - expense;

  const cardBg = isDarkMode
    ? "bg-gradient-to-r from-gray-800 to-gray-800 text-gray-200"
    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800";

  const incomeBg = isDarkMode
    ? "bg-gradient-to-r from-green-700 to-green-800 text-gray-200"
    : "bg-gradient-to-r from-green-100 to-green-200 text-gray-800";

  const expenseBg = isDarkMode
    ? "bg-gradient-to-r from-red-700 to-red-800 text-gray-200"
    : "bg-gradient-to-r from-red-100 to-red-200 text-gray-800";


  return (
    <div className={`${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-[1500px] mx-auto py-16 px-6">
        <h1
          className={`text-4xl font-bold mb-8 text-center ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Dashboard Overview
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className={`${cardBg} shadow-lg rounded-xl p-6 flex items-center gap-6 transform transition hover:scale-105`}
          >
            <div className="p-5 bg-blue-600 text-white rounded-full shadow">
              <FaWallet size={28} />
            </div>
            <div>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } font-medium`}
              >
                Total Balance
              </p>
              <h2 className="text-3xl font-bold">{balance.toFixed(2)}৳</h2>
            </div>
          </div>

          <div
            className={`${incomeBg} shadow-lg rounded-xl p-6 flex items-center gap-6 transform transition hover:scale-105`}
          >
            <div className="p-5 bg-green-600 text-white rounded-full shadow">
              <FaArrowUp size={28} />
            </div>
            <div>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } font-medium`}
              >
                Total Income
              </p>
              <h2 className="text-3xl font-bold">{income.toFixed(2)}৳</h2>
            </div>
          </div>

          <div
            className={`${expenseBg} shadow-lg rounded-xl p-6 flex items-center gap-6 transform transition hover:scale-105`}
          >
            <div className="p-5 bg-red-600 text-white rounded-full shadow">
              <FaArrowDown size={28} />
            </div>
            <div>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } font-medium`}
              >
                Total Expenses
              </p>
              <h2 className="text-3xl font-bold">{expense.toFixed(2)}৳</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
