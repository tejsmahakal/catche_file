// /* eslint-disable react-hooks/rules-of-hooks */
// import React, { useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   useGetFullProfileQuery,
//   useGetProfilePhotoQuery,
// } from "../../context/profileApi";
// import PublicBiodata, { publicEmptyBiodata } from "./PublicBiodata";

// const toImageUrl = (fileData) =>
//   fileData ? `data:image/jpeg;base64,${fileData}` : "/default-avatar.jpg";

// export default function PublicBiodataPage() {
//   const location = useLocation();
//   const userId = location.state?.userId;

//   if (!userId) {
//     return <p className="text-center mt-10">Invalid User ID</p>;
//   }

//   // SAME AS AFTER LOGIN
//   const { data, isLoading, isError } = useGetFullProfileQuery(userId);

//   const { data: photoResponse, isLoading: loadingPhoto } =
//     useGetProfilePhotoQuery(userId, {
//       skip: !userId,
//     });

//   //SAME IMAGE LOGIC AS OthersEmptyBiodataPage
//   const profileImage = toImageUrl(photoResponse?.data?.fileData);

//   const mappedData = useMemo(() => {
//     if (!data?.data) {
//       return {
//         ...publicEmptyBiodata,
//         image: profileImage,
//       };
//     }

//     const payload = data.data;
//     const p = payload.profileDTO || {};
//     const e = payload.educationDTO || {};
//     const h = payload.horoscopeDTO || {};
//     const f = payload.familyBackgroundDTO || {};
//     const pp = payload.partnerPreferenceDTO || {};
//     const c = payload.contactDTO || {};

//     return {
//       lastName: p.lastName || "",
//       age: p.age,
//       gender: p.gender,
//       maritalStatus: p.maritalStatus,
//       religion: p.religion,
//       caste: p.caste,
//       subCaste: p.subCaste,
//       height: p.height,
//       weight: p.weight,
//       bloodGroup: p.bloodGroup,
//       complexion: p.complexion,
//       diet: p.diet,
//       spectacle: p.spectacle ? "Yes" : "No",
//       lens: p.lens ? "Yes" : "No",
//       physicallyChallenged: p.physicallyChallenged ? "Yes" : "No",

//       birthDate: h.dob ? h.dob.split("T")[0] : "",
//       birthTime: h.time,
//       rashi: h.rashi,
//       nakshatra: h.nakshatra,
//       nadi: h.nadi,
//       mangal: h.mangal,
//       birthPlace: h.birthPlace,
//       charan: h.charan,
//       gan: h.gan,
//       gotra: h.gotra,

//       education: e.education,
//       occupation: e.occupation,
//       annualIncome: e.incomePerYear,
//       degree: e.degree,
//       currentCity: p.currentCity || c.city || p.taluka,

//       fatherName: f.fathersName,
//       motherName: f.mothersName,
//       brothers: f.brothers,
//       marriedBrothers: f.marriedBrothers,
//       sisters: f.sisters,
//       marriedSisters: f.marriedSisters,
//       parentsResidingIn: f.parentResiding,
//       parentsOccupation: f.fatherOccupation,
//       mamaSurname: f.mamaSurname,
//       mamaPlace: f.mamaPlace,
//       relativeSurnames: f.relativeSurnames,

//       partnerCities: pp.cityLivingIn,
//       partnerEducation: pp.partnerEducation,
//       partnerOccupation: pp.partnerOccupation,
//       partnerIncome: pp.partnerIncome,
//       partnerCaste: pp.partnerCaste,
//       partnerHeight: pp.partnerHeight,
//       partnerMangal: pp.mangal ? "Yes" : "No",
//       partnerAgeDifference: "",
//       image: profileImage,
//     };
//   }, [data, profileImage]);

//   if (isLoading || loadingPhoto) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   if (isError) {
//     return (
//       <p className="text-center mt-10 text-red-500">
//         Failed to load profile
//       </p>
//     );
//   }

//   return <PublicBiodata data={mappedData} />;
// }



/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetProfileByProfileIdQuery,
  useGetProfilePhotoQuery,
} from "../../context/profileApi";
import PublicBiodata, { publicEmptyBiodata } from "./PublicBiodata";

const toImageUrl = (fileData) =>
  fileData ? `data:image/jpeg;base64,${fileData}` : "/default-avatar.jpg";

export default function PublicBiodataPage() {
  const location = useLocation();
  const profileId = location.state?.userId; // ← profileId, not userId

  if (!profileId) {
    return <p className="text-center mt-10">Invalid Profile ID</p>;
  }

  /* CORRECT API */
  const { data, isLoading, isError } =
    useGetProfileByProfileIdQuery(profileId);

  /* PROFILE PHOTO */
  const { data: photoResponse } = useGetProfilePhotoQuery();

  const profileImage = toImageUrl(photoResponse?.data?.fileData);

  /* MAP API → UI */
  const mappedData = useMemo(() => {
    if (!data) {
      return {
        ...publicEmptyBiodata,
        image: profileImage,
      };
    }

    const p = data || {};

    return {
      lastName: p.lastName || "",
      age: p.age,
      gender: p.gender,
      maritalStatus: p.maritalStatus,
      religion: p.religion,
      caste: p.caste,
      height: p.height,
      complexion: p.complexion,
      currentCity: p.currentCity,
      image: profileImage,
    };
  }, [data, profileImage]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load profile
      </p>
    );
  }

  return <PublicBiodata data={mappedData} />;
}
