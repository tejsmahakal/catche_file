// import React from "react";
// import { Heart, MoreVertical } from "lucide-react";
// import profileImg from "../../assets/PendingRequest/Pending.jpg";

// const RequestCard = ({ item }) => {
//   if (!item) return null;

//   return (
//     <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm w-full">
//       <div className="flex gap-4">
//         {/* IMAGE */}
//         <div className="w-44 h-60">
//           <img
//             src={profileImg}
//             alt={item.name || "Profile"}
//             className="w-full h-full rounded-xl object-cover border"
//           />
//         </div>

//         {/* USER INFO */}
//         <div className="flex-1">
//           {/* NAME + HEART + PROFILE ID */}
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-orange-600">
//               {item.name || "Profile"}
//             </h2>

//             <div className="flex items-center gap-2">
//               {/* HEART BUTTON */}
//               <button
//                 title="Add to favourites"
//                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
//               >
//                 <Heart size={14} fill="white" />
//               </button>

//               {/* PROFILE ID */}
//               <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                 ID: {item.profileId}
//               </span>
//             </div>
//           </div>

//           {/* DETAILS */}
//           <div className="text-sm text-gray-700 space-y-1 mt-2">
//             {item.age && (
//               <p>
//                 <strong>Age :</strong> {item.age} yrs
//               </p>
//             )}

//             {item.gender && (
//               <p>
//                 <strong>Gender :</strong> {item.gender}
//               </p>
//             )}

//             {item.height && (
//               <p>
//                 <strong>Height :</strong> {item.height} cm
//               </p>
//             )}

//             {item.religion && (
//               <p>
//                 <strong>Religion :</strong> {item.religion}
//               </p>
//             )}

//             {item.caste && (
//               <p>
//                 <strong>Caste :</strong> {item.caste}
//               </p>
//             )}

//             {item.city && (
//               <p>
//                 <strong>Res. City :</strong> {item.city}
//               </p>
//             )}

//             {item.maritalStatus && (
//               <p>
//                 <strong>Marital Status :</strong> {item.maritalStatus}
//               </p>
//             )}
//           </div>

//           {/* REQUEST STATUS */}
//           <p className="mt-3 font-semibold">
//             Request :
//             <span className="ml-2 text-orange-500">
//               {item.status}
//             </span>
//           </p>

//           {/* ACTION BUTTONS */}
//           <div className="mt-3">
//             {item.status === "Pending" && (
//               <button className="bg-orange-100 text-orange-600 px-4 py-1 rounded-md cursor-default">
//                 Pending
//               </button>
//             )}

//             {item.status === "Approved" && (
//               <button className="bg-green-500 text-white px-4 py-1 rounded-md">
//                 Call
//               </button>
//             )}

//             {item.status === "Rejected" && (
//               <button className="bg-red-500 text-white px-4 py-1 rounded-md">
//                 Cancel Request
//               </button>
//             )}
//           </div>
//         </div>

//         {/* 3-DOT MENU */}
//         <div className="flex items-start">
//           <MoreVertical size={20} className="text-gray-500 cursor-pointer" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestCard;





import React, { useMemo } from "react";
import { Heart, MoreVertical } from "lucide-react";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";

const RequestCard = ({ item }) => {
  if (!item) return null;

  const {
    name,
    age,
    gender,
    religion,
    caste,
    height,
    city,
    maritalStatus,
    status,
    profileId,
    hasProfilePhoto,
    profilePhotoBase64,
    profilePhotoContentType,
  } = item;

  // SAFE IMAGE RESOLUTION (LIKE GROOM CARD)
  const imageSrc = useMemo(() => {
    if (
      hasProfilePhoto === true &&
      profilePhotoBase64 &&
      profilePhotoContentType
    ) {
      return `data:${profilePhotoContentType};base64,${profilePhotoBase64}`;
    }
    return defaultProfileImg;
  }, [hasProfilePhoto, profilePhotoBase64, profilePhotoContentType]);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm w-full">
      <div className="flex gap-4">

        {/* IMAGE */}
        <div className="w-44 h-60">
          <img
            src={imageSrc}
            alt={name || "Profile"}
            className="w-full h-full rounded-xl object-cover border"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultProfileImg;
            }}
          />
        </div>

        {/* USER INFO */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-orange-600">
              {name || "Profile"}
            </h2>

            <div className="flex items-center gap-2">
              <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                <Heart size={14} fill="white" />
              </button>

              <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                ID: {profileId}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-700 space-y-1 mt-2">
            {age && <p><strong>Age :</strong> {age} yrs</p>}
            {gender && <p><strong>Gender :</strong> {gender}</p>}
            {height && <p><strong>Height :</strong> {height} cm</p>}
            {religion && <p><strong>Religion :</strong> {religion}</p>}
            {caste && <p><strong>Caste :</strong> {caste}</p>}
            {city && <p><strong>Res. City :</strong> {city}</p>}
            {maritalStatus && (
              <p><strong>Marital Status :</strong> {maritalStatus}</p>
            )}
          </div>

          <p className="mt-3 font-semibold">
            Request :
            <span className="ml-2 text-orange-500">{status}</span>
          </p>

          <div className="mt-3">
            {status === "Pending" && (
              <button className="bg-orange-100 text-orange-600 px-4 py-1 rounded-md cursor-default">
                Pending
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <MoreVertical size={20} className="text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
