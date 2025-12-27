import React, { useState } from "react";
import BillingToggle from "../../pages/MembershipPlans/BillingToggle";
import PlanCard from "../../pages/MembershipPlans/PlanCard";
import FAQSection from "../../pages/MembershipPlans/FAQSection";

const MembershipPlans = () => {
  const [billing, setBilling] = useState("monthly");

  const planNames = ["Basic", "Premium", "Elite", "Platinum"];

  const faqs = [
    {
      question: "How do I upgrade my membership?",
      answer:
        "You can upgrade your membership at any time by visiting the Membership Plans page and selecting your desired plan. The upgrade is instant, and you'll get immediate access to all premium features.",
    },
    {
      question: "Can I cancel my membership anytime?",
      answer:
        "Yes, you can cancel your membership at any time. Your premium features will remain active until the end of your billing period. We don't offer refunds for partial months.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment gateway partners.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely! We use industry-standard encryption and security measures to protect your data. Your personal information is never shared with third parties without your consent.",
    },
    {
      question: "What happens after my membership expires?",
      answer:
        " After expiration, your account reverts to the Free plan. Your profile remains active, but premium features will be disabled. You can renew anytime to regain access to premium benefits.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied within the first 7 days, contact our support team for a full refund.information is never shared with third parties without your consent.",
    },
  ];

  return (
   <div className="bg-white min-h-screen text-gray-800 font-[Inter]">

  {/* FULL-WIDTH TOP HALF BACKGROUND  */}
  <div
    className="w-full pt-12 pb-32 min-h-[60vh]"
    style={{ backgroundColor: "#FF8C440F" }}
  >
    <section className="text-center px-4 font-[Inter] max-w-7xl mx-auto">

      <h2 className="text-3xl md:text-4xl font-bold text-[#FF7A00] mb-2">
        Choose Your Perfect Plan
      </h2>

      <p className="text-gray-700 max-w-xl mx-auto mb-6">
        Choose the perfect plan for your journey to love. Premium plans include advanced features.
      </p>

      <BillingToggle billing={billing} setBilling={setBilling} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4">
        {planNames.map((name, index) => (
          <PlanCard key={index} planName={name} billing={billing} />
        ))}
      </div>

    </section>
  </div>

 <div className="w-full bg-white py-16 px-[5px]">
  <FAQSection faqs={faqs} />
</div>


</div>

  );
};

export default MembershipPlans;
