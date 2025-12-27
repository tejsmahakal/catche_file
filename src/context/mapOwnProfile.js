
// src/context/mapOwnProfile.js
export const mapOwnProfile = (api) => {
  if (!api?.data) return {};

  const payload = api.data;

  const p  = payload.userProfile || {};
  const h  = payload.horoscopeDetails || {};
  const e  = payload.educationAndProfession || {};
  const f  = payload.familyBackground || {};
  const pp = payload.partnerPreference || {};
  const c  = payload.contactDetails || {};

  return {
    /* PERSONAL*/
    fullName: `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim(),

    age: p.age,
    gender: p.gender,
    maritalStatus: p.maritalStatus,
    religion: p.religion,
    caste: p.caste,
    subCaste: "",
    height: p.height,
    weight: p.weight,
    bloodGroup: p.bloodGroup,
    complexion: p.complexion,
    diet: p.diet,

    spectacle: p.spectacle ? "Yes" : "No",
    lens: p.lens ? "Yes" : "No",
    physicallyChallenged: p.physicallyChallenged ? "Yes" : "No",

    mobile: c.mobileNumber,
    email: c.emailAddress,

    address: c.fullAddress || p.address,
    taluka: p.taluka,
    district: p.district,
    pinCode: c.pinCode || p.pinCode,
    homeTownDistrict: p.homeTownDistrict,
    nativeTaluka: p.nativeTaluka,
    currentCity: c.city || p.currentCity,

    /* ================= HOROSCOPE ================= */
    birthDate: h.dob ? h.dob.split("T")[0] : "",
    birthTime: h.time,
    birthPlace: h.birthPlace,
    rashi: h.rashi,
    nakshatra: h.nakshatra,
    charan: h.charan,
    nadi: h.nadi,
    gan: h.gan,
    mangal: h.mangal,
    gotra: h.gotra,

    /* ================= EDUCATION ================= */
    education: e.education,
    degree: e.degree,
    occupation: e.occupation,
    occupationDetails: e.occupationDetails,
    incomePerYear: e.formattedIncome || e.incomePerYear,

    /* ================= FAMILY ================= */
    fatherName: f.fathersName,
    fatherOccupation: f.fatherOccupation,
    motherName: f.mothersName,
    motherOccupation: f.motherOccupation,
    brothers: f.brother ?? 0,
    marriedBrothers: f.marriedBrothers ?? 0,
    sisters: f.sisters ?? 0,
    marriedSisters: f.marriedSisters ?? 0,
    parentsResidingIn: f.parentResiding,
    relativeSurnames: f.relativeSurnames,
    mamaSurname: f.mamaSurname,
    mamaPlace: f.mamaPlace,
    interCaste: f.interCasteInFamily ? "Yes" : "No",
    familyWealth: f.familyWealth,

    /* ================= PARTNER ================= */
    partnerCities: pp.cityLivingIn,
    partnerEducation: pp.education,
    partnerOccupation: pp.partnerOccupation,
    partnerIncome: pp.formattedIncome,
    partnerAgeDifference: pp.ageRange,
    partnerCaste: pp.caste,
    partnerHeight: pp.heightRange,
    partnerMangal: pp.mangal ? "Yes" : "No",
  };
};
