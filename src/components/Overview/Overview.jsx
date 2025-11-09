import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Overview = () => {
  const { user } = useContext(AuthContext);
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

  return (
    <div className="max-w-[1500px] mx-auto my-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Dashboard Overview</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-xl p-6 flex items-center gap-6 transform transition hover:scale-105">
          <div className="p-5 bg-blue-600 text-white rounded-full shadow">
            <FaWallet size={28} />
          </div>
          <div>
            <p className="text-gray-700 font-medium">Total Balance</p>
            <h2 className="text-3xl font-bold text-gray-900">${balance.toFixed(2)}</h2>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-xl p-6 flex items-center gap-6 transform transition hover:scale-105">
          <div className="p-5 bg-green-600 text-white rounded-full shadow">
            <FaArrowUp size={28} />
          </div>
          <div>
            <p className="text-gray-700 font-medium">Total Income</p>
            <h2 className="text-3xl font-bold text-gray-900">${income.toFixed(2)}</h2>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-red-200 shadow-lg rounded-xl p-6 flex items-center gap-6 transform transition hover:scale-105">
          <div className="p-5 bg-red-600 text-white rounded-full shadow">
            <FaArrowDown size={28} />
          </div>
          <div>
            <p className="text-gray-700 font-medium">Total Expenses</p>
            <h2 className="text-3xl font-bold text-gray-900">${expense.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
