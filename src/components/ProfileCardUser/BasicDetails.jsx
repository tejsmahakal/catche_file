import React, { useState } from "react";
import { Search } from "lucide-react";

const BasicDetails = () => {
  const [gender, setGender] = useState("Male");
  const [ageRange, setAgeRange] = useState([18, 25]);
  const [maritalStatus, setMaritalStatus] = useState("Never Married");
  const [heightRange, setHeightRange] = useState([60, 72]);

  const genderOptions = ["Male", "Female", "Other"];
  const maritalOptions = ["Never Married", "Divorced", "Widowed", "Separated"];

  const handleAgeChange = (index, value) => {
    const newRange = [...ageRange];
    newRange[index] = Number(value);
    if (index === 0 && newRange[0] > newRange[1]) return;
    if (index === 1 && newRange[1] < newRange[0]) return;
    setAgeRange(newRange);
  };

  const formatHeight = (inches) => {
    const ft = Math.floor(inches / 12);
    const inch = inches % 12;
    return `${ft}' ${inch}"`;
  };

  const handleHeightChange = (index, value) => {
    const newRange = [...heightRange];
    newRange[index] = Number(value);
    setHeightRange(newRange);
  };

  const heightOptions = Array.from({ length: 26 }, (_, i) => 53 + i);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Basic Details
      </h2>

      {/* Gender */}
      <div className="mb-6">
        <h3 className="text-gray-700 font-medium mb-2">Gender</h3>

        <div className="flex gap-3 flex-wrap">
          {genderOptions.map((option) => (
            <button
              key={option}
              onClick={() => setGender(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                gender === option
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-orange-400 text-orange-500 hover:bg-orange-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="mb-6">
        <h3 className="text-gray-700 font-medium mb-2">Age</h3>

        <div className="relative w-full h-2 mt-4">
          <div className="absolute inset-0 bg-gray-300 rounded-full" />
          <div
            className="absolute bg-orange-500 h-2 rounded-full"
            style={{
              left: `${((ageRange[0] - 18) / 42) * 100}%`,
              right: `${100 - ((ageRange[1] - 18) / 42) * 100}%`,
            }}
          />

          {/* Thumb 1 */}
          <input
            type="range"
            min="18"
            max="60"
            value={ageRange[0]}
            onChange={(e) => handleAgeChange(0, e.target.value)}
            className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-orange-500"
          />

          {/* Thumb 2 */}
          <input
            type="range"
            min="18"
            max="60"
            value={ageRange[1]}
            onChange={(e) => handleAgeChange(1, e.target.value)}
            className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-orange-500"
          />
        </div>

        <div className="flex justify-between mt-3">
          <span className="bg-orange-500 text-white text-sm rounded-md px-3 py-1">
            {ageRange[0]}
          </span>
          <span className="bg-orange-500 text-white text-sm rounded-md px-3 py-1">
            {ageRange[1]}
          </span>
        </div>
      </div>

      {/* Marital Status */}
      <div className="mb-6">
        <h3 className="text-gray-700 font-medium mb-2">Marital Status</h3>

        <div className="flex gap-2 flex-wrap">
          {maritalOptions.map((option) => (
            <button
              key={option}
              onClick={() => setMaritalStatus(option)}
              className={`px-3 py-2 rounded-lg text-sm border font-medium transition-all ${
                maritalStatus === option
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-orange-400 text-orange-500 hover:bg-orange-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Height */}
      <div>
        <h3 className="text-gray-700 font-medium mb-2 flex items-center gap-2">
          Height Range <Search className="w-4 h-4 text-orange-500" />
        </h3>

        <div className="flex items-center gap-4">
          <select
            value={heightRange[0]}
            onChange={(e) => handleHeightChange(0, e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-2 text-gray-700"
          >
            {heightOptions.map((inch) => (
              <option key={inch} value={inch}>
                {formatHeight(inch)}
              </option>
            ))}
          </select>

          <span className="text-gray-600 text-sm font-medium">to</span>

          <select
            value={heightRange[1]}
            onChange={(e) => handleHeightChange(1, e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-2 text-gray-700"
          >
            {heightOptions.map((inch) => (
              <option key={inch} value={inch}>
                {formatHeight(inch)}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-3 text-gray-600 text-sm">
          Selected: <b>{formatHeight(heightRange[0])}</b> to{" "}
          <b>{formatHeight(heightRange[1])}</b>
        </p>
      </div>
    </div>
  );
};

export default BasicDetails;
