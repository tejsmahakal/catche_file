// import React, { useEffect, useState } from "react";
// import { Info } from "lucide-react";
// import {
//   useGetOwnProfileQuery,
//   useGetSentInterestsQuery,
//   useGetReceivedInterestsQuery,
//   useGetProfilePhotoQuery,
// } from "../../context/profileApi";

// // Convert API base64 → usable image URL
// const toImageUrl = (resp) =>
//   resp?.data?.fileData
//     ? `data:image/jpeg;base64,${resp.data.fileData}`
//     : "/default-avatar.jpg";

// // MAPPING FUNCTION FOR PROFILE CARD USER
// const mapProfileCardUser = (api) => {
//   if (!api || !api.data) {
//     return {
//       fullName: "Your Name",
//       education: "Education not added",
//       location: "Location not added",
//     };
//   }

//   const p = api.data.profileDTO || {};
//   const e = api.data.educationDTO || {};
//   const c = api.data.contactDTO || {};

//   const fullName =
//     `${p.firstName || ""} ${p.lastName || ""}`.trim() || "Your Name";

//   return {
//     fullName,
//     education: e.education || e.degree || "Education not added",
//     location: c.city || p.currentCity || "Location not added",
//   };
// };

// // MAPPING FUNCTION FOR INTEREST COUNTS
// const mapInterestCounts = (sentData, receivedData) => {
//   let approvedRequests = 0;
//   let pendingRequests = 0;

//   const processArray = (arr) => {
//     arr.forEach((item) => {
//       const st = item.status?.toUpperCase();
//       if (st === "ACCEPTED") approvedRequests++;
//       else if (st === "PENDING" || st === "SENT" || st === "RECEIVED")
//         pendingRequests++;
//     });
//   };

//   if (sentData?.data?.data) processArray(sentData.data.data);
//   if (receivedData?.data?.data) processArray(receivedData.data.data);

//   return { approvedRequests, pendingRequests };
// };

// const ProfileCardUser = () => {
//   const { data: apiResponse, isLoading: profileLoading } =
//     useGetOwnProfileQuery();
//   const { data: sentInterests, isLoading: sentLoading } =
//     useGetSentInterestsQuery();
//   const { data: receivedInterests, isLoading: receivedLoading } =
//     useGetReceivedInterestsQuery();

//   // UPDATED: Use the same approach as LogoutPanel - no parameters needed
//   const { data: photoResponse, isLoading: loadingPhoto } =
//     useGetProfilePhotoQuery();

//   const [profileData, setProfileData] = useState({});
//   const [interestCounts, setInterestCounts] = useState({
//     approvedRequests: 0,
//     pendingRequests: 0,
//   });

//   const isLoading = profileLoading || sentLoading || receivedLoading || loadingPhoto;

//   useEffect(() => {
//     if (apiResponse) {
//       setProfileData(mapProfileCardUser(apiResponse));
//     }
//   }, [apiResponse]);

//   useEffect(() => {
//     const counts = mapInterestCounts(sentInterests, receivedInterests);
//     setInterestCounts(counts);
//   }, [sentInterests, receivedInterests]);

//   // FINAL merged Profile Image - using the same helper function
//   const profileImage = toImageUrl(photoResponse);

//   if (isLoading) {
//     return (
//       <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
//         <div className="animate-pulse">
//           <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full"></div>
//           <div className="h-4 bg-gray-300 rounded mt-4 mx-auto w-3/4"></div>
//           <div className="h-3 bg-gray-300 rounded mt-2 mx-auto w-1/2"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
//       {/* PROFILE PHOTO */}
//       <div className="relative w-24 h-24 mx-auto">
//         <div className="w-full h-full rounded-full border-4 border-green-400 overflow-hidden bg-gray-100">
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-full h-full object-cover"
//             onError={(e) => (e.target.src = "/default-avatar.jpg")}
//           />
//         </div>

//         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
//           10%
//         </div>
//       </div>

//       {/* NAME */}
//       <h2 className="text-lg font-semibold text-center mt-3">
//         {profileData.fullName}
//       </h2>

//       <p className="text-red-600 text-sm text-center underline">
//         {profileData.education}
//       </p>

//       <p className="text-gray-700 text-sm text-center mt-1">
//         Location: {profileData.location}
//       </p>

//       <p className="text-gray-400 text-xs text-center">Last updated 9m ago</p>

//       <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-full transition-all">
//         Complete Profile
//       </button>

//       <div className="border-b my-4"></div>

//       {/* PERFORMANCE */}
//       <div className="border border-orange-300 rounded-xl p-3">
//         <div className="flex items-center justify-center gap-1 mb-2">
//           <p className="font-medium text-gray-700 text-sm">
//             Profile Performance
//           </p>
//           <Info size={14} className="text-gray-500" />
//         </div>

//         <div className="flex justify-around text-center">
//           <div>
//             <p className="text-gray-600 text-xs">Approved Request</p>
//             <p className="font-semibold text-lg">
//               {interestCounts.approvedRequests}
//             </p>
//           </div>

