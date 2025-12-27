// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const BrideCard = ({ profile }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   if (!profile) return null;

//   const {
//     userProfileId,
//     firstName,
//     age,
//     religion,
//     caste,
//     height,
//     complexion,
//     currentCity,
//     maritalStatus,
//   } = profile;

//   // Height: cm → ft/in
//   const heightInInches = height ? height / 2.54 : 0;
//   const ft = Math.floor(heightInInches / 12);
//   const inches = Math.round(heightInInches % 12);
//   const heightText = height ? `${ft}'${inches}"` : "";

//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-3xl mx-auto">

//       {/* IMAGE */}
//       <div className="relative md:w-1/3 w-full">
//         <img
//           src="/default-avatar.jpg"
//           alt={firstName}
//           className="w-full h-60 object-cover"
//         />
//       </div>

//       {/* DETAILS */}
//       <div className="p-4 px-8 flex-1">

//         {/* NAME + HEART + ID */}
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-800">
//             {firstName || "Profile"}
//           </h3>

//           {isLoggedIn && (
//             <div className="flex items-center space-x-2">
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all"
//                 title="Add to favorites"
//               >
//                 <Heart size={18} fill="white" />
//               </button>

//               <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md text-xs font-semibold">
//                 ID: {userProfileId}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* INFO */}
//         <ul className="mt-2 text-gray-700 text-sm space-y-0.5">
//           {age && (
//             <li>
//               <strong>Age:</strong> {age} Yrs
//             </li>
//           )}

//           {heightText && (
//             <li>
//               <strong>Height:</strong> {heightText}
//             </li>
//           )}

//           {religion && (
//             <li>
//               <strong>Religion:</strong> {religion}
//             </li>
//           )}

//           {caste && (
//             <li>
//               <strong>Caste:</strong> {caste}
//             </li>
//           )}

//           {complexion && (
//             <li>
//               <strong>Complexion:</strong> {complexion}
//             </li>
//           )}

//           {currentCity && (
//             <li>
//               <strong>Res. City:</strong> {currentCity}
//             </li>
//           )}

//           {maritalStatus && (
//             <li>
//               <strong>Marital Status:</strong> {maritalStatus}
//             </li>
//           )}
//         </ul>

//         {/* VIEW PROFILE BUTTON */}
//         <button
//           onClick={() =>
//             navigate("/OthersEmptyBiodataPage", {
//               state: { userProfileId },
//             })
//           }
//           className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
//         >
//           View Profile
//         </button>

//       </div>
//     </div>
//   );
// };

// export default BrideCard;









// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const BrideCard = ({ profile }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   if (!profile) return null;

//   const {
//     userProfileId,
//     firstName,
//     age,
//     religion,
//     caste,
//     height,
//     complexion,
//     currentCity,
//     maritalStatus,
//   } = profile;

//   // Height: cm → ft/in
//   const heightInInches = height ? height / 2.54 : 0;
//   const ft = Math.floor(heightInInches / 12);
//   const inches = Math.round(heightInInches % 12);
//   const heightText = height ? `${ft}'${inches}"` : "";

//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden w-full max-w-3xl mx-auto">

//       {/* IMAGE */}
//       <div className="md:w-1/3 w-full">
//         <img
//           src="/default-avatar.jpg"
//           alt={firstName}
//           className="w-full h-60 object-cover"
//         />
//       </div>

//       {/* DETAILS */}
//       <div className="p-4 px-8 flex-1">
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold">
//             {firstName || "Profile"}
//           </h3>

//           {isLoggedIn && (
//             <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md text-xs font-semibold">
//               ID: {userProfileId}
//             </span>
//           )}
//         </div>

//         <ul className="mt-2 text-sm text-gray-700 space-y-1">
//           {age && <li><strong>Age:</strong> {age}</li>}
//           {heightText && <li><strong>Height:</strong> {heightText}</li>}
//           {religion && <li><strong>Religion:</strong> {religion}</li>}
//           {caste && <li><strong>Caste:</strong> {caste}</li>}
//           {complexion && <li><strong>Complexion:</strong> {complexion}</li>}
//           {currentCity && <li><strong>City:</strong> {currentCity}</li>}
//           {maritalStatus && <li><strong>Status:</strong> {maritalStatus}</li>}
//         </ul>

//         <button
//           onClick={() =>
//             navigate("/OthersEmptyBiodataPage", {
//               state: { userId: userProfileId },
//             })
//           }
//           className="mt-3 bg-orange-500 text-white px-4 py-1.5 rounded-md"
//         >
//           View Profile
//         </button>

