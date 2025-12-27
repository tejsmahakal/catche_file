import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundSignIn from "../assets/SignIn/BackgroundSignIn.jpg";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate("/create-profile");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("SignIn error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center lg:justify-end lg:items-start font-[Inter] overflow-hidden lg:pt-15 px-4 sm:px-6 py-8"
      style={{
        backgroundImage: `url(${BackgroundSignIn})`,
        backgroundSize: "cover",
        backgroundPosition: "calc(50% - 88px) center", // <-- SHIFTED LEFT BY 18PX (FINAL)
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* BLACK GRADIENT FADE (left → right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black"></div>

      {/* SIGN IN BOX */}
      <div
        className="relative z-10 bg-white shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md mx-auto lg:mx-16 transition-all duration-300"
        style={{ minHeight: "470px", maxWidth: "400px" }}
      >
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-orange-500 mb-6">
          Sign In
        </h2>

        {errorMessage && (
          <p className="text-center text-red-600 text-sm mb-3 font-medium bg-red-50 py-2 rounded-md">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSignIn}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID :
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password :
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              disabled={isLoading}
            />
          </div>

          <div className="text-right mb-3">
            <Link
              to="/forgot"
              className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-300"
            >
              Forgot Password?
            </Link>
          </div>

          <p className="text-xs text-gray-500 mb-5 text-center leading-snug">
            *By signing in, I agree to the Terms & Conditions and Privacy Policy
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white py-2.5 rounded-md transition-all duration-300 text-sm sm:text-base flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link
            to="/signup"
            className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-md transition-all duration-300 text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
