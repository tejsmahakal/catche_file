import React from "react";

const FAQSection = ({ faqs }) => {
  return (
    <section className="w-full py-20 font-[Inter] flex justify-center">

      {/* COLORED BOX (10px smaller on both sides) */}
      <div
        className="w-full max-w-[calc(100%-90px)] mx-auto px-6 py-10 rounded-xl"
        style={{ backgroundColor: "#FF8C440F" }}
      >
        {/* Title */}
        <h3 className="text-center text-3xl md:text-4xl font-bold text-[#FF7A00] mb-4">
          Frequently Asked Questions
        </h3>

        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto text-lg">
          Got questions? We’ve got answers. Feel free to contact our support team if you need help.
        </p>

        {/* FAQ LIST */}
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm open:shadow-md transition-all"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer text-lg md:text-xl">
                {faq.question}
              </summary>

              <p className="mt-2 text-gray-600 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

    </section>
  );
};

export default FAQSection;