//       </div>
//     </div>
//   );
// };

// export default BrideCard;











// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useAddToFavoriteMutation } from "../../context/profileApi";

// const BrideCard = ({ profile }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
//   const [isFavorited, setIsFavorited] = useState(false);

//   if (!profile) return null;

//   const {
//     userProfileId,
//     firstName,
//     age,
//     religion,
//     caste,
//     height,
//     complexion,
//     currentCity,
//     maritalStatus,
//   } = profile;

//   const fullName = firstName || "Profile";

//   // Height: cm → ft/in
//   const heightInInches = height ? height / 2.54 : 0;
//   const ft = Math.floor(heightInInches / 12);
//   const inches = Math.round(heightInInches % 12);
//   const heightText = height ? `${ft}'${inches}"` : "";

//   /* FAVORITE HANDLER (SAME AS GROOMCARD) */
//   const handleFavorite = async () => {
//     if (!isLoggedIn) {
//       navigate("/signin");
//       return;
//     }

//     try {
//       await addToFavorite(userProfileId).unwrap();
//       setIsFavorited(true);
//     } catch (error) {
//       console.error("Add to favorite failed", error);
//       alert(error?.data?.message || "Failed to add to favorites");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-3xl mx-auto">

//       {/* IMAGE */}
//       <div className="relative md:w-1/3 w-full">
//         <img
//           src="/default-avatar.jpg"
//           alt={fullName}
//           className="w-full h-60 object-cover"
//         />
//       </div>

//       {/* DETAILS */}
//       <div className="p-4 px-8 flex-1">
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-800">
//             {fullName}
//           </h3>

//           {isLoggedIn && (
//             <div className="flex items-center space-x-2">
//               {/* FAVORITE BUTTON */}
//               <button
//                 onClick={handleFavorite}
//                 disabled={isFavorited || isLoading}
//                 title={isFavorited ? "Added to Favorites" : "Add to Favorites"}
//                 className={`p-2 rounded-full shadow-md transition-all
//                   ${
//                     isFavorited
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-red-500 hover:bg-red-600 text-white"
//                   }`}
//               >
//                 <Heart
//                   size={18}
//                   fill={isFavorited ? "gray" : "white"}
//                 />
//               </button>

//               <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
//                 ID: {userProfileId}
//               </span>
//             </div>
//           )}
//         </div>

//         <ul className="mt-2 text-gray-700 text-sm space-y-0.5">
//           {age && <li><strong>Age:</strong> {age} Yrs</li>}
//           {religion && <li><strong>Religion:</strong> {religion}</li>}
//           {caste && <li><strong>Caste:</strong> {caste}</li>}
//           {complexion && <li><strong>Complexion:</strong> {complexion}</li>}
//           {heightText && <li><strong>Height:</strong> {heightText}</li>}
//           {currentCity && <li><strong>City:</strong> {currentCity}</li>}
//           {maritalStatus && (
//             <li><strong>Marital Status:</strong> {maritalStatus}</li>
//           )}
//         </ul>

//         {/* SAME NAVIGATION AS GROOMCARD */}
//         <button
//           onClick={() =>
//             navigate(
//               isLoggedIn
//                 ? "/OthersEmptyBiodataPage"
//                 : "/PublicBiodataPage",
//               { state: { profileId: userProfileId } }
//             )
//           }
//           className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BrideCard;








// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useAddToFavoriteMutation } from "../../context/profileApi";

// const BrideCard = ({ profile }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
//   const [isFavorited, setIsFavorited] = useState(false);

//   if (!profile) return null;

//   const {
//     userProfileId,
//     firstName,
//     age,
//     religion,
//     caste,
//     height,
//     complexion,
//     currentCity,
//     maritalStatus,
//     profilePhotoBase64,
//     profilePhotoContentType,
//     hasProfilePhoto,
//   } = profile;

//   const fullName = firstName || "Profile";

//   // Height: cm → ft/in
//   const heightInInches = height ? height / 2.54 : 0;
//   const ft = Math.floor(heightInInches / 12);
//   const inches = Math.round(heightInInches % 12);
//   const heightText = height ? `${ft}'${inches}"` : "";

//   // ✅ BASE64 IMAGE URL
//   const imageSrc = useMemo(() => {
//     if (hasProfilePhoto && profilePhotoBase64 && profilePhotoContentType) {
//       return `data:${profilePhotoContentType};base64,${profilePhotoBase64}`;
//     }
//     return "/default-avatar.jpg";
//   }, [hasProfilePhoto, profilePhotoBase64, profilePhotoContentType]);

