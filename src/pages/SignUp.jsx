/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackgroundSignIn from "../assets/SignIn/BackgroundSignIn.jpg";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profileFor: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let temp = {};

    temp.profileFor = formData.profileFor
      ? ""
      : "Please select a profile type.";
    temp.gender = formData.gender ? "" : "Please select gender.";

    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Enter a valid email address.";

    temp.phone = /^[0-9]{10}$/.test(formData.phone)
      ? ""
      : "Enter a valid 10-digit phone number.";

    temp.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
      formData.password
    )
      ? ""
      : "Password must be at least 8 characters, include uppercase, lowercase and a symbol.";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiMessage("");

    const payload = {
      email: formData.email,
      mobileNumber: formData.phone,
      password: formData.password,
      role: "USER",
      profileFor: formData.profileFor,
      gender: formData.gender,
    };

    try {
      const res = await axios.post(
        "https://mttlprv1-production.up.railway.app/api/v1/users/register",
        payload
      );

      // Save gender for login
      localStorage.setItem("signupGender", formData.gender);

      setApiMessage("Registration Successful!");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      setApiMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex justify-end items-start pt-5 px-4 sm:px-6 font-[Inter] min-h-screen"
      style={{
        backgroundImage: `url(${BackgroundSignIn})`,
        backgroundSize: "cover",
        backgroundPosition: "calc(50% - 88px) center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black"></div>

      {/* Card */}
      <div className="relative z-10 bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md mr-4 sm:mr-12 lg:mr-20">
        <h2 className="text-center text-2xl font-semibold mb-4">
          <span className="text-black">Find Your Perfect </span>
          <span className="text-orange-500">Life Partner</span>
        </h2>

        {apiMessage && (
          <p
            className={`text-center text-sm font-medium mb-3 ${
              apiMessage.includes("Successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {apiMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Profile For */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Profile For <span className="text-red-500">*</span>
            </label>
            <select
              name="profileFor"
              value={formData.profileFor}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.profileFor
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              }`}
            >
              <option value="">Select</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Sister">Sister</option>
              <option value="Relative/Friend">Relative/Friend</option>
              <option value="Client-Marriage Bureau">
                Client-Marriage Bureau
              </option>
            </select>
            {errors.profileFor && (
              <p className="text-xs text-red-500 mt-1">{errors.profileFor}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.gender
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              }`}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="0000000000"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-1 leading-relaxed">
            *By registering, I agree to the Terms & Conditions and Privacy
            Policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white py-2 rounded-md font-medium transition-all duration-300 mt-1 text-sm`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-3">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
