import React from "react";

const BillingToggle = ({ billing, setBilling }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mb-10">
      <button
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          billing === "monthly"
            ? "bg-[#FF7A00] text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setBilling("monthly")}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
          billing === "yearly"
            ? "bg-[#FF7A00] text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setBilling("yearly")}
      >
        Yearly{" "}
        <span className="text-xs bg-white text-[#FF7A00] px-2 py-[2px] rounded-full">
          Save 20%
        </span>
      </button>
    </div>
  );
};

export default BillingToggle;