//   /* FAVORITE HANDLER */
//   const handleFavorite = async () => {
//     if (!isLoggedIn) {
//       navigate("/signin");
//       return;
//     }

//     try {
//       await addToFavorite(userProfileId).unwrap();
//       setIsFavorited(true);
//     } catch (error) {
//       console.error("Add to favorite failed", error);
//       alert(error?.data?.message || "Failed to add to favorites");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-3xl mx-auto">

//       {/* IMAGE */}
//       <div className="relative md:w-1/3 w-full">
//         <img
//           src={imageSrc}
//           alt={fullName}
//           className="w-full h-60 object-cover"
//         />
//       </div>

//       {/* DETAILS */}
//       <div className="p-4 px-8 flex-1">
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-800">
//             {fullName}
//           </h3>

//           {isLoggedIn && (
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={handleFavorite}
//                 disabled={isFavorited || isLoading}
//                 title={isFavorited ? "Added to Favorites" : "Add to Favorites"}
//                 className={`p-2 rounded-full shadow-md transition-all
//                   ${
//                     isFavorited
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-red-500 hover:bg-red-600 text-white"
//                   }`}
//               >
//                 <Heart size={18} fill={isFavorited ? "gray" : "white"} />
//               </button>

//               <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
//                 ID: {userProfileId}
//               </span>
//             </div>
//           )}
//         </div>

//         <ul className="mt-2 text-gray-700 text-sm space-y-0.5">
//           {age && <li><strong>Age:</strong> {age} Yrs</li>}
//           {religion && <li><strong>Religion:</strong> {religion}</li>}
//           {caste && <li><strong>Caste:</strong> {caste}</li>}
//           {complexion && <li><strong>Complexion:</strong> {complexion}</li>}
//           {heightText && <li><strong>Height:</strong> {heightText}</li>}
//           {currentCity && <li><strong>City:</strong> {currentCity}</li>}
//           {maritalStatus && (
//             <li><strong>Marital Status:</strong> {maritalStatus}</li>
//           )}
//         </ul>

//         <button
//           onClick={() =>
//             navigate(
//               isLoggedIn
//                 ? "/OthersEmptyBiodataPage"
//                 : "/PublicBiodataPage",
//               { state: { profileId: userProfileId } }
//             )
//           }
//           className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BrideCard;












// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useAddToFavoriteMutation } from "../../context/profileApi";
// import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif"; 

// const BrideCard = ({ profile }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
//   const [isFavorited, setIsFavorited] = useState(false);

//   if (!profile) return null;

//   const {
//     userProfileId,
//     firstName,
//     age,
//     religion,
//     caste,
//     height,
//     complexion,
//     currentCity,
//     maritalStatus,
//     profilePhotoBase64,
//     profilePhotoContentType,
//     hasProfilePhoto,
//   } = profile;

//   const fullName = firstName || "Profile";

//   // Height: cm → ft/in
//   const heightInInches = height ? height / 2.54 : 0;
//   const ft = Math.floor(heightInInches / 12);
//   const inches = Math.round(heightInInches % 12);
//   const heightText = height ? `${ft}'${inches}"` : "";

//   // SAFE IMAGE RESOLUTION (NO LOOP, NO RERENDER)
//   const imageSrc = useMemo(() => {
//     if (
//       hasProfilePhoto === true &&
//       profilePhotoBase64 &&
//       profilePhotoContentType
//     ) {
//       return `data:${profilePhotoContentType};base64,${profilePhotoBase64}`;
//     }
//     return defaultProfileImg;
//   }, [hasProfilePhoto, profilePhotoBase64, profilePhotoContentType]);

//   /* FAVORITE HANDLER */
//   const handleFavorite = async () => {
//     if (!isLoggedIn) {
//       navigate("/signin");
//       return;
//     }

//     try {
//       await addToFavorite(userProfileId).unwrap();
//       setIsFavorited(true);
//     } catch (error) {
//       console.error("Add to favorite failed", error);
//       alert(error?.data?.message || "Failed to add to favorites");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-3xl mx-auto">

//       {/* IMAGE (DEPLOYMENT SAFE) */}
//       <div className="relative md:w-1/3 w-full">
//         <img
//           src={imageSrc}
//           alt={fullName}
//           className="w-full h-60 object-cover"
//           loading="lazy"
//           onError={(e) => {
//             // CRITICAL: stop infinite retry
//             e.currentTarget.onerror = null;
//             e.currentTarget.src = defaultProfileImg;
//           }}
//         />
//       </div>

//       {/* DETAILS */}
//       <div className="p-4 px-8 flex-1">
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-800">
//             {fullName}
//           </h3>

