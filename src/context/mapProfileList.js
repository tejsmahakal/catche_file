// export const mapProfileList = (content = []) => {
//   return content.map((item, index) => {
    
//     // Convert height → 5.1 → 5'01"
//     const convertHeight = (value) => {
//       if (!value) return "";
//       const feet = Math.floor(value);
//       const inches = Math.round((value - feet) * 10);
//       return `${feet}'${inches}"`;
//     };

//     // Convert ISO date → dd-mm-yyyy (age Yrs)
//     const convertDob = (dob) => {
//       if (!dob) return "";
//       const date = new Date(dob);

//       const day = String(date.getDate()).padStart(2, "0");
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const year = date.getFullYear();

//       const currentYear = new Date().getFullYear();
//       const age = currentYear - year;

//       return `${day}-${month}-${year} (${age} Yrs)`;
//     };

//     return {
//       id: index + 1, // backend does NOT send id, so generate one
//       name: item.firstName || "Unknown",
//       birthDate: convertDob(item.dateOfBirth),
//       height: convertHeight(item.height),
//       education: item.education || "Not Available",
//       occupation: item.occupation || "Not Available",
//       city: item.city || "Not Available",
//       caste: item.caste || "Not Available",
//       image:
//         item.profilePhoto && item.profilePhoto.length > 0
//           ? item.profilePhoto[0]
//           : "/default-avatar.jpg",
//     };
//   });
// };



// FINAL & SAFE mapper (handles old + new backend)
const mapProfileResponseToCard = (apiResponse, userId) => {
  if (!apiResponse) return null;

  // IMPORTANT: unwrap correctly
  const payload = apiResponse.data ?? apiResponse;

  const p = payload.profileDTO || {};
  const e = payload.educationDTO || {};
  const h = payload.horoscopeDTO || {};
  const c = payload.contactDTO || {};

  const convertHeight = (value) => {
    if (value === null || value === undefined) return "";
    const feet = Math.floor(value);
    const inches = Math.round((value - feet) * 12);
    return `${feet}'${inches}"`;
  };

  const formatBirthDate = (dob, age) => {
    if (!dob) return "";
    const [y, m, d] = dob.split("T")[0].split("-");
    return `${d}-${m}-${y} (${age ?? ""} Yrs)`;
  };

  return {
    id: userId, // search ID is correct

    name:
      `${p.firstName || ""} ${p.lastName || ""}`.trim() || "Unknown",

    birthDate: formatBirthDate(h.dob, p.age),

    height: convertHeight(p.height),

    education: e.education ?? "Not Available",

    occupation: e.occupation ?? "Not Available",

    city: c.city ?? p.currentCity ?? "Not Available",

    caste: p.caste ?? "Not Available",

    image: "/default-avatar.jpg",
  };
};
