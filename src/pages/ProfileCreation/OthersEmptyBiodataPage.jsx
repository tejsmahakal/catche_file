// // /* eslint-disable react-hooks/rules-of-hooks */
// // import React, { useMemo } from "react";
// // import { useLocation } from "react-router-dom";
// // import {
// //   useGetFullProfileQuery,
// //   useGetProfilePhotoQuery,
// // } from "../../context/profileApi";
// // import OthersEmptyBiodata, { emptyBiodata } from "./OthersEmptyBiodata";

// // const toImageUrl = (fileData) =>
// //   fileData ? `data:image/jpeg;base64,${fileData}` : "/default-avatar.jpg";

// // export default function OthersEmptyBiodataPage() {
// //   const location = useLocation();
// //   const userId = location.state?.userId;

// //   if (!userId) {
// //     return (
// //       <p style={{ textAlign: "center", marginTop: 50 }}>Invalid User ID</p>
// //     );
// //   }

// //   // Full profile API
// //   const { data, isLoading, isError } = useGetFullProfileQuery(userId);

// //   // Profile photo API
// //   const { data: photoResponse } = useGetProfilePhotoQuery(userId, {
// //     skip: !userId,
// //   });

// //   // Extract base64 fileData correctly
// //   const profilePic = toImageUrl(photoResponse?.data?.fileData);

// //   const mappedData = useMemo(() => {
// //     if (!data?.data)
// //       return {
// //         ...emptyBiodata,
// //         profilePic,
// //       };

// //     const payload = data.data;

// //     const p = payload.profileDTO || {};
// //     const e = payload.educationDTO || {};
// //     const h = payload.horoscopeDTO || {};
// //     const f = payload.familyBackgroundDTO || {};
// //     const pp = payload.partnerPreferenceDTO || {};
// //     const c = payload.contactDTO || {};

// //     return {
// //       userId,
// //       profilePic,

// //       fullName: `${p.firstName || ""} ${p.middleName || ""} ${
// //         p.lastName || ""
// //       }`.trim(),
// //       age: p.age,
// //       gender: p.gender,
// //       maritalStatus: p.maritalStatus,
// //       religion: p.religion,
// //       caste: p.caste,
// //       height: p.height,
// //       weight: p.weight,
// //       bloodGroup: p.bloodGroup,
// //       complexion: p.complexion,
// //       taluka: p.taluka,
// //       diet: p.diet,
// //       spectacle: p.spectacle ? "Yes" : "No",
// //       lens: p.lens ? "Yes" : "No",
// //       physicallyChallenged: p.physicallyChallenged ? "Yes" : "No",

// //       birthDate: h.dob ? h.dob.split("T")[0] : "",
// //       birthTime: h.time,
// //       rashi: h.rashi,
// //       nakshatra: h.nakshatra,
// //       charan: h.charan,
// //       nadi: h.nadi,
// //       gan: h.gan,
// //       mangal: h.mangal,
// //       gotra: h.gotra,
// //       birthPlace: h.birthPlace,

// //       education: e.education,
// //       occupation: e.occupation,
// //       degree: e.degree,
// //       annualIncome: e.incomePerYear,
// //       currentCity: p.currentCity || c.city,

// //       fatherName: f.fathersName,
// //       motherName: f.mothersName,
// //       brothers: f.brothers,
// //       marriedBrothers: f.marriedBrothers,
// //       sisters: f.sisters,
// //       marriedSisters: f.marriedSisters,
// //       parentsResidingIn: f.parentResiding,
// //       parentsOccupation: f.fatherOccupation,
// //       mamaSurname: f.mamaSurname,
// //       mamaPlace: f.mamaPlace,

// //       partnerCities: pp.cityLivingIn,
// //       partnerEducation: pp.partnerEducation,
// //       partnerOccupation: pp.partnerOccupation,
// //       partnerIncome: pp.partnerIncome,
// //       partnerCaste: pp.partnerCaste,
// //       partnerHeight: pp.partnerHeight,
// //       partnerMangal: pp.mangal ? "Yes" : "No",
// //       partnerAge: pp.partnerAge,
// //     };
// //   }, [data, userId, profilePic]);

