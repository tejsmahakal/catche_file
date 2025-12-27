// export const mapNavbarProfile = (api) => {
//   if (!api) return {};

//   // Try different possible structures
//   const p = api.profileDTO || api.userProfile || {};
//   const e = api.educationDTO || api.educationAndProfession || {};

//   return {
//     fullName: `${p.firstName || p.first_name || ""} ${p.lastName || p.last_name || ""}`.trim(),
//     education: e.education || e.degree || "Education not added",
//     profilePicUrl: p.profileImage || p.imageUrl || "",
//   };
// };




// // src/context/mapNavbarProfile.js

// export const mapNavbarProfile = (api) => {
//   if (!api || !api.data) return {
//     fullName: "Your Name",
//     education: "Education not added",
//     profilePicUrl: "",
//   };

//   const profileDTO = api.data.profileDTO || {};
//   const educationDTO = api.data.educationDTO || {};

//   return {
//     fullName: `${profileDTO.firstName || ""} ${profileDTO.lastName || ""}`.trim(),
//     education: educationDTO.education || educationDTO.degree || "Education not added",
//     profilePicUrl: profileDTO.profileImage || "",
//   };
// };





// // src/context/mapNavbarProfile.js

// export const mapNavbarProfile = (
//   ownProfileApi,
//   sentInterestApi,
//   receivedInterestApi
// ) => {
//   /* ---------------- SAFETY ---------------- */
//   if (!ownProfileApi || !ownProfileApi.data) {
//     return {
//       fullName: "Your Name",
//       education: "Education not added",
//       profilePicUrl: "",
//       sentCount: 0,
//       receivedCount: 0,
//     };
//   }

//   /* ---------------- PROFILE ---------------- */
//   const profile = ownProfileApi.data.userProfile || {};
//   const education = ownProfileApi.data.educationAndProfession || {};

//   /* ---------------- COUNTS ---------------- */
//   // CORRECT FIELD = numberOfElements
//   const sentCount =
//     sentInterestApi?.data?.numberOfElements ?? 0;

//   const receivedCount =
//     receivedInterestApi?.data?.numberOfElements ?? 0;

//   return {
//     fullName: `${profile.firstName || ""} ${profile.lastName || ""}`
//       .replace(/\s+/g, " ")
//       .trim(),
//     education:
//       education.education ||
//       education.degree ||
//       "Education not added",
//     profilePicUrl: profile.profileImage || "",

//     // COUNTS
//     sentCount,
//     receivedCount,
//   };
// };






// src/context/mapNavbarProfile.js

export const mapNavbarProfile = (
  ownProfileApi,
  sentInterestApi,
  receivedInterestApi
) => {
  if (!ownProfileApi?.data) {
    return {
      fullName: "Your Name",
      education: "Education not added",
      profilePicUrl: "",
      sentCount: 0,
      receivedCount: 0,
    };
  }

  const profile = ownProfileApi.data.userProfile || {};
  const education = ownProfileApi.data.educationAndProfession || {};

  // EXACT FIELD AS PER YOUR API
  const sentCount =
    sentInterestApi?.data?.numberOfElements ?? 0;

  const receivedCount =
    receivedInterestApi?.data?.numberOfElements ?? 0;

  return {
    fullName: `${profile.firstName || ""} ${profile.middleName || ""} ${profile.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim(),

    education:
      education.education ||
      education.degree ||
      "Education not added",

    profilePicUrl: profile.profileImage || "",

    sentCount,
    receivedCount,
  };
};
