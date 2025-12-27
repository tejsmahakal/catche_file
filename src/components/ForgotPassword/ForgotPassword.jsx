import React, { useState } from "react";
import { FiMail, FiClock } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineExclamation, AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import image from "../../assets/ForgotPassword/sideImageBackground.webp";
import bgImage from "../../assets/home/BgFrame.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = () => {
    if (!email.trim()) {
      setError("Email or mobile number is required.");
      return;
    }
    setError("");
    navigate("/otp");
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

      {/* FULL HEIGHT + FULL WIDTH WRAPPER */}
      <div className="relative w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg border overflow-hidden min-h-[85vh] flex z-10">

        {/* MAIN INNER CONTAINER */}
        <div className="relative bg-white rounded-xl w-full overflow-hidden shadow-lg flex min-h-[85vh]">

          <div className="p-2 sm:p-4 w-full">

            <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden h-full">

              {/* LEFT PANEL */}
              <div
                className="md:w-1/2 hidden md:flex flex-col justify-between p-6 md:p-8 rounded-lg text-white h-full min-h-[85vh]"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(246,162,97,0.92), rgba(244,150,97,0.78)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6">Account Security</h2>

                  <div className="space-y-6">
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
                      text="We'll verify your identity through your registered email"
                      orangeWhite
                    />
                  </div>
                </div>

                <div className="bg-white/30 rounded-md p-3 flex items-center gap-3 max-w-[22rem] border border-white/50 text-sm">
                  <div className="w-9 h-9 rounded-full border border-white flex items-center justify-center bg-white/20">
                    <AiOutlineExclamation className="w-5 h-5 text-white" />
                  </div>
                  <span>For security reasons, this link expires in 15 minutes</span>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg h-full min-h-[85vh]">

                <div className="w-full h-full rounded-lg border border-gray-200 overflow-hidden flex flex-col bg-white">

                  {/* Back Header */}
                  <div className="px-4 sm:px-6 py-4 flex items-center">
                    <button
                      onClick={() => navigate(-1)}
                      className="text-sm text-[#f68527] font-medium hover:underline"
                    >
                      ← Back
                    </button>

                    <h3 className="flex-1 text-center text-[18px] sm:text-[30px] text-[#f68527] font-medium">
                      Forgot Password
                    </h3>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* FORM AREA */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col bg-white text-[16px] sm:text-[17px]">

                    <label className="text-sm text-gray-700 block mb-8">
                      Email ID & Mobile No. <span className="text-red-500">*</span>
                    </label>

                    <div className="mb-8">
                      <div className="flex items-center rounded-lg border border-gray-300 px-3 py-4 bg-gray-100">
                        <FiMail className="text-gray-500 mr-6 text-base" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="email@example.com"
                          className="w-full text-sm outline-none bg-gray-100"
                        />
                      </div>
                    </div>

                    {/* Error */}
                    {error && <p className="text-red-500 text-xs mb-5">{error}</p>}

                    <div className="mb-5">
                      <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white text-lg font-bold">
                          !
                        </div>
                        <div>Make sure to use the email address registered with your account</div>
                      </div>
                    </div>

                    <p className="text-[12px] text-gray-400 text-center mt-3 mb-4">
                      *By clicking register free, I agree to the T&C and Privacy Policy
                    </p>

                    {/* BUTTON */}
                    <button
                      onClick={handleSendCode}
                      className="mt-3 w-full bg-[#f68527] text-white py-2.5 rounded-lg shadow-sm hover:bg-[#dd7226] transition text-sm"
                    >
                      Send a Code
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

/* Reusable Feature Component */
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
