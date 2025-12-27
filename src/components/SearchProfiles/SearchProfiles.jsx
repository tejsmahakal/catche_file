// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import ProfileCard from "../Brides/GroomCard";
// import SkeletonSearchCard from "./SkeletonSearchCard";
// import { useGetProfileByIdQuery } from "../../context/profileApi";

// // KEEP ONLY THIS
// const mapProfileResponseToCard = (apiResponse, userId) => {
//   if (!apiResponse) return null;

//   const payload = apiResponse.data;

//   if (!payload) return null;

//   const p = payload.profileDTO || {};
//   const e = payload.educationDTO || {};
//   const h = payload.horoscopeDTO || {};
//   const c = payload.contactDTO || {};

//   const convertHeight = (value) => {
//     if (value == null) return "";
//     const feet = Math.floor(value);
//     const inches = Math.round((value - feet) * 12);
//     return `${feet}'${inches}"`;
//   };

//   const formatDob = (dob, age) => {
//     if (!dob) return "";
//     const [y, m, d] = dob.split("T")[0].split("-");
//     return `${d}-${m}-${y} (${age} Yrs)`;
//   };

//   return {
//     id: userId,
//      firstName: p.firstName || "",
//   lastName: p.lastName || "",
//     birthDate: formatDob(h.dob, p.age),
//     height: convertHeight(p.height),
//     education: e.education ?? "Not Available",
//     occupation: e.occupation ?? "Not Available",
//     city: c.city ?? "Not Available",
//     caste: p.caste ?? "Not Available",
//     image: "/default-avatar.jpg",
//   };
// };


// const SearchProfiles = () => {
//   const [profileId, setProfileId] = useState("");
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [resultProfile, setResultProfile] = useState(null);

//   const { data, isLoading, isError } = useGetProfileByIdQuery(selectedUserId, {
//     skip: !selectedUserId,
//   });

//   // Search Handler
//   const handleIdSearch = () => {
//     if (!profileId.trim()) {
//       alert("Enter a valid Profile ID");
//       return;
//     }

//     setResultProfile(null);
//     setSelectedUserId(profileId);
//   };

//   // Process Response
//   useEffect(() => {
//     if (data && !isError) {
//       setResultProfile(mapProfileResponseToCard(data, selectedUserId));
//     }

//     if (isError) {
//       setResultProfile(null);
//     }
//   }, [data, isError]);

//   return (
//     <section className="bg-gray-100 min-h-screen py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

//         <h1 className="text-3xl font-extrabold text-center mb-8">
//           Search <span className="text-orange-500">Profile by ID</span>
//         </h1>

//         {/* Search Box */}
//         <div className="space-y-6">
//           <input
//             type="text"
//             placeholder="Enter Profile ID"
//             value={profileId}
//             onChange={(e) => setProfileId(e.target.value)}
//             className="w-full border border-gray-300 rounded-xl p-3"
//           />

//           <button
//             onClick={handleIdSearch}
//             className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
//           >
//             <Search className="inline-block w-5 h-5 mr-2" /> Search Profile
//           </button>
//         </div>

//         {/* Skeleton Loader */}
//         {isLoading && (
//           <div className="mt-8">
//             <SkeletonSearchCard />
//           </div>
//         )}

//         {/* Error */}
//         {isError && (
//           <p className="text-center text-red-500 mt-6">
//             No profile found with this ID.
//           </p>
//         )}

//         {/* Loaded Profile */}
//         {resultProfile && (
//           <div className="mt-8">
//             <ProfileCard profile={resultProfile} />
//           </div>
//         )}

//       </div>
//     </section>
//   );
// };

// export default SearchProfiles;





// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import ProfileCard from "../Brides/BrideCard";
// import SkeletonSearchCard from "./SkeletonSearchCard";
// import { useGetPublicProfileByIdQuery } from "../../context/profileApi";

