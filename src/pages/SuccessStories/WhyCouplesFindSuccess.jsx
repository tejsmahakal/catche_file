import React from "react";
import { FaHeart, FaShieldAlt, FaChartLine } from "react-icons/fa";

const WhyCouplesFindSuccess = () => {
  return (
    <div className="font-[Inter]">
      <section className="bg-white py-16 px-6 sm:px-12 lg:px-20 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12">
          Why Couples Find Success Here
        </h2>

        {/* Feature Cards */}
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {/* Card 1 */}
          <div className="flex items-start bg-white p-6 shadow-md max-w-xs mx-auto">
            {/* Icon on Left with border */}
            <div className="flex-shrink-0 mr-4">
              <div className="border-2 border-gray-200 rounded-full p-3">
                <FaHeart className="text-orange-500 text-5xl" />
              </div>
            </div>
            {/* Content on Right */}
            <div className="text-left">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                Authentic Matching
              </h3>
              <p className="text-gray-600 text-sm">
                Our advanced algorithm matches you based on values, interests, and compatibility.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start bg-white p-6 shadow-md max-w-xs mx-auto">
            {/* Icon on Left with border */}
            <div className="flex-shrink-0 mr-4">
              <div className="border-2 border-gray-200 rounded-full p-3">
                <FaShieldAlt className="text-orange-500 text-5xl" />
              </div>
            </div>
            {/* Content on Right */}
            <div className="text-left">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                Safe & Secure
              </h3>
              <p className="text-gray-600 text-sm">
                All profiles are verified and your privacy is protected with industry-leading security.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start bg-white p-6 shadow-md max-w-xs mx-auto">
            {/* Icon on Left with border */}
            <div className="flex-shrink-0 mr-4">
              <div className="border-2 border-gray-200 rounded-full p-3">
                <FaChartLine className="text-orange-500 text-5xl" />
              </div>
            </div>
            {/* Content on Right */}
            <div className="text-left">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                Active Community
              </h3>
              <p className="text-gray-600 text-sm">
                Join thousands of members actively looking for meaningful relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyCouplesFindSuccess;