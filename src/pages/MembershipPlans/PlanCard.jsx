import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const planData = {
  Basic: {
    price: 15,
    features: [
      "Access up to 50 profiles",
      "Message via platform",
      "Basic search filters",
      "Public visibility",
      "Standard support",
    ],
  },
  Premium: {
    price: 39,
    tag: "Most Popular",
    features: [
      "Unlimited profile access",
      "Advanced matchmaking filters",
      "Priority search visibility",
      "Profile verification badge",
      "Dedicated relationship manager",
      "Video call feature",
      "24/7 premium support",
    ],
  },
  Elite: {
    price: 79,
    features: [
      "Everything in Premium",
      "Exclusive matchmaking assistance",
      "Personalized recommendations",
      "Access to elite community",
      "Enhanced privacy controls",
    ],
  },
  Platinum: {
    price: 159,
    features: [
      "24/7 personal relationship manager",
      "Direct meeting coordination",
      "Exclusive verified circle",
      "Premium support anytime",
      "Success guarantee",
    ],
  },
};

const PlanCard = ({ planName, billing }) => {
  const plan = planData[planName];

  const price =
    billing === "monthly"
      ? plan.price
      : Math.round(plan.price * 12 * 0.8); // 20% discount yearly

  const priceLabel = billing === "monthly" ? "/month" : "/year";

  return (
    <div
      className={`bg-white shadow-lg rounded-2xl p-6 text-center border ${
        plan.tag ? "border-[#FF7A00]" : "border-gray-200"
      } relative hover:scale-105 transition-transform duration-300`}
    >
      {plan.tag && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF7A00] text-white px-4 py-1 rounded-full text-xs font-semibold">
          {plan.tag}
        </span>
      )}

      <h3 className="text-xl font-semibold mb-2">{planName}</h3>

      {/* Price */}
      <p className="text-3xl font-bold text-[#FF7A00] mb-4">
        ${price}
        <span className="text-sm text-gray-500">{priceLabel}</span>
      </p>

      {/* Features */}
      <ul className="text-sm text-gray-700 space-y-2 mb-6 text-left min-h-[160px]">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <FaCheckCircle className="text-[#00C851]" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        className={`w-full py-2 rounded-lg font-semibold transition ${
          plan.tag
            ? "bg-[#FF7A00] text-white hover:bg-[#e96d00]"
            : "border border-[#FF7A00] text-[#FF7A00] hover:bg-[#FFF0E6]"
        }`}
      >
        Choose {planName}
      </button>
    </div>
  );
};

export default PlanCard;
