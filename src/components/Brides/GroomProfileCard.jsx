import React from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/ViewProfile/ProfilePic-Groom.jpg";
 
const GroomProfileCard = () => {
 
  const navigate = useNavigate();
 
  const handleClick = () => {
    navigate('/emptyBiodata');
  };
 
  return (
    <div className="flex items-center gap-4 bg-white border border-black rounded-2xl shadow-md p-4 w-full">
     
      {/* Profile Image */}
      <div className="w-28 h-36 sm:w-32 sm:h-40">
        <img
          src={profileImg}
          alt="Profile"
          className="w-full h-full object-cover rounded-xl border border-gray-300"
        />
      </div>
 
      {/* Profile Info */}
      <div className="flex-1">
       
        {/* Name + ID */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-orange-600">
            Kedar
          </h2>
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            GR25086
          </span>
        </div>
 
        {/* Details */}
        <div className="text-sm text-gray-700 mt-2 space-y-1">
          <p><span className="font-semibold text-gray-800">Birth Date :</span> 31-10-2003 (22 Yrs)</p>
          <p><span className="font-semibold text-gray-800">Height :</span> 5'03"</p>
          <p><span className="font-semibold text-gray-800">Education :</span> ENGINEER</p>
          <p><span className="font-semibold text-gray-800">Occupation :</span> NOT WORKING</p>
          <p><span className="font-semibold text-gray-800">Res. City :</span> SANGLI</p>
          <p><span className="font-semibold text-gray-800">Caste :</span> 96 KULI MARATHA</p>
        </div>
 
        {/* Button */}
        <button
          onClick={handleClick}
          className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-md transition-all"
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
};
 
export default GroomProfileCard;