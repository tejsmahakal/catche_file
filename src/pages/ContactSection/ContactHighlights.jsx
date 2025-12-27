import React from "react";
import { FaCheckCircle, FaLock, FaStar, FaUserFriends } from "react-icons/fa";

const ContactHighlights = () => {
  const highlights = [
    {
      icon: <FaCheckCircle className="text-white text-2xl" />,
      title: "Verified Profiles",
      description: "All profiles are manually verified for authenticity and safety.",
    },
    {
      icon: <FaStar className="text-white text-2xl" />,
      title: "Success Stories",
      description: "Over 50,000 successful marriages through our platform.",
    },
    {
      icon: <FaUserFriends className="text-white text-2xl" />,
      title: "Expert Support",
      description: "Dedicated relationship experts to guide your journey.",
    },
    {
      icon: <FaLock className="text-white text-2xl" />,
      title: "Privacy First",
      description: "Your data is secure with industry-leading privacy protection.",
    },
  ];

  return (
    <section className="max-w-8xl mx-auto py-12 px-6 font-[Inter]">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {highlights.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="bg-[#FF7A00] p-4 rounded-xl">{item.icon}</div>
              <h4 className="font-semibold text-[#2B1B0E]">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactHighlights;