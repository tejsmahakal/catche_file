import React from "react";

import { useNavigate } from "react-router-dom";

import { Heart } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-3xl mx-auto">
      {/* Image Section */}
      <div className="relative md:w-1/3 w-full">
        {/* Profile Image */}
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-60 object-cover"
        />


        {/* Keep this section empty or remove conditional rendering */}
      </div>

      {/* Details Section */}
      <div className="p-4 px-8 flex-1">
        {/* Name + Heart + ID */}
        <div className="flex justify-between items-center">
          {/* Left: Name */}
          <h3 className="text-lg font-semibold text-gray-800">
            {profile.name}
          </h3>

          {/* Right: Heart + ID (Conditional) */}

          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all"
                title="Add to favorites"
              >
                <Heart size={18} fill="white" />
              </button>
              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                ID: {profile.id}
              </span>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <ul className="mt-2 text-gray-700 text-sm space-y-0.5">
          {profile.birthDate && (
            <li>
              <strong>Birth Date:</strong> {profile.birthDate}
            </li>
          )}

          {profile.height && (
            <li>
              <strong>Height:</strong> {profile.height}
            </li>
          )}

          {profile.education && (
            <li>
              <strong>Education:</strong> {profile.education}
            </li>
          )}

          {profile.occupation && (
            <li>
              <strong>Occupation:</strong> {profile.occupation}
            </li>
          )}

          {profile.city && (
            <li>
              <strong>Res. City:</strong> {profile.city}
            </li>
          )}

          {profile.caste && (
            <li>
              <strong>Caste:</strong> {profile.caste}
            </li>
          )}
        </ul>

        {/* View Profile Button */}
        <button
          onClick={() => navigate("/OthersEmptyBiodata")}
          className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
