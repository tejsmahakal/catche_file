// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import { City, Country, State } from "country-state-city";

// const SearchFilters = () => {
//   const [districts, setDistricts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Country-State-City states
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const getFallbackDistricts = () => {
//     return ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"];
//   };

//   // Map country/state/city data to react-select option shape
//   const mapCountryToOption = (country) => ({ label: country.name, value: country.isoCode });
//   const mapStateToOption = (state) => ({ label: state.name, value: state.isoCode });
//   const mapCityToOption = (city) => ({ label: city.name, value: city.name });

//   useEffect(() => {
//     setDistricts(getFallbackDistricts());
//     setCountries(Country.getAllCountries() || []);
//   }, []);

//   const handleCountryChange = (countryOption) => {
//     setSelectedCountry(countryOption || null);
//     setSelectedState(null);
//     setSelectedCity(null);
//     setCities([]);
//     if (countryOption?.value) {
//       const statesData = State.getStatesOfCountry(countryOption.value) || [];
//       setStates(statesData);
//     } else {
//       setStates([]);
//     }
//   };

//   const handleStateChange = (stateOption) => {
//     setSelectedState(stateOption || null);
//     setSelectedCity(null);
//     setCities([]);
//     if (stateOption?.value && selectedCountry?.value) {
//       // City.getCitiesOfState expects (countryCode, stateCode)
//       const citiesData = City.getCitiesOfState(selectedCountry.value, stateOption.value) || [];
//       setCities(citiesData);
//     } else {
//       setCities([]);
//     }
//   };

//   const handleCityChange = (cityOption) => {
//     setSelectedCity(cityOption || null);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const payload = {
//       gender: (document.querySelector('input[name="gender"]:checked') || {}).value || "male",
//       maritalStatus: event.target.maritalStatus?.value || "",
//       ageFrom: event.target.ageFrom?.value || "",
//       ageTo: event.target.ageTo?.value || "",
//       heightFrom: event.target.heightFrom?.value || "",
//       heightTo: event.target.heightTo?.value || "",
//       occupation: event.target.occupation?.value || "",
//       education: event.target.education?.value || "",
//       country: selectedCountry?.label || "",
//       state: selectedState?.label || "",
//       city: selectedCity?.label || "",
//       district: event.target.district?.value || "",
//     };
//     console.log("Search filters submitted:", payload);
//   };

//   const indianOccupations = [
//     "Software Engineer",
//     "Doctor",
//     "Teacher",
//     "CA (Chartered Accountant)",
//     "Engineer",
//     "Architect",
//     "Business Owner",
//     "Government Employee",
//     "Banking Professional",
//     "IT Professional",
//     "Marketing Professional",
//     "Sales Executive",
//     "HR Manager",
//     "Finance Manager",
//     "Operations Manager",
//     "Project Manager",
//     "Data Scientist",
//     "Web Developer",
//     "Mobile App Developer",
//     "Network Engineer",
//     "System Administrator",
//     "Database Administrator",
//     "Cyber Security Analyst",
//     "Cloud Engineer",
//     "AI/ML Engineer",
//     "Civil Engineer",
//     "Mechanical Engineer",
//     "Electrical Engineer",
//     "Electronics Engineer",
//     "Chemical Engineer",
//     "Automobile Engineer",
//     "Aerospace Engineer",
//     "Marine Engineer",
//     "Petroleum Engineer",
//     "Metallurgical Engineer",
//     "Mining Engineer",
//     "Textile Engineer",
//     "Agricultural Engineer",
//     "Biomedical Engineer",
//     "Environmental Engineer",
//     "Structural Engineer",
//     "Production Engineer",
//     "Quality Engineer",
//     "Maintenance Engineer",
//     "Design Engineer",
//     "Research Scientist",
//     "Physician",
//     "Surgeon",
//     "Dentist",
//     "Pharmacist",
//     "Nurse",
//     "Physiotherapist",
//     "Medical Researcher",
//     "Ayurvedic Doctor",
//     "Homeopathic Doctor",
//     "Veterinary Doctor",
//     "Medical Lab Technologist",
//     "Radiologist",
//     "Pathologist",
//     "Psychologist",
//     "Psychiatrist",
//     "Professor",
//     "Lecturer",
//     "Principal",
//     "Vice Principal",
//     "Education Counselor",
//     "School Teacher",
//     "College Professor",
//     "Research Scholar",
//     "IAS Officer",
//     "IPS Officer",
//     "IRS Officer",
//     "Bank PO",
//     "Bank Manager",
//     "Financial Analyst",
//     "Investment Banker",
//     "Stock Broker",
//     "Insurance Agent",
//     "Real Estate Agent",
//     "Legal Advisor",
//     "Lawyer",
//     "Judge",
//     "Advocate",
//     "Company Secretary",
//     "Business Analyst",
//     "Management Consultant",
//     "Entrepreneur",
//     "Startup Founder",
//     "Fashion Designer",
//     "Interior Designer",
//     "Graphic Designer",
//     "UI/UX Designer",
//     "Journalist",
//     "Content Writer",
//     "Editor",
//     "Photographer",
//     "Videographer",
//     "Film Director",
//     "Actor",
//     "Musician",
//     "Singer",
//     "Dancer",
//     "Painter",
//     "Sculptor",
//     "Chef",
//     "Hotel Manager",
//     "Travel Agent",
//     "Pilot",
//     "Air Hostess",
//     "Merchant Navy",
//     "Army Officer",
//     "Navy Officer",
//     "Air Force Officer",
//     "Police Officer",
//     "Defense Personnel",
//     "Farmer",
//     "Agricultural Scientist",
//     "Horticulturist",
//     "Florist",
//     "Jeweler",
//     "Textile Designer",
//     "Handicraft Artist",
//     "Social Worker",
//     "NGO Worker",
//     "Religious Leader",
//     "Priest",
//     "Astrologer",
//     "Yoga Instructor",
//     "Fitness Trainer",
//     "Nutritionist",
//     "Dietician",
//     "Medical Representative",
//     "Sales Manager",
//     "Business Development Manager",
//     "Digital Marketing Manager",
//     "SEO Specialist",
//     "Content Marketing Manager",
//     "Public Relations Officer",
//     "Event Manager",
//     "Wedding Planner",
//     "Logistics Manager",
//     "Supply Chain Manager",
//     "Procurement Manager",
//     "Import-Export Manager",
//     "Customs Officer",
//     "Transport Manager",
//     "Shipping Manager",
//     "Warehouse Manager",
//     "Retail Manager",
//     "Store Manager",
//     "Beautician",
//     "Hair Stylist",
//     "Makeup Artist",
//     "Spa Manager",
//     "Wellness Coach",
//     "Life Coach",
//     "Career Counselor",
//     "Student",
//     "Unemployed",
//     "Homemaker",
//     "Retired",
//   ];

//   const educationLevels = [
//     "Not Specific",
//     "High School (10th Pass)",
//     "Intermediate (12th Pass)",
//     "Diploma",
//     "Bachelor's Degree",
//     "Master's Degree",
//     "Doctorate (PhD)",
//     "Post Doctorate",
//     "MBA",
//     "MCA",
//     "MBBS",
//     "B.Tech/B.E.",
//     "M.Tech/M.E.",
//     "B.Sc.",
//     "M.Sc.",
//     "B.Com",
//     "M.Com",
//     "B.A.",
//     "M.A.",
//     "LLB",
//     "LLM",
//     "CA",
//     "CS",
//     "ICWA",
//     "B.Pharma",
//     "M.Pharma",
//     "B.Arch",
//     "M.Arch",
//     "B.Des",
//     "M.Des",
//   ];

//   const maritalStatuses = [
//     "Select",
//     "Never Married",
//     "Divorced",
//     "Widowed",
//     "Awaiting Divorce",
//     "Separated",
//   ];

//   const ageOptions = Array.from({ length: 43 }, (_, index) => 18 + index); // 18 to 60

//   const heightOptions = [];
//   for (let feet = 4; feet <= 7; feet += 1) {
//     for (let inches = 0; inches < 12; inches += 1) {
//       heightOptions.push(`${feet}'${inches}"`);
//     }
//   }

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       border: "1px solid #d1d5db",
//       borderRadius: "0.375rem",
//       padding: "2px 4px",
//       boxShadow: "none",
//       "&:hover": { borderColor: "#d1d5db" },
//       "&:focus-within": {
//         borderColor: "#f97316",
//         ring: "2px",
//         ringColor: "rgba(249,115,22,0.2)",
//       },
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isSelected
//         ? "#f97316"
//         : state.isFocused
//         ? "#fed7aa"
//         : "white",
//       color: state.isSelected ? "white" : "#374151",
//       "&:hover": { backgroundColor: "#fed7aa" },
//     }),
//   };

//   return (
//     <div>

//       <form className="space-y-5" onSubmit={handleSubmit}>
//         {/* Gender */}
//         <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
//           <label className="font-medium">Gender :</label>
//           <div className="flex items-center gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="male"
//                 className="accent-orange-500 w-4 h-4"
//                 defaultChecked
//               />
//               Male
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 className="accent-orange-500 w-4 h-4"
//               />
//               Female
//             </label>
//           </div>
//         </div>

//         {/* Marital Status */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 text-sm sm:text-base">
//           <label className="font-medium w-40">Marital Status :</label>
//           <select
//             name="maritalStatus"
//             className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//           >
//             {maritalStatuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>

//        {/* Age */}
// <div className="flex flex-col sm:flex-row items-center gap-3 text-sm sm:text-base">
//   <label className="font-medium w-50">Age :</label>

//   <div className="flex gap-3 w-full">
//     <select
//       name="ageFrom"
//       className="w-1/2 sm:w-40 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//     >
//       <option>From</option>
//       {ageOptions.map((age) => (
//         <option key={`age-from-${age}`} value={age}>
//           {age}
//         </option>
//       ))}
//     </select>

//     <select
//       name="ageTo"
//       className="w-1/2 sm:w-40 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//     >
//       <option>To</option>
//       {ageOptions.map((age) => (
//         <option key={`age-to-${age}`} value={age}>
//           {age}
//         </option>
//       ))}
//     </select>
//   </div>
// </div>

// {/* Height */}
// <div className="flex flex-col sm:flex-row items-center gap-3 text-sm sm:text-base">
//   <label className="font-medium w-50">Height :</label>

//   <div className="flex gap-3 w-full">
//     <select
//       name="heightFrom"
//       className="w-1/2 sm:w-40 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//     >
//       <option>From</option>
//       {heightOptions.map((height) => (
//         <option key={`height-from-${height}`} value={height}>
//           {height}
//         </option>
//       ))}
//     </select>

//     <select
//       name="heightTo"
//       className="w-1/2 sm:w-40 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//     >
//       <option>To</option>
//       {heightOptions.map((height) => (
//         <option key={`height-to-${height}`} value={height}>
//           {height}
//         </option>
//       ))}
//     </select>
//   </div>
// </div>


//         {/* Occupation Type */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 text-sm sm:text-base">
//           <label className="font-medium w-40">Occupation Type :</label>
//           <select
//             name="occupation"
//             className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//           >
//             <option value="">Select</option>
//             {indianOccupations.map((occupation) => (
//               <option key={occupation} value={occupation}>
//                 {occupation}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Education */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 text-sm sm:text-base">
//           <label className="font-medium w-40">Education :</label>
//           <select
//             name="education"
//             className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//           >
//             {educationLevels.map((education) => (
//               <option key={education} value={education}>
//                 {education}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Country */}
//         <div className="flex flex-col sm:flex-row items-start gap-3 text-sm sm:text-base">
//           <label className="font-medium w-40 mt-2">Country :</label>
//           <div className="flex-1">
//             <Select
//               options={countries.map(mapCountryToOption)}
//               value={selectedCountry}
//               onChange={handleCountryChange}
//               placeholder="Select Country"
//               styles={customStyles}
//               isSearchable
//               isClearable
//             />
//           </div>
//         </div>

//         {/* State */}
//         <div className="flex flex-col sm:flex-row items-start gap-3 text-sm sm:text-base">
//           <label className="font-medium w-40 mt-2">State :</label>
//           <div className="flex-1">
//             <Select
//               options={states.map(mapStateToOption)}
//               value={selectedState}
//               onChange={handleStateChange}
//               placeholder="Select State"
//               styles={customStyles}
//               isDisabled={!selectedCountry}
//               isSearchable
//               isClearable
//             />
//           </div>
//         </div>

//         {/* City */}
//         <div className="flex flex-col sm:flex-row items-start gap-3 text-sm sm:text-base">
//           <label className="font-medium w-40 mt-2">City :</label>
//           <div className="flex-1">
//             <Select
//               options={cities.map(mapCityToOption)}
//               value={selectedCity}
//               onChange={handleCityChange}
//               placeholder="Select City"
//               styles={customStyles}
//               isDisabled={!selectedState}
//               isSearchable
//               isClearable
//             />
//           </div>
//         </div>

//         {/* District */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 text-sm sm:text-base">
//           <label className="font-medium w-40">District :</label>
//           <select
//             name="district"
//             className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-400 outline-none"
//           >
//             <option value="">Select District</option>
//             {districts.map((district) => (
//               <option key={district} value={district}>
//                 {district}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Search Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="bg-orange-500 text-white font-semibold rounded-md px-10 py-3 hover:bg-orange-600 transition w-full sm:w-auto"
//             disabled={loading}
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchFilters;




import React, { useEffect, useState } from "react";
import Select from "react-select";
import { City, Country, State } from "country-state-city";

const SearchFilters = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const getFallbackDistricts = () => {
    return ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"];
  };

  const mapCountryToOption = (country) => ({
    label: country.name,
    value: country.isoCode,
  });

  const mapStateToOption = (state) => ({
    label: state.name,
    value: state.isoCode,
  });

  const mapCityToOption = (city) => ({
    label: city.name,
    value: city.name,
  });

  useEffect(() => {
    setDistricts(getFallbackDistricts());
    setCountries(Country.getAllCountries() || []);
  }, []);

  const handleCountryChange = (option) => {
    setSelectedCountry(option);
    setSelectedState(null);
    setSelectedCity(null);
    setCities([]);

    if (option) {
      const statesData = State.getStatesOfCountry(option.value) || [];
      setStates(statesData);
    } else {
      setStates([]);
    }
  };

  const handleStateChange = (option) => {
    setSelectedState(option);
    setSelectedCity(null);
    setCities([]);

    if (option && selectedCountry) {
      const citiesData =
        City.getCitiesOfState(selectedCountry.value, option.value) || [];
      setCities(citiesData);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (option) => {
    setSelectedCity(option);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      gender:
        document.querySelector('input[name="gender"]:checked')?.value ?? "male",
      maritalStatus: event.target.maritalStatus?.value ?? "",
      ageFrom: event.target.ageFrom?.value ?? "",
      ageTo: event.target.ageTo?.value ?? "",
      heightFrom: event.target.heightFrom?.value ?? "",
      heightTo: event.target.heightTo?.value ?? "",
      occupation: event.target.occupation?.value ?? "",
      education: event.target.education?.value ?? "",
      country: selectedCountry?.label ?? "",
      state: selectedState?.label ?? "",
      city: selectedCity?.label ?? "",
      district: event.target.district?.value ?? "",
    };

    console.log("Search filters submitted:", payload);
  };

  const indianOccupations = [
    "Software Engineer",
    "Doctor",
    "Teacher",
    "CA (Chartered Accountant)",
    "Engineer",
    "Architect",
    "Business Owner",
    "Government Employee",
    "Banking Professional",
    "IT Professional",
    "Marketing Professional",
    "Sales Executive",
    "HR Manager",
    "Finance Manager",
    "Operations Manager",
    "Project Manager",
    "Data Scientist",
    "Web Developer",
    "Mobile App Developer",
    "Network Engineer",
    "System Administrator",
    "Database Administrator",
    "Cyber Security Analyst",
    "Cloud Engineer",
    "AI/ML Engineer",
    "Civil Engineer",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Electronics Engineer",
    "Chemical Engineer",
    "Automobile Engineer",
    "Aerospace Engineer",
    "Marine Engineer",
    "Petroleum Engineer",
    "Metallurgical Engineer",
    "Mining Engineer",
    "Textile Engineer",
    "Agricultural Engineer",
    "Biomedical Engineer",
    "Environmental Engineer",
    "Structural Engineer",
    "Production Engineer",
    "Quality Engineer",
    "Maintenance Engineer",
    "Design Engineer",
    "Research Scientist",
    "Physician",
    "Surgeon",
    "Dentist",
    "Pharmacist",
    "Nurse",
    "Physiotherapist",
    "Medical Researcher",
    "Ayurvedic Doctor",
    "Homeopathic Doctor",
    "Veterinary Doctor",
    "Medical Lab Technologist",
    "Radiologist",
    "Pathologist",
    "Psychologist",
    "Psychiatrist",
    "Professor",
    "Lecturer",
    "Principal",
    "Vice Principal",
    "Education Counselor",
    "School Teacher",
    "College Professor",
    "Research Scholar",
    "IAS Officer",
    "IPS Officer",
    "IRS Officer",
    "Bank PO",
    "Bank Manager",
    "Financial Analyst",
    "Investment Banker",
    "Stock Broker",
    "Insurance Agent",
    "Real Estate Agent",
    "Legal Advisor",
    "Lawyer",
    "Judge",
    "Advocate",
    "Company Secretary",
    "Business Analyst",
    "Management Consultant",
    "Entrepreneur",
    "Startup Founder",
    "Fashion Designer",
    "Interior Designer",
    "Graphic Designer",
    "UI/UX Designer",
    "Journalist",
    "Content Writer",
    "Editor",
    "Photographer",
    "Videographer",
    "Film Director",
    "Actor",
    "Musician",
    "Singer",
    "Dancer",
    "Painter",
    "Sculptor",
    "Chef",
    "Hotel Manager",
    "Travel Agent",
    "Pilot",
    "Air Hostess",
    "Merchant Navy",
    "Army Officer",
    "Navy Officer",
    "Air Force Officer",
    "Police Officer",
    "Defense Personnel",
    "Farmer",
    "Agricultural Scientist",
    "Horticulturist",
    "Florist",
    "Jeweler",
    "Textile Designer",
    "Handicraft Artist",
    "Social Worker",
    "NGO Worker",
    "Religious Leader",
    "Priest",
    "Astrologer",
    "Yoga Instructor",
    "Fitness Trainer",
    "Nutritionist",
    "Dietician",
    "Medical Representative",
    "Sales Manager",
    "Business Development Manager",
    "Digital Marketing Manager",
    "SEO Specialist",
    "Content Marketing Manager",
    "Public Relations Officer",
    "Event Manager",
    "Wedding Planner",
    "Logistics Manager",
    "Supply Chain Manager",
    "Procurement Manager",
    "Import-Export Manager",
    "Customs Officer",
    "Transport Manager",
    "Shipping Manager",
    "Warehouse Manager",
    "Retail Manager",
    "Store Manager",
    "Beautician",
    "Hair Stylist",
    "Makeup Artist",
    "Spa Manager",
    "Wellness Coach",
    "Life Coach",
    "Career Counselor",
    "Student",
    "Unemployed",
    "Homemaker",
    "Retired",
  ];

  const educationLevels = [
        "Not Specific",
    "High School (10th Pass)",
    "Intermediate (12th Pass)",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate (PhD)",
    "Post Doctorate",
    "MBA",
    "MCA",
    "MBBS",
    "B.Tech/B.E.",
    "M.Tech/M.E.",
    "B.Sc.",
    "M.Sc.",
    "B.Com",
    "M.Com",
    "B.A.",
    "M.A.",
    "LLB",
    "LLM",
    "CA",
    "CS",
    "ICWA",
    "B.Pharma",
    "M.Pharma",
    "B.Arch",
    "M.Arch",
    "B.Des",
    "M.Des",
  ];

  const maritalStatuses = [
    "Select",
    "Never Married",
    "Divorced",
    "Widowed",
    "Awaiting Divorce",
    "Separated",
  ];

  const ageOptions = Array.from({ length: 43 }, (_, i) => 18 + i);

  const heightOptions = [];
  for (let f = 4; f <= 7; f++) {
    for (let i = 0; i < 12; i++) {
      heightOptions.push(`${f}'${i}"`);
    }
  }

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "2px",
      fontSize: "14px",
      width: "100%",
      boxShadow: "none",
      "&:hover": { borderColor: "#d1d5db" },
    }),
  };

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Gender */}
        <div className="flex flex-col gap-2 text-sm">
          <label className="font-medium">Gender :</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="male" defaultChecked />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="female" />
              Female
            </label>
          </div>
        </div>

        {/* Marital Status */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">Marital Status :</label>
          <select className="flex-1 border rounded-md py-2 px-3" name="maritalStatus">
            {maritalStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Age */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">Age :</label>
          <div className="flex gap-3 flex-1">
            <select className="w-1/2 border rounded-md py-2 px-3" name="ageFrom">
              <option>From</option>
              {ageOptions.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <select className="w-1/2 border rounded-md py-2 px-3" name="ageTo">
              <option>To</option>
              {ageOptions.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Height */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">Height :</label>
          <div className="flex gap-3 flex-1">
            <select className="w-1/2 border rounded-md py-2 px-3" name="heightFrom">
              <option>From</option>
              {heightOptions.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <select className="w-1/2 border rounded-md py-2 px-3" name="heightTo">
              <option>To</option>
              {heightOptions.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Occupation */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">Occupation :</label>
          <select className="flex-1 border rounded-md py-2 px-3" name="occupation">
            <option>Select</option>
            {indianOccupations.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Education */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">Education :</label>
          <select className="flex-1 border rounded-md py-2 px-3" name="education">
            {educationLevels.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">Country :</label>
          <div className="flex-1">
            <Select
              options={countries.map(mapCountryToOption)}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="Select Country"
              styles={customStyles}
            />
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">State :</label>
          <div className="flex-1">
            <Select
              options={states.map(mapStateToOption)}
              value={selectedState}
              onChange={handleStateChange}
              isDisabled={!selectedCountry}
              placeholder="Select State"
              styles={customStyles}
            />
          </div>
        </div>

        {/* City */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">City :</label>
          <div className="flex-1">
            <Select
              options={cities.map(mapCityToOption)}
              value={selectedCity}
              onChange={handleCityChange}
              isDisabled={!selectedState}
              placeholder="Select City"
              styles={customStyles}
            />
          </div>
        </div>

        {/* District */}
        <div className="flex flex-col sm:flex-row items-start gap-3 text-sm">
          <label className="font-medium sm:w-40">District :</label>
          <select className="flex-1 border rounded-md py-2 px-3" name="district">
            <option>Select District</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white rounded-md px-10 py-3 w-full sm:w-auto font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