// //   return (
// //     <div>
// //       {isLoading && (
// //         <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>
// //       )}
// //       {isError && (
// //         <p style={{ textAlign: "center", marginTop: 50, color: "red" }}>
// //           Failed to load profile
// //         </p>
// //       )}

// //       {!isLoading && !isError && <OthersEmptyBiodata data={mappedData} />}
// //     </div>
// //   );
// // }




// /* eslint-disable react-hooks/rules-of-hooks */
// import React, { useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { useGetProfileByProfileIdQuery } from "../../context/profileApi";
// import OthersEmptyBiodata, { emptyBiodata } from "./OthersEmptyBiodata";

// const DEFAULT_AVATAR = "/default-avatar.jpg";

// export default function OthersEmptyBiodataPage() {
//   const location = useLocation();

//   // MUST be profileId (complete profile id)
//   const profileId = location.state?.profileId;

//   if (!profileId) {
//     return (
//       <p style={{ textAlign: "center", marginTop: 50 }}>
//         Invalid Profile ID
//       </p>
//     );
//   }

//   const {
//     data: payload,
//     isLoading,
//     isError,
//   } = useGetProfileByProfileIdQuery(profileId, {
//     skip: !profileId,
//   });

//   const mappedData = useMemo(() => {
//   if (!payload?.data) {
//     return {
//       ...emptyBiodata,
//       profileImage: "/default-avatar.jpg",
//     };
//   }

//   const d = payload.data;
//   const p = d.userProfile || {};
//   const h = d.horoscopeDetails || {};
//   const e = d.educationAndProfession || {};
//   const f = d.familyBackground || {};
//   const pp = d.partnerPreference || {};

//   // BASE64 IMAGE HANDLING
//   const profileImage =
//     d.hasProfilePhoto && d.profilePhotoBase64 && d.profilePhotoContentType
//       ? `data:${d.profilePhotoContentType};base64,${d.profilePhotoBase64}`
//       : "/default-avatar.jpg";

//   return {
//     userId: d.userId,
//     profileImage,

//     /* ================= PERSONAL ================= */
//     fullName:
//       `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`
//         .replace(/\s+/g, " ")
//         .trim() || "Profile Name Not Added",

//     age: p.age || "",
//     gender: p.gender || "",
//     maritalStatus: p.maritalStatus || "",
//     religion: p.religion || "",
//     caste: p.caste || "",
//     height: p.height || "",
//     weight: p.weight || "",
//     bloodGroup: p.bloodGroup || "",
//     complexion: p.complexion || "",
//     diet: p.diet || "",
//     spectacle: p.spectacle ? "Yes" : "No",
//     lens: p.lens ? "Yes" : "No",
//     physicallyChallenged: p.physicallyChallenged ? "Yes" : "No",

//     currentCity: p.currentCity || "",
//     taluka: p.taluka || "",
//     homeTown: p.homeTownDistrict || "",
//     nativeTaluka: p.nativeTaluka || "",

//     /* ================= HOROSCOPE ================= */
//     birthDate: h.dob ? h.dob.split("T")[0] : "",
//     birthTime: h.time || "",
//     birthPlace: h.birthPlace || "",
//     rashi: h.rashi || "",
//     nakshatra: h.nakshatra || "",
//     charan: h.charan || "",
//     nadi: h.nadi || "",
//     gan: h.gan || "",
//     mangal: h.mangal || "",
//     gotra: h.gotra || "",

//     /* ================= EDUCATION ================= */
//     education: e.education || "",
//     degree: e.degree || "",
//     occupation: e.occupation || "",
//     annualIncome: e.formattedIncome || "",

//     /* ================= FAMILY ================= */
//     fatherName: f.fathersName || "",
//     motherName: f.mothersName || "",
//     brothers: f.brother ?? "",
//     marriedBrothers: f.marriedBrothers ?? "",
//     sisters: f.sisters ?? "",
//     marriedSisters: f.marriedSisters ?? "",
//     parentsResidingIn: f.parentResiding || "",
//     parentsOccupation: f.fatherOccupation || "",
//     mamaSurname: f.mamaSurname || "",
//     mamaPlace: f.mamaPlace || "",

