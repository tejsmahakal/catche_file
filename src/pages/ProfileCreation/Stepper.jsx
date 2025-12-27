import React from "react";

const Stepper = ({ step, completedStep, goToStep, hasSavedData }) => {
  return (
    <div className="w-full py-2">
      {/* DESKTOP + TABLET (Centered, No Scroll) */}
      <div className="hidden sm:flex justify-center">
        <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isActive = num === step;
            const isCompleted = num <= completedStep;
            
            // FIXED: Only completed steps + current step are enabled
            const isEnabled = hasSavedData ? true : (num <= completedStep || num === step);

            return (
              <button
                key={num}
                onClick={() => isEnabled && goToStep(num)}
                disabled={!isEnabled}
                className={`
                  flex justify-center items-center rounded-full border
                  transition-all duration-300 text-sm md:text-base
                  transform hover:scale-105
                  ${isActive
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-110"
                    : isCompleted
                    ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                    : isEnabled
                    ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-50"
                  }
                `}
                style={{
                  width: "44px",
                  height: "44px",
                  fontWeight: 600,
                }}
              >
                {num}
                {/* REMOVED the green dot */}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE VIEW (Scrollable) */}
      <div className="sm:hidden w-full overflow-x-auto">
        <div className="flex items-center gap-3 px-3 min-w-max">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isActive = num === step;
            const isCompleted = num <= completedStep;
            
            // FIXED: Only completed steps + current step are enabled
            const isEnabled = hasSavedData ? true : (num <= completedStep || num === step);

            return (
              <button
                key={num}
                onClick={() => isEnabled && goToStep(num)}
                disabled={!isEnabled}
                className={`
                  flex justify-center items-center rounded-full border
                  transition-all duration-300 text-xs
                  transform hover:scale-105
                  ${isActive
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-110"
                    : isCompleted
                    ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                    : isEnabled
                    ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-50"
                  }
                `}
                style={{
                  width: "38px",
                  height: "38px",
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {num}
                {/* REMOVED the green dot */}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend - REMOVED completely */}
    </div>
  );
};

export default Stepper;