//           {isLoggedIn && (
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={handleFavorite}
//                 disabled={isFavorited || isLoading}
//                 title={isFavorited ? "Added to Favorites" : "Add to Favorites"}
//                 className={`p-2 rounded-full shadow-md transition-all
//                   ${
//                     isFavorited
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-red-500 hover:bg-red-600 text-white"
//                   }`}
//               >
//                 <Heart size={18} fill={isFavorited ? "gray" : "white"} />
//               </button>

//               <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
//                 ID: {userProfileId}
//               </span>
//             </div>
//           )}
//         </div>

//         <ul className="mt-2 text-gray-700 text-sm space-y-0.5">
//           {age && <li><strong>Age:</strong> {age} Yrs</li>}
//           {religion && <li><strong>Religion:</strong> {religion}</li>}
//           {caste && <li><strong>Caste:</strong> {caste}</li>}
//           {complexion && <li><strong>Complexion:</strong> {complexion}</li>}
//           {heightText && <li><strong>Height:</strong> {heightText}</li>}
//           {currentCity && <li><strong>City:</strong> {currentCity}</li>}
//           {maritalStatus && (
//             <li><strong>Marital Status:</strong> {maritalStatus}</li>
//           )}
//         </ul>

//         <button
//           onClick={() =>
//             navigate(
//               isLoggedIn
//                 ? "/OthersEmptyBiodataPage"
//                 : "/PublicBiodataPage",
//               { state: { profileId: userProfileId } }
//             )
//           }
//           className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BrideCard;




















import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAddToFavoriteMutation } from "../../context/profileApi";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";

const BrideCard = ({ profile }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
  const [isFavorited, setIsFavorited] = useState(false);

  if (!profile) return null;

  const {
    userProfileId,
    firstName,
    age,
    religion,
    caste,
    height,
    complexion,
    currentCity,
    maritalStatus,
    profilePhotoBase64,
    profilePhotoContentType,
    hasProfilePhoto,
  } = profile;

  const fullName = firstName || "Profile";

  /* HEIGHT: cm → ft/in */
  const heightInInches = height ? height / 2.54 : 0;
  const ft = Math.floor(heightInInches / 12);
  const inches = Math.round(heightInInches % 12);
  const heightText = height ? `${ft}'${inches}"` : "";

  /* ✅ SAFE IMAGE RESOLUTION */
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

  /* FAVORITE HANDLER */
  const handleFavorite = async () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    try {
      await addToFavorite(userProfileId).unwrap();
      setIsFavorited(true);
    } catch (error) {
      console.error("Add to favorite failed", error);
      alert(error?.data?.message || "Failed to add to favorites");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-3xl mx-auto">

      {/* ✅ IMAGE */}
      <div className="relative md:w-1/3 w-full">
        <img
          src={imageSrc}
          alt={fullName}
          className="w-full h-60 object-cover"
          loading="lazy"
          onError={(e) => {
            // 🔒 STOP INFINITE RETRY
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultProfileImg;
          }}
        />
      </div>

      {/* DETAILS */}
      <div className="p-4 px-8 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {fullName}
          </h3>

          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFavorite}
                disabled={isFavorited || isLoading}
                title={isFavorited ? "Added to Favorites" : "Add to Favorites"}
                className={`p-2 rounded-full shadow-md transition-all
                  ${
                    isFavorited
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
              >
                <Heart size={18} fill={isFavorited ? "gray" : "white"} />
              </button>

              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                ID: {userProfileId}
              </span>
            </div>
          )}
        </div>

        <ul className="mt-2 text-gray-700 text-sm space-y-0.5">
          {age && <li><strong>Age:</strong> {age} Yrs</li>}
          {religion && <li><strong>Religion:</strong> {religion}</li>}
          {caste && <li><strong>Caste:</strong> {caste}</li>}
          {complexion && <li><strong>Complexion:</strong> {complexion}</li>}
          {heightText && <li><strong>Height:</strong> {heightText}</li>}
          {currentCity && <li><strong>City:</strong> {currentCity}</li>}
          {maritalStatus && (
            <li><strong>Marital Status:</strong> {maritalStatus}</li>
          )}
        </ul>

        {/* ✅ FIXED NAVIGATION (SAME AS GROOMCARD) */}
        <button
          onClick={() =>
            navigate(
              isLoggedIn
                ? "/OthersEmptyBiodataPage"
                : "/PublicBiodataPage",
              { state: { userProfileId } }   // 🔑 FIX HERE
            )
          }
          className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default BrideCard;
