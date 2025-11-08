import React, { useContext, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaSignInAlt,
  FaChartLine,
  FaShieldAlt,
  FaRegChartBar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { loginUser, signInWithGoogle, emailInput, setEmailInput } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password!");
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password!");
      });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-sky-100 via-white to-[#E0F8F5] items-center justify-center p-5">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Sign in to continue managing your finances
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Email
              </label>
              <div className="flex items-center border rounded-lg p-3">
                <FaEnvelope className="text-green-600 mr-3" />
                <input
                  type="email"
                  name="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Password
              </label>
              <div className="flex items-center border rounded-lg p-3">
                <FaLock className="text-green-600 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <p
              onClick={() =>
                navigate("/forget-password", { state: { email: emailInput } })
              }
              className="text-right text-sm text-green-700 font-medium cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2.5 rounded-lg font-medium hover:opacity-95 hover:shadow-md transition-all cursor-pointer"
            >
              <FaSignInAlt /> Login
            </button>

            <div className="w-full flex items-center justify-center mt-4">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition cursor-pointer"
              >
                <FaGoogle /> Continue with Google
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-green-700 font-semibold hover:underline"
              >
                Sign up now
              </a>
            </p>
          </form>
        </div>
        <div className="hidden md:flex flex-col justify-center items-center text-white bg-gradient-to-r from-green-600 to-teal-600 p-10 space-y-6">
          <h2 className="text-4xl font-extrabold">FinanceFlow</h2>
          <p className="text-center text-lg text-teal-50 leading-relaxed max-w-md">
            Track your income, manage expenses, and take control of your
            financial future with FinanceFlow.
          </p>

          <div className="space-y-4 w-full max-w-sm">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FaChartLine className="text-2xl" />
              <div>
                <p className="font-semibold">Smart Budgeting</p>
                <p className="text-sm text-teal-100">
                  Monitor every expense efficiently
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FaRegChartBar className="text-2xl" />
              <div>
                <p className="font-semibold">Insightful Reports</p>
                <p className="text-sm text-teal-100">
                  Visualize your money habits clearly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FaShieldAlt className="text-2xl" />
              <div>
                <p className="font-semibold">Secure & Private</p>
                <p className="text-sm text-teal-100">
                  Your data stays safe with FinanceFlow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
