import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { AuthContext } from "../../context/AuthContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/addtranstion?email=${user.email}`)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  useEffect(() => {
    let data = transactions;

    if (filterMonth !== "") {
      data = data.filter(
        (t) => new Date(t.date).getMonth() === parseInt(filterMonth)
      );
    }

    if (filterCategory !== "") {
      data = data.filter((t) => t.category === filterCategory);
    }

    setFilteredData(data);
  }, [filterMonth, filterCategory, transactions]);

  const categoryData = filteredData.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#1abc9c",
          "#16a085",
          "#2ecc71",
          "#27ae60",
          "#3498db",
          "#2980b9",
        ],
      },
    ],
  };

  const monthlyData = Array(12).fill(0);
  filteredData.forEach((t) => {
    const month = new Date(t.date).getMonth();
    monthlyData[month] += t.amount;
  });

  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Total",
        data: monthlyData,
        backgroundColor: "#1abc9c",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-700">
        Financial Reports
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border-2 border-teal-400 p-3 rounded-lg w-64 text-gray-700 font-medium hover:border-teal-600 transition cursor-pointer"
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option value={i} key={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border-2 border-teal-400 p-3 rounded-lg w-64 text-gray-700 font-medium hover:border-teal-600 transition cursor-pointer"
        >
          <option value="">All Categories</option>
          {[...new Set(transactions.map((t) => t.category))].map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-teal-100 to-green-50 p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-teal-800">
            Expenses by Category
          </h2>
          {filteredData.length > 0 ? (
            <Pie data={pieData} />
          ) : (
            <p className="text-gray-500 text-center mt-6">No data available</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-teal-100 to-green-50 p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-teal-800">
            Monthly Expenses
          </h2>
          {filteredData.length > 0 ? (
            <Bar data={barData} options={{ responsive: true }} />
          ) : (
            <p className="text-gray-500 text-center mt-6">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
