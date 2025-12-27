import React from "react";

const FAQContactSection = ({ faqs }) => {
  return (
    <section className="max-w-8xl mx-auto py-12 px-4 font-[Inter]">
      {/* Heading */}
      <h3 className="text-center text-4xl font-bold text-[#FF7A00] mb-4 font-[Inter]">
        Frequently Asked Questions
      </h3>
      <p className="text-center text-white mb-8 font-[Inter]">
        Got questions? We’ve got answers. Feel free to contact our support team if you need help.
      </p>

      {/* FAQ Items */}
      <div className="space-y-4 font-[Inter]">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm open:shadow-md transition-all duration-300"
          >
            <summary className="font-semibold cursor-pointer text-gray-800">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQContactSection;
