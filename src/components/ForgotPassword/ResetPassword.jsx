import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiClock } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import {
  AiOutlineExclamation,
  AiOutlineCheckCircle,
} from "react-icons/ai";

import image from "../../assets/ForgotPassword/sideImageBackground.webp";
import bgImage from "../../assets/home/Bgframe.png";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const validatePassword = () => {
    let temp = {};

    temp.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password)
      ? ""
      : "Password must be at least 8 characters and include uppercase, lowercase and a symbol.";

    temp.confirmPassword =
      password === confirmPassword ? "" : "Passwords do not match.";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    if (!validateCaptcha(captchaInput)) {
      alert("Invalid Captcha");
      setCaptchaInput("");
      loadCaptchaEnginge(6);
      return;
    }

    alert("Password reset successful!");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative">

      {/* Background Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/20"></div>

      {/* MAIN WRAPPER (Same as Forgot + OTP page) */}
      <div className="relative w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg border overflow-hidden min-h-[85vh] flex z-10">

        {/* INNER CONTENT FLEX */}
        <div className="relative w-full flex bg-white min-h-[85vh]">

          <div className="p-2 sm:p-4 w-full">
            <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden h-full">

              {/* LEFT PANEL */}
              <div
                className="hidden md:flex md:w-1/2 flex-col justify-between p-8 text-white min-h-[85vh]"
                style={{
                  backgroundImage: `linear-gradient(135deg,
                    rgba(246,162,97,0.92),
                    rgba(244,150,97,0.78)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div>
                  <h2 className="text-3xl font-semibold mb-8 leading-tight">
                    Account Security
                  </h2>

                  <div className="space-y-7">
                    <Feature
                      icon={<BsShieldCheck />}
                      title="Secure Process"
                      text="Your password reset is protected with industry-standard encryption"
                    />

                    <Feature
                      icon={<FiClock />}
                      title="Quick & Easy"
                      text="Reset your password in just a few simple steps"
                    />

                    <Feature
                      icon={<AiOutlineCheckCircle />}
                      title="Verified Email"
                      text="We confirm your identity through your registered email"
                      orangeWhite
                    />
                  </div>
                </div>

                <div className="bg-white/30 rounded-md p-3 flex items-center gap-3 border border-white/50 text-sm max-w-[22rem]">
                  <div className="w-9 h-9 rounded-full border border-white flex items-center justify-center bg-white/20">
                    <AiOutlineExclamation className="w-5 h-5 text-white" />
                  </div>
                  <span>This reset link expires in 15 minutes</span>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg min-h-[85vh]">

                <div className="border border-gray-200 rounded-lg flex flex-col h-full bg-white">

                  {/* HEADER */}
                  <div className="px-6 py-4 flex items-center">
                    <button
                      onClick={() => navigate(-1)}
                      className="text-sm text-[#f68527] font-medium hover:underline"
                    >
                      ← Back
                    </button>

                    <h3 className="flex-1 text-center text-[20px] sm:text-[30px] text-[#f68527] font-medium">
                      Create New Password
                    </h3>

                    <span className="w-5 sm:w-10" />
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* FORM AREA */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col text-[16px] sm:text-[17px]">

                    {/* NEW PASSWORD */}
                    <label className="text-sm text-gray-700 block mb-2">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-[#f4a361]"
                      }`}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}

                    {/* CONFIRM PASSWORD */}
                    <label className="text-sm text-gray-700 block mt-5 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm outline-none focus:ring-2 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-[#f4a361]"
                      }`}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                    )}

                    {/* CAPTCHA */}
                    <div className="mt-6">
                      <label className="text-sm text-gray-700 block mb-2">
                        Captcha <span className="text-red-500">*</span>
                      </label>

                      <div className="flex items-center justify-between gap-4">
                        <div className="bg-gray-100 border p-2 rounded-lg w-1/2">
                          <LoadCanvasTemplate reloadColor="#f4a361" />
                        </div>

                        <input
                          type="text"
                          placeholder="Enter captcha"
                          className="w-[45%] px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#f4a361]"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-[#f4a361] text-white py-3 rounded-lg shadow-sm hover:bg-[#e6934f] transition text-sm sm:text-base mt-7"
                    >
                      Reset Password
                    </button>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* LEFT-PANEL FEATURE ICON COMPONENT */
function Feature({ icon, title, text, orangeWhite }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md border ${
          orangeWhite ? "bg-white border-white" : "bg-white"
        }`}
      >
        {React.cloneElement(icon, {
          className: "w-5 h-5 text-[#f68527]",
        })}
      </div>

      <div>
        <p className="text-base font-medium">{title}</p>
        <p className="text-sm max-w-[16rem] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
