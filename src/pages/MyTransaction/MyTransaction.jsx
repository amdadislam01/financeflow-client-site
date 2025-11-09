import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/addtranstion?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 via-teal-500 to-teal-400 py-16 text-center text-white shadow-xl">
        <h1 className="text-5xl font-extrabold tracking-wider drop-shadow-lg">
          My Transactions
        </h1>
        <p className="mt-3 text-lg text-green-100/90 font-medium">
          Track your income & expenses effortlessly — FinanceFlow.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 overflow-hidden group cursor-pointer"
            >
              <div className="bg-gradient-to-r from-green-400 via-teal-400 to-teal-300 px-5 py-3 flex justify-between items-center">
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.category}
                </h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <p
                  className={`text-3xl font-extrabold text-green-600  ${
                    item.type === "Income" ? "text-green-800" : "text-red-600"
                  }`}
                >
                  ৳{item.amount}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 px-6 py-4 bg-green-50">
                <button
                  onClick={() => navigate(`/transactions/update/${item._id}`)}
                  className="flex items-center gap-2 text-green-600 hover:text-teal-500 font-semibold text-sm transition cursor-pointer"
                >
                  <FaEdit /> Update
                </button>
                <button
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold text-sm transition cursor-pointer"
                >
                  <FaTrashAlt /> Delete
                </button>
                <button
                  onClick={() => navigate(`/transactions/${item._id}`)}
                  className="flex items-center gap-2 text-teal-700 hover:text-green-600 font-semibold text-sm transition cursor-pointer"
                >
                  <FaEye /> View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center mt-24">
            <p className="text-gray-500 text-lg">
              No transactions yet. Start by adding your first transaction!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;
