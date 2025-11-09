import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
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
      user_email: user?.email || "",
      user_name: user?.displayName || "",
    };

    try {
      const res = await fetch("http://localhost:3000/addtranstion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to the server.",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-16 flex items-center">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-teal-50">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-teal-800 mb-2 tracking-tight">
            Add New Transaction
          </h2>
          <p className="text-gray-600 text-base">
            Record your income or expenses to track your financial journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory("");
                }}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
                required
              >
                <option value="">Select Category</option>
                {(type === "Expense" ? expenseList : incomeList).map(
                  (item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short note..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                User Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full border border-gray-200 rounded-lg p-3 outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full border border-gray-200 rounded-lg p-3 outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-12 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
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