//     /* ================= PARTNER ================= */
//     partnerCities: pp.cityLivingIn || "",
//     partnerEducation: pp.education || "",
//     partnerOccupation: pp.partnerOccupation || "",
//     partnerIncome: pp.formattedIncome || "",
//     partnerAge: pp.ageRange || "",
//     partnerCaste: pp.caste || "",
//     partnerHeight: pp.heightRange || "",
//     partnerMangal:
//       pp.mangal === true ? "Yes" : pp.mangal === false ? "No" : "",
//   };
// }, [payload]);



//   if (isLoading) {
//     return (
//       <p style={{ textAlign: "center", marginTop: 50 }}>
//         Loading profile...
//       </p>
//     );
//   }

//   if (isError) {
//     return (
//       <p style={{ textAlign: "center", marginTop: 50, color: "red" }}>
//         Failed to load profile
//       </p>
//     );
//   }

//   return <OthersEmptyBiodata data={mappedData} />;
// }












/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useGetProfileByProfileIdQuery } from "../../context/profileApi";
import OthersEmptyBiodata, { emptyBiodata } from "./OthersEmptyBiodata";

import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";


export default function OthersEmptyBiodataPage() {
  const location = useLocation();
  const userProfileId = location.state?.userProfileId;


  if (!userProfileId) {
    return <p className="text-center mt-10">Invalid Profile ID</p>;
  }

  const { data, isLoading, isError } =
    useGetProfileByProfileIdQuery(userProfileId);

  const mappedData = useMemo(() => {
    if (!data?.data) return emptyBiodata;

    const d = data.data;
    const p = d.userProfile || {};
    const h = d.horoscopeDetails || {};
    const e = d.educationAndProfession || {};
    const f = d.familyBackground || {};
    const pp = d.partnerPreference || {};

    /* ✅ PROFILE IMAGE FROM SAME API */
  const profileImage =
  d.hasProfilePhoto === true &&
  d.profilePhotoBase64 &&
  d.profilePhotoContentType
    ? `data:${d.profilePhotoContentType};base64,${d.profilePhotoBase64}`
    : defaultProfileImg;


    return {
      userId: d.userId,
      profileImage,

      /* PERSONAL */
      fullName: `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`
        .replace(/\s+/g, " ")
        .trim(),
      age: p.age,
      gender: p.gender,
      maritalStatus: p.maritalStatus,
      religion: p.religion,
      caste: p.caste,
      height: p.height,
      weight: p.weight,
      bloodGroup: p.bloodGroup,
      complexion: p.complexion,
      diet: p.diet,
      spectacle: p.spectacle ? "Yes" : "No",
      lens: p.lens ? "Yes" : "No",
      physicallyChallenged: p.physicallyChallenged ? "Yes" : "No",
      currentCity: p.currentCity,
      taluka: p.taluka,
      homeTown: p.homeTownDistrict,
      nativeTaluka: p.nativeTaluka,

      /* HOROSCOPE */
      birthDate: h.dob?.split("T")[0],
      birthTime: h.time,
      birthPlace: h.birthPlace,
      rashi: h.rashi,
      nakshatra: h.nakshatra,
      charan: h.charan,
      nadi: h.nadi,
      gan: h.gan,
      mangal: h.mangal,
      gotra: h.gotra,

      /* EDUCATION */
      education: e.education,
      degree: e.degree,
      occupation: e.occupation,
      annualIncome: e.formattedIncome,

      /* FAMILY */
      fatherName: f.fathersName,
      motherName: f.mothersName,
      brothers: f.brother,
      marriedBrothers: f.marriedBrothers,
      sisters: f.sisters,
      marriedSisters: f.marriedSisters,
      parentsResidingIn: f.parentResiding,
      parentsOccupation: f.fatherOccupation,
      mamaSurname: f.mamaSurname,
      mamaPlace: f.mamaPlace,

      /* PARTNER */
      partnerCities: pp.cityLivingIn,
      partnerEducation: pp.education,
      partnerOccupation: pp.partnerOccupation,
      partnerIncome: pp.formattedIncome,
      partnerAge: pp.ageRange,
      partnerCaste: pp.caste,
      partnerHeight: pp.heightRange,
      partnerMangal:
        pp.mangal === true ? "Yes" : pp.mangal === false ? "No" : "",
    };
  }, [data]);

  if (isLoading) return <p className="text-center mt-10">Loading profile…</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load profile</p>;

  return <OthersEmptyBiodata data={mappedData} />;
}