// const SearchProfiles = () => {
//   const [profileId, setProfileId] = useState("");
//   const [searchedIds, setSearchedIds] = useState([]);
//   const [profiles, setProfiles] = useState([]);

//   const lastSearchedId = searchedIds[searchedIds.length - 1];

//   const { data, isLoading, isError } =
//     useGetPublicProfileByIdQuery(lastSearchedId, {
//       skip: !lastSearchedId,
//     });

//   const handleIdSearch = () => {
//     const trimmedId = profileId.trim();

//     if (!trimmedId) {
//       alert("Enter Profile ID");
//       return;
//     }

//     // prevent duplicate search
//     if (searchedIds.includes(trimmedId)) {
//       setProfileId("");
//       return;
//     }

//     setSearchedIds((prev) => [...prev, trimmedId]);
//     setProfileId("");
//   };

// useEffect(() => {
//   if (data?.data && !isError) {
//     setProfiles([data.data]);
//   }
// }, [data, isError]);


//   return (
//     <section className="bg-gray-100 min-h-screen py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

//         <h1 className="text-3xl font-extrabold text-center mb-8">
//           Search <span className="text-orange-500">Profile by ID</span>
//         </h1>

//         {/* SEARCH */}
//         <div className="space-y-6">
//           <input
//             value={profileId}
//             onChange={(e) => setProfileId(e.target.value)}
//             placeholder="Enter Profile ID"
//             className="w-full border rounded-xl p-3"
//           />

//           <button
//             onClick={handleIdSearch}
//             className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
//           >
//             <Search className="inline-block w-5 h-5 mr-2" />
//             Search Profile
//           </button>
//         </div>

//         {/* LOADER */}
//         {isLoading && <SkeletonSearchCard />}

//         {/* ERROR */}
//         {isError && (
//           <p className="text-center text-red-500 mt-6">
//             Profile not found
//           </p>
//         )}

//         {/* RESULTS (MULTIPLE CARDS) */}
//         <div className="mt-8 space-y-6">
//           {profiles.map((profile) => (
//             <ProfileCard
//               key={profile.userProfileId}
//               profile={profile}
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default SearchProfiles;











import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ProfileCard from "../Brides/BrideCard";
import SkeletonSearchCard from "./SkeletonSearchCard";
import { useGetPublicProfileByIdQuery } from "../../context/profileApi";

const SearchProfiles = () => {
  const [profileId, setProfileId] = useState("");
  const [searchedIds, setSearchedIds] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const lastSearchedId = searchedIds[searchedIds.length - 1];

  const { data, isLoading, isError } =
    useGetPublicProfileByIdQuery(lastSearchedId, {
      skip: !lastSearchedId,
    });

  const handleIdSearch = () => {
    const trimmedId = profileId.trim();

    if (!trimmedId) {
      alert("Enter Profile ID");
      return;
    }

    if (searchedIds.includes(trimmedId)) {
      setProfileId("");
      return;
    }

    setSearchedIds((prev) => [...prev, trimmedId]);
    setProfileId("");
  };

  useEffect(() => {
    if (data?.data && !isError) {
      setProfiles([data.data]);
    }
  }, [data, isError]);

  return (
    <section className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-extrabold text-center mb-8">
          Search <span className="text-orange-500">Profile by ID</span>
        </h1>

        {/* SEARCH */}
        <div className="space-y-6">
          <input
            value={profileId}
            onChange={(e) => setProfileId(e.target.value)}
            placeholder="Enter Profile ID"
            className="w-full border rounded-xl p-3"
          />

          <button
            onClick={handleIdSearch}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
          >
            <Search className="inline-block w-5 h-5 mr-2" />
            Search Profile
          </button>
        </div>

        {isLoading && <SkeletonSearchCard />}

        {isError && (
          <p className="text-center text-red-500 mt-6">
            Profile not found
          </p>
        )}

        <div className="mt-8 space-y-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.userProfileId}
              profile={profile}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SearchProfiles;
