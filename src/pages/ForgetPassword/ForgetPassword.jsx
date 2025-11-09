import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await resetPassword(email);
      setEmail("");
      const domain = email.split("@")[1];
      if (domain === "gmail.com") {
        window.location.href = "https://mail.google.com";
      } else if (domain === "yahoo.com") {
        window.location.href = "https://mail.yahoo.com";
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-b from-[#D1FAE5] to-white text-gray-800"
      }`}
    >
      <div
        className={`p-8 rounded-2xl shadow-xl w-full max-w-md border transition-colors duration-500 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-[#10B981]/20"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            isDarkMode ? "text-[#14B8A6]" : "text-[#10B981]"
          }`}
        >
          Forgot Password
        </h2>
        <p
          className={`text-center mb-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Enter your email to reset your password
        </p>
        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-lg outline-none transition border ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-[#10B981]"
                : "bg-white border-gray-300 text-gray-800 focus:border-[#10B981]"
            }`}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#10B981] text-white py-2.5 rounded-lg font-medium hover:bg-[#0EA472] transition cursor-pointer"
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
