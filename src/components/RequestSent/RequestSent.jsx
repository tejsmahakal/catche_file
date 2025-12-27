import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const RequestSent = ({ show, onBack }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-[Inter]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center w-[90%] sm:w-[400px] font-[Inter]"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-14 h-14" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 font-[Inter]">
          Request Sent Successfully
        </h2>

        {/* Message */}
        <p className="text-gray-600 mt-2 font-[Inter]">
          Your interest request has been sent to the user. Please wait for their response.
        </p>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="mt-6 bg-orange-500 text-white font-medium px-6 py-2 rounded-full hover:bg-orange-600 transition font-[Inter]"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
};

export default RequestSent;
