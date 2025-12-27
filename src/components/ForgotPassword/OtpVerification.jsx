import React, { useState, useRef } from "react";
import { FiClock } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineExclamation, AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import image from "../../assets/ForgotPassword/sideImageBackground.webp";
import bgImage from "../../assets/home/Bgframe.png";

export default function OtpVerification() {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    if (code.some((digit) => digit === "")) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setError("");
    navigate("/reset");
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

      {/* MAIN WRAPPER (Same as Forgot Password) */}
      <div className="relative w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg border overflow-hidden min-h-[85vh] flex z-10">

        {/* INNER FLEX CONTAINER */}
        <div className="relative w-full flex bg-white min-h-[85vh]">

          <div className="p-2 sm:p-4 w-full flex">
            <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden h-full w-full">

              {/* LEFT PANEL */}
              <div
                className="hidden md:flex md:w-1/2 flex-col justify-between p-6 md:p-8 text-white min-h-[85vh]"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(246,162,97,0.92), rgba(244,150,97,0.78)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                    Account Security
                  </h2>

                  <div className="space-y-6">
                    <Feature
                      icon={<BsShieldCheck />}
                      title="Secure Process"
                      text="Your password reset is protected with encryption"
                    />

                    <Feature
                      icon={<FiClock />}
                      title="Quick & Easy"
                      text="Enter the code below to verify your identity"
                    />

                    <Feature
                      icon={<AiOutlineCheckCircle />}
                      title="One Time Code"
                      text="Please enter the 6-digit OTP sent to your email"
                      orangeWhite
                    />
                  </div>
                </div>

                <div className="bg-white/30 rounded-md p-3 flex items-center gap-3 border border-white/50 text-sm max-w-[22rem]">
                  <div className="w-9 h-9 rounded-full border border-white flex items-center justify-center bg-white/20">
                    <AiOutlineExclamation className="w-5 h-5 text-white" />
                  </div>
                  <span>This code expires in 15 minutes</span>
                </div>

              </div>

              {/* RIGHT PANEL */}
              <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg min-h-[85vh]">

                <div className="w-full h-full border border-gray-200 rounded-lg flex flex-col bg-white">

                  {/* Header */}
                  <div className="px-4 sm:px-6 py-4 flex items-center">
                    <button
                      onClick={() => navigate(-1)}
                      className="text-sm text-[#f68527] font-medium hover:underline"
                    >
                      ← Back
                    </button>

                    <h3 className="flex-1 text-center text-[20px] sm:text-[30px] text-[#f68527] font-medium">
                      Enter Verification Code
                    </h3>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* OTP INPUT AREA */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col text-[16px] sm:text-[17px]">

                    <label className="text-sm text-gray-700 block mb-3">
                      Enter the 6-digit code sent to your email <span className="text-red-500">*</span>
                    </label>

                    {/* OTP Boxes */}
                    <div className="flex justify-between mb-4">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          maxLength={1}
                          value={digit}
                          ref={(el) => (inputsRef.current[index] = el)}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-300 rounded-lg text-center text-xl shadow-sm outline-none"
                        />
                      ))}
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-red-500 text-xs mb-4">{error}</p>
                    )}

                    {/* Info box */}
                    <div className="mb-6">
                      <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white text-lg font-bold">
                          !
                        </div>
                        <div>Please ensure the OTP matches the one sent to your registered email.</div>
                      </div>
                    </div>

                    <p className="text-[12px] text-gray-400 text-center mb-4">
                      *By clicking Continue, I agree to the T&C and Privacy Policy
                    </p>

                    {/* CONTINUE BUTTON */}
                    <button
                      onClick={handleContinue}
                      className="mt-4 w-full bg-[#f68527] text-white py-2.5 rounded-lg shadow-sm hover:bg-[#dd7226] transition text-sm"
                    >
                      Continue
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

/* Feature Component */
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
