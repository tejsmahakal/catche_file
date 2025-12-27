import React, { useState } from "react";
import { FaFilter, FaUndo } from "react-icons/fa";

const FilterSidebarGroom = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    city: "",
    maritalStatus: "",
    professions: [],
  });

  const handleSelectChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      professions: checked
        ? [...prev.professions, value]
        : prev.professions.filter((p) => p !== value),
    }));
  };

  const handleReset = () => {
    setFilters({
      city: "",
      maritalStatus: "",
      professions: [],
    });
  };

  return (
    <div className="w-full">

      {/*  RIGHT ALIGN CONTAINER  */}
      <div className="flex justify-end pr-0">

        {/*  WRAPPER BOX (LIGHT GRAY BACKGROUND)  */}
        <div
          className="p-4 rounded-lg w-full"
          style={{
            backgroundColor: "#f0f0f0",
            maxWidth: "100%", // full width inside sidebar
          }}
        >

          <h2 className="text-xl font-semibold mb-5 mt-0 flex items-center gap-2 text-gray-800">
            <FaFilter className="text-orange-500" />
            Filters
          </h2>

          {/* City */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-600 font-medium">City</label>
            <select
              name="city"
              value={filters.city}
              onChange={handleSelectChange}
              className="w-full border rounded-lg p-2 text-gray-700"
            >
              <option value="">Select</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Sangli</option>
              <option>Kolhapur</option>
              <option>Nashik</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-600 font-medium">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={filters.maritalStatus}
              onChange={handleSelectChange}
              className="w-full border rounded-lg p-2 text-gray-700"
            >
              <option value="">Select</option>
              <option>Unmarried</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </div>

          {/* Profession */}
          <div className="mt-4">
            <h3 className="text-gray-700 font-medium mb-2">
              Profession / Qualification
            </h3>
            <div className="space-y-2 text-gray-700">
              {[
                "Engineer",
                "Graduate",
                "Post Graduate",
                "Own Business",
                "Government",
                "Teaching",
              ].map((profession) => (
                <label key={profession} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={profession}
                    checked={filters.professions.includes(profession)}
                    onChange={handleCheckboxChange}
                  />
                  {profession}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              <FaUndo /> Clear
            </button>

            <button
              onClick={() => onSearch(filters)}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>

        </div>
        {/* END GRAY BOX */}

      </div>
      {/* END RIGHT ALIGN */}

    </div>
  );
};

export default FilterSidebarGroom;
