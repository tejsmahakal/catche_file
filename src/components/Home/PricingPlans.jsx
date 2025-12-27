import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Basic",
    priceMonthly: 15,
    description: "Perfect for getting started",
    features: [
      "View up to 50 profiles",
      "Send 10 interests per month",
      "Basic search filters",
      "Profile verification",
      "Email support",
    ],
    buttonText: "Choose Basic",
  },
  {
    name: "Premium",
    priceMonthly: 39,
    description: "Best value for serious seekers",
    features: [
      "Unlimited profile views",
      "Send 100 interests per month",
      "Advanced search filters",
      "Priority profile highlighting",
      "Video calling feature",
      "24/7 priority support",
    ],
    buttonText: "Choose Premium",
    mostPopular: true,
  },
  {
    name: "Elite",
    priceMonthly: 79,
    description: "For the discerning individual",
    features: [
      "Everything in Premium",
      "Personal matchmaker",
      "Exclusive elite profiles",
      "Profile curation",
      "Background verification",
      "Dedicated relationship advisor",
    ],
    buttonText: "Choose Elite",
  },
  {
    name: "Platinum",
    priceMonthly: 159,
    description: "Ultimate luxury experience",
    features: [
      "Everything in Elite",
      "VIP concierge service",
      "Exclusive events access",
      "Professional photography",
      "Date planning assistance",
      "Success guarantee",
    ],
    buttonText: "Choose Platinum",
  },
];

const PricingPlans = () => {
  const [billing, setBilling] = useState("monthly");

  // Compute 20% off yearly price
  const calculateYearlyPrice = (monthly) => {
    return Math.round(monthly * 12 * 0.8);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Heading */}
     <section
  className="relative w-full py-10 text-center text-white"
  style={{ backgroundColor: "#FF8A41" }}
>

        <div className="max-w-5xl mx-auto px-4">
          <h2
            className="font-[Garamond] font-bold text-[42px] md:text-[48px] leading-[1.1] uppercase text-white mb-3"
            style={{ fontFamily: "Garamond, serif" }}
          >
            Choose Your Perfect Plan
          </h2>
          <p
            className="font-[Inter] text-[17px] md:text-[19px] leading-[26px] text-white max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            All plans include verified profiles, privacy protection, and our
            commitment to your success.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <div className="text-center mt-8 mb-10">
        <div className="flex justify-center items-center gap-4">
          <span
            className={`cursor-pointer font-medium transition ${
              billing === "monthly" ? "text-orange-600" : "text-gray-500"
            }`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </span>

          <div
            className="relative w-12 h-6 bg-gray-300 rounded-full cursor-pointer"
            onClick={() =>
              setBilling(billing === "monthly" ? "yearly" : "monthly")
            }
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                billing === "yearly"
                  ? "translate-x-6 bg-orange-500"
                  : "translate-x-0"
              }`}
            ></div>
          </div>

          <span
            className={`cursor-pointer font-medium transition ${
              billing === "yearly" ? "text-orange-600" : "text-gray-500"
            }`}
            onClick={() => setBilling("yearly")}
          >
            Yearly{" "}
            <span className="ml-1 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 pb-16">
        {plans.map((plan) => {
          const yearlyPrice = calculateYearlyPrice(plan.priceMonthly);
          const displayPrice =
            billing === "monthly" ? plan.priceMonthly : yearlyPrice;

          return (
            <div
              key={plan.name}
              className={`relative bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-md ${
                plan.mostPopular
                  ? "border-orange-500 shadow-lg scale-[1.01]"
                  : "border-gray-200"
              }`}
            >
              {plan.mostPopular && (
                <div className="absolute -top-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4 text-center">
                {plan.description}
              </p>

              <div className="text-3xl font-bold text-orange-600 mb-1">
                ₹{displayPrice}
                <span className="text-base font-normal text-gray-500">
                  /{billing === "monthly" ? "month" : "year"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Billed {billing === "monthly" ? "monthly" : "annually"}
              </p>

              <ul className="space-y-2 mb-6 text-sm text-gray-700 w-full">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 justify-start text-left"
                  >
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 rounded-full font-medium transition duration-300 ${
                  plan.mostPopular
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border border-orange-500 text-orange-500 hover:bg-orange-50"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlans;
