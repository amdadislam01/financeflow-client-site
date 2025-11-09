import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const expenseList = [
    "Home",
    "Food",
    "Transportation",
    "Health",
    "Personal",
    "Education",
    "Technology",
    "Entertainment",
    "Family",
    "Others",
  ];

  const incomeList = ["Salary", "Pocket Money", "Business", "Tutoring"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      created_at: new Date().toISOString(),
      user_email: user?.email || "",
      user_name: user?.displayName || "",
    };

    try {
      const res = await fetch("https://financeflow-tau-eight.vercel.app/addtranstion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Transaction Added!",
          text: "Your transaction has been successfully added.",
          confirmButtonColor: "#0d9488",
        });
        setCategory("");
        setAmount("");
        setDescription("");
        setDate("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to the server.",
      });
    }
  };

  return (
    <section
      className={`min-h-screen py-16 flex items-center transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-green-50 to-teal-100"
      }`}
    >
      <div
        className={`w-full max-w-3xl mx-auto rounded-2xl shadow-xl p-10 border transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-teal-50"
        }`}
      >
        <div className="text-center mb-10">
          <h2
            className={`text-4xl font-extrabold mb-2 tracking-tight ${
              isDarkMode ? "text-teal-400" : "text-teal-800"
            }`}
          >
            Add New Transaction
          </h2>
          <p
            className={`text-base ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Record your income or expenses to track your financial journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className={`block font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory("");
                }}
                className={`w-full rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150 ${
                  isDarkMode
                    ? "border border-gray-700 bg-gray-800 text-gray-200"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>

            <div>
              <label
                className={`block font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className={`w-full rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150 ${
                  isDarkMode
                    ? "border border-gray-700 bg-gray-800 text-gray-200"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                <option value="">Select Category</option>
                {(type === "Expense" ? expenseList : incomeList).map(
                  (item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className={`block font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className={`w-full rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150 ${
                  isDarkMode
                    ? "border border-gray-700 bg-gray-800 text-gray-200"
                    : "border border-gray-300 text-gray-700"
                }`}
              />
            </div>

            <div>
              <label
                className={`block font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={`w-full rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150 ${
                  isDarkMode
                    ? "border border-gray-700 bg-gray-800 text-gray-200"
                    : "border border-gray-300 text-gray-700"
                }`}
              />
            </div>
          </div>

          <div>
            <label
              className={`block font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short note..."
              rows="3"
              className={`w-full rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150 ${
                isDarkMode
                  ? "border border-gray-700 bg-gray-800 text-gray-200"
                  : "border border-gray-300 text-gray-700"
              }`}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className={`block font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                User Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className={`w-full rounded-lg p-3 outline-none cursor-not-allowed ${
                  isDarkMode
                    ? "border border-gray-700 bg-gray-800 text-gray-400"
                    : "border border-gray-200 bg-gray-50 text-gray-500"
                }`}
              />
            </div>
            <div>
              <label
                className={`block font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className={`w-full rounded-lg p-3 outline-none cursor-not-allowed ${
                  isDarkMode
                    ? "border border-gray-700 bg-gray-800 text-gray-400"
                    : "border border-gray-200 bg-gray-50 text-gray-500"
                }`}
              />
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className={`px-12 py-3 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? "bg-gradient-to-r from-teal-500 to-green-600"
                  : "bg-gradient-to-r from-green-600 to-teal-600"
              }`}
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTransaction;
