import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const MyTransaction = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const transactionsModal = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          const token = await user.getIdToken();
          const res = await fetch(
            `https://financeflow-tau-eight.vercel.app/addtranstion?email=${user.email}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          setTransactions(data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchTransactions();
    }
  }, [user, authLoading]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#D33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://financeflow-tau-eight.vercel.app/addtranstion/${_id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire(
                "Deleted!",
                "Transaction removed successfully.",
                "success"
              );
              setTransactions(transactions.filter((t) => t._id !== _id));
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          });
      }
    });
  };

  const handleOpenUpdateModal = (transaction) => {
    setSelectedTransaction(transaction);
    transactionsModal.current.showModal();
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      type: form.type.value,
      category: form.category.value,
      amount: form.amount.value,
      description: form.description.value,
      date: form.date.value,
    };

    fetch(`https://financeflow-tau-eight.vercel.app/addtranstion/${selectedTransaction._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Transaction updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setTransactions((prev) =>
            prev.map((t) =>
              t._id === selectedTransaction._id ? { ...t, ...updatedData } : t
            )
          );
          transactionsModal.current.close();
        }
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Try again later.",
        })
      );
  };

  if (loading) return <Loading />;

  return (
    <div
      className={`min-h-screen pb-24 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-green-50 to-teal-50 text-gray-800"
      }`}
    >
      <div
        className={`py-16 text-center shadow-xl transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-r from-green-800 via-teal-700 to-teal-600 text-white"
            : "bg-gradient-to-r from-green-600 via-teal-500 to-teal-400 text-white"
        }`}
      >
        <h1 className="text-5xl font-extrabold tracking-wider drop-shadow-lg">
          My Transactions
        </h1>
        <p className="mt-3 text-lg text-green-100/90 font-medium">
          Track your income & expenses effortlessly — FinanceFlow.
        </p>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <div
              key={item._id}
              className={`rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border overflow-hidden group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`px-5 py-3 flex justify-between items-center ${
                  isDarkMode
                    ? "bg-gradient-to-r from-green-700 via-teal-700 to-teal-600"
                    : "bg-gradient-to-r from-green-400 via-teal-400 to-teal-300"
                }`}
              >
                <span
                  className={`px-4 py-1 text-xs font-semibold rounded-full ${
                    item.type === "Income"
                      ? "bg-green-200 text-green-800"
                      : "bg-teal-200 text-red-600"
                  }`}
                >
                  {item.type}
                </span>
                <p className="text-white/90 text-sm font-medium">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="p-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {item.category}
                </h3>
                <p
                  className={`mb-4 text-sm leading-relaxed ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.description}
                </p>
                <p
                  className={`text-3xl font-extrabold ${
                    item.type === "Income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ৳{item.amount}
                </p>
              </div>

              <div
                className={`flex justify-between items-center px-6 py-4 border-t transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-green-50 border-gray-100"
                }`}
              >
                <button
                  onClick={() => handleOpenUpdateModal(item)}
                  className="flex items-center gap-2 text-green-600 hover:text-teal-500 font-semibold text-sm transition cursor-pointer"
                >
                  <FaEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold text-sm transition cursor-pointer"
                >
                  <FaTrashAlt /> Delete
                </button>
                <button
                  onClick={() => navigate(`/transaction-details/${item._id}`)}
                  className="flex items-center gap-2 text-teal-700 hover:text-green-600 font-semibold text-sm transition cursor-pointer"
                >
                  <FaEye /> View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center mt-24">
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No transactions yet. Start by adding your first transaction!
            </p>
          </div>
        )}
      </div>

      <dialog
        ref={transactionsModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div
          className={`modal-box max-w-md rounded-2xl shadow-lg transition-colors duration-500 ${
            isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Update Transaction
          </h2>
          {selectedTransaction && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  defaultValue={selectedTransaction.type}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700 text-gray-100"
                      : "border-gray-200"
                  }`}
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={selectedTransaction.category}
                  required
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700 text-gray-100"
                      : "border-gray-200"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedTransaction.amount}
                  required
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700 text-gray-100"
                      : "border-gray-200"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedTransaction.description}
                  rows="2"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700 text-gray-100"
                      : "border-gray-200"
                  }`}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedTransaction.date?.slice(0, 10)}
                  required
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700 text-gray-100"
                      : "border-gray-200"
                  }`}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => transactionsModal.current.close()}
                  className="px-5 py-2 rounded-md border border-green-400 text-green-600 hover:bg-green-50 transition font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition font-medium cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyTransaction;
