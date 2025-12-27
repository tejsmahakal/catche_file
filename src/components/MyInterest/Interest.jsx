// src/components/MyInterest/Interest.jsx
import React from "react";

const InterestDashboard = () => {
  return (
    <div className="min-h-screen bg-white p-0 overflow-x-hidden">
      <div className="max-w-6xl mx-auto border border-black-300 rounded-lg p-6">

        {/* My Interest Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-1">My Interest</h1>

            {/* Responsive Orange Line */}
            <div className="h-0.5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-orange-500"></div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-6 sm:space-y-0">

            {/* Left Column */}
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-gray-800 font-medium">
                  Express Interest received{" "}
                  <span className="text-gray-400">(7)</span>
                </span>
              </div>

              <div className="text-gray-700">
                <div className="mb-2">
                  Accepted <span className="text-gray-400 font-semibold">(5)</span>
                </div>
                <div className="mb-2">
                  Declined <span className="text-gray-400 font-semibold">(1)</span>
                </div>
                <div>
                  Pending <span className="text-gray-400 font-semibold">(1)</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-gray-800 font-medium">
                  Express Interest Sent{" "}
                  <span className="text-gray-500">(0)</span>
                </span>
              </div>

              <div className="text-gray-700">
                <div className="mb-2">
                  Accepted <span className="text-gray-400 font-semibold">(0)</span>
                </div>
                <div className="mb-2">
                  Declined <span className="text-gray-400 font-semibold">(0)</span>
                </div>
                <div>
                  Pending <span className="text-gray-400 font-semibold">(0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Messages Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">My Messages</h2>

            {/* Responsive Orange Line */}
            <div className="h-0.5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-orange-500"></div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-6 sm:space-y-0">

            {/* Left Column */}
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-gray-800 font-medium">
                  Express Interest received{" "}
                  <span className="text-gray-400">(7)</span>
                </span>
              </div>

              <div className="text-gray-700">
                <div className="mb-2">
                  Accepted <span className="text-gray-400 font-semibold">(5)</span>
                </div>
                <div className="mb-2">
                  Declined <span className="text-gray-400 font-semibold">(1)</span>
                </div>
                <div>
                  Pending <span className="text-gray-400 font-semibold">(1)</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-gray-800 font-medium">
                  Express Interest Sent{" "}
                  <span className="text-gray-500">(0)</span>
                </span>
              </div>

              <div className="text-gray-700">
                <div className="mb-2">
                  Accepted <span className="text-gray-400 font-semibold">(0)</span>
                </div>
                <div className="mb-2">
                  Declined <span className="text-gray-400 font-semibold">(0)</span>
                </div>
                <div>
                  Pending <span className="text-gray-400 font-semibold">(0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InterestDashboard;
