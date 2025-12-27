import React from "react";

const SkeletonSearchCard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden w-full max-w-3xl mx-auto animate-pulse">

      {/* Image Skeleton */}
      <div className="md:w-1/3 w-full h-60 bg-gray-300"></div>

      {/* Details */}
      <div className="p-4 px-8 flex-1 space-y-4">

        {/* Name + ID */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>

        {/* Profile details */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Button */}
        <div className="h-8 bg-gray-300 rounded w-32 mt-4"></div>

      </div>
    </div>
  );
};

export default SkeletonSearchCard;