//           <div className="border-l border-gray-300 h-6"></div>

//           <div>
//             <p className="text-gray-600 text-xs">Pending Request</p>
//             <p className="font-semibold text-lg">
//               {interestCounts.pendingRequests}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCardUser;








import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import {
  useGetOwnProfileQuery,
  useGetSentInterestsQuery,
  useGetReceivedInterestsQuery,
  useGetProfilePhotoQuery,
} from "../../context/profileApi";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";


const toImageUrl = (resp) =>
  resp?.data?.fileData
    ? `data:image/jpeg;base64,${resp.data.fileData}`
    : defaultProfileImg;


const mapProfileCardUser = (api) => {
  const data = api?.data;
  if (!data) {
    return {
      fullName: "Your Name",
      education: "Education not added",
      location: "Location not added",
      completionPercentage: 0,
    };
  }

  const p = data.userProfile || {};
  const e = data.educationAndProfession || {};
  const c = data.contactDetails || {};

  const fullName =
    `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim() || "Your Name";

  return {
    fullName,
    education:
      e.education ||
      e.degree ||
      "Education not added",
    location:
      c.city ||
      p.currentCity ||
      "Location not added",
    completionPercentage: data.completionPercentage ?? 0,
  };
};

const mapInterestCounts = (sentData, receivedData) => {
  let approvedRequests = 0;
  let pendingRequests = 0;

  const processArray = (arr = []) => {
    arr.forEach((item) => {
      const st = item.status?.toUpperCase();
      if (st === "ACCEPTED") approvedRequests++;
      else if (st === "PENDING" || st === "SENT" || st === "RECEIVED")
        pendingRequests++;
    });
  };

  processArray(sentData?.data?.data);
  processArray(receivedData?.data?.data);

  return { approvedRequests, pendingRequests };
};

const ProfileCardUser = () => {
  const { data: profileResponse, isLoading: profileLoading } =
    useGetOwnProfileQuery();

  const { data: sentInterests, isLoading: sentLoading } =
    useGetSentInterestsQuery();

  const { data: receivedInterests, isLoading: receivedLoading } =
    useGetReceivedInterestsQuery();

  const { data: photoResponse, isLoading: loadingPhoto } =
    useGetProfilePhotoQuery();

  const [profileData, setProfileData] = useState({
    fullName: "",
    education: "",
    location: "",
    completionPercentage: 0,
  });

  const [interestCounts, setInterestCounts] = useState({
    approvedRequests: 0,
    pendingRequests: 0,
  });

  const isLoading =
    profileLoading || sentLoading || receivedLoading || loadingPhoto;

  /* MAP PROFILE DATA */
  useEffect(() => {
    if (profileResponse) {
      setProfileData(mapProfileCardUser(profileResponse));
    }
  }, [profileResponse]);

  /* MAP INTEREST COUNTS */
  useEffect(() => {
    setInterestCounts(
      mapInterestCounts(sentInterests, receivedInterests)
    );
  }, [sentInterests, receivedInterests]);

  const profileImage = toImageUrl(photoResponse);

  if (isLoading) {
    return (
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded mt-4 mx-auto w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded mt-2 mx-auto w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* PROFILE PHOTO */}
      <div className="relative w-24 h-24 mx-auto">
        <div className="w-full h-full rounded-full border-4 border-green-400 overflow-hidden bg-gray-100">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultProfileImg;
            }}
          />

        </div>

        {/* COMPLETION BADGE */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {profileData.completionPercentage}%
        </div>
      </div>

      {/* NAME */}
      <h2 className="text-lg font-semibold text-center mt-3">
        {profileData.fullName}
      </h2>

      {/* EDUCATION */}
      <p className="text-red-600 text-sm text-center underline">
        {profileData.education}
      </p>

      {/* LOCATION */}
      <p className="text-gray-700 text-sm text-center mt-1">
        Location: {profileData.location}
      </p>

      <p className="text-gray-400 text-xs text-center">
        Profile Completion: {profileData.completionPercentage}%
      </p>

      <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-full transition-all">
        Complete Profile
      </button>

      <div className="border-b my-4"></div>

      {/* PERFORMANCE */}
      <div className="border border-orange-300 rounded-xl p-3">
        <div className="flex items-center justify-center gap-1 mb-2">
          <p className="font-medium text-gray-700 text-sm">
            Profile Performance
          </p>
          <Info size={14} className="text-gray-500" />
        </div>

        <div className="flex justify-around text-center">
          <div>
            <p className="text-gray-600 text-xs">Approved Request</p>
            <p className="font-semibold text-lg">
              {interestCounts.approvedRequests}
            </p>
          </div>

          <div className="border-l border-gray-300 h-6"></div>

          <div>
            <p className="text-gray-600 text-xs">Pending Request</p>
            <p className="font-semibold text-lg">
              {interestCounts.pendingRequests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardUser;
