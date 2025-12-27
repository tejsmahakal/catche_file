
// import React, { useEffect, useState } from "react";
// import ProfileCardUser from "../components/ProfileCardUser/ProfileCardUser";
// import RequestCard from "../components/PendingRequest/RequestCard";
// import BasicDetails from "../components/ProfileCardUser/BasicDetails";
// import MyAccountSidebar from "../components/MyAccountSidebar/MyAccountSidebar";
// import { useGetSentInterestsQuery } from "../context/profileApi";

// const RequestsPage = () => {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [pendingProfiles, setPendingProfiles] = useState([]);

//   /* GET SENT INTERESTS */
//   const { data: sentResponse, isLoading } = useGetSentInterestsQuery();
//   const sentInterests = sentResponse?.data?.content || [];

//   /* FETCH PUBLIC PROFILES */
//   useEffect(() => {
//   const fetchProfiles = async () => {
//     const cards = [];

//     for (const interest of sentInterests) {
//       const profileId = interest.toUserCompleteProfileId;
//       if (!profileId) continue;

//       try {
//         const res = await fetch(
//           `https://mttlprv1-production.up.railway.app/api/v1/profiles/${profileId}/public`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         const json = await res.json();

//         if (json?.data) {
//           cards.push({
//             id: interest.interestId,
//             profileId,
//             status: "Pending",

//             // BASIC INFO
//             name: json.data.firstName,
//             age: json.data.age,
//             gender: json.data.gender,
//             religion: json.data.religion,
//             caste: json.data.caste,
//             height: json.data.height,
//             city: json.data.currentCity,
//             maritalStatus: json.data.maritalStatus,

//             // IMAGE FIELDS (IMPORTANT)
//             hasProfilePhoto: json.data.hasProfilePhoto,
//             profilePhotoBase64: json.data.profilePhotoBase64,
//             profilePhotoContentType: json.data.profilePhotoContentType,
//           });
//         }
//       } catch (err) {
//         console.error("Failed to fetch profile", err);
//       }
//     }

//     setPendingProfiles(cards);
//   };

//   if (sentInterests.length > 0) {
//     fetchProfiles();
//   } else {
//     setPendingProfiles([]);
//   }
// }, [sentInterests]);


//   return (
//     /* FULL HEIGHT LAYOUT */
//     <div className="flex h-screen bg-gray-50 overflow-hidden">

//       {/* ================= LEFT PANEL ================= */}
//       <aside className="w-1/4 min-w-[280px] bg-gray-50 border-r overflow-y-auto">
//         <div className="p-6 space-y-6">
//           <ProfileCardUser />
//           <BasicDetails />
//           <MyAccountSidebar />
//         </div>
//       </aside>

//       {/* ================= RIGHT PANEL ================= */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-6 space-y-6">

//           {/* TABS */}
//           <div className="flex gap-4">
//             <button
//               onClick={() => setActiveTab("pending")}
//               className={`px-4 py-2 rounded-full border transition
//                 ${
//                   activeTab === "pending"
//                     ? "bg-orange-500 text-white"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//             >
//               Pending Request
//             </button>

//             <button className="px-4 py-2 rounded-full border bg-gray-100">
//               Rejected
//             </button>

//             <button className="px-4 py-2 rounded-full border bg-gray-100">
//               Favourite
//             </button>
//           </div>

//           {/* PENDING REQUESTS */}
//           {activeTab === "pending" && (
//             <>
//               {isLoading && (
//                 <p className="text-center text-gray-500">
//                   Loading pending requests...
//                 </p>
//               )}

//               {!isLoading && pendingProfiles.length === 0 && (
//                 <p className="text-center text-gray-600">
//                   No pending requests found.
//                 </p>
//               )}

//               {pendingProfiles.map((item) => (
//                 <RequestCard key={item.id} item={item} />
//               ))}
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RequestsPage;







import React, { useEffect, useState, useMemo } from "react";
import { Menu, X } from "lucide-react";

import ProfileCardUser from "../components/ProfileCardUser/ProfileCardUser";
import RequestCard from "../components/PendingRequest/RequestCard";
import BasicDetails from "../components/ProfileCardUser/BasicDetails";
import MyAccountSidebar from "../components/MyAccountSidebar/MyAccountSidebar";
import { useGetSentInterestsQuery } from "../context/profileApi";

const RequestsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingProfiles, setPendingProfiles] = useState([]);

  const { data: sentResponse, isLoading } = useGetSentInterestsQuery();
  const sentInterests = useMemo(
    () => sentResponse?.data?.content || [],
    [sentResponse]
  );

  useEffect(() => {
    if (sentInterests.length === 0) {
      setPendingProfiles([]);
      return;
    }

    let cancelled = false;

    const fetchProfiles = async () => {
      try {
        const requests = sentInterests
          .filter((i) => i.toUserCompleteProfileId)
          .map((interest) =>
            fetch(
              `https://mttlprv1-production.up.railway.app/api/v1/profiles/${interest.toUserCompleteProfileId}/public`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
              .then((res) => res.json())
              .then((json) => ({
                id: interest.interestId,
                profileId: interest.toUserCompleteProfileId,
                status: "Pending",
                name: json?.data?.firstName,
                age: json?.data?.age,
                gender: json?.data?.gender,
                religion: json?.data?.religion,
                caste: json?.data?.caste,
                height: json?.data?.height,
                city: json?.data?.currentCity,
                maritalStatus: json?.data?.maritalStatus,
                hasProfilePhoto: json?.data?.hasProfilePhoto,
                profilePhotoBase64: json?.data?.profilePhotoBase64,
                profilePhotoContentType:
                  json?.data?.profilePhotoContentType,
              }))
          );

        const results = await Promise.all(requests);
        if (!cancelled) setPendingProfiles(results);
      } catch {
        if (!cancelled) setPendingProfiles([]);
      }
    };

    fetchProfiles();
    return () => (cancelled = true);
  }, [sentInterests]);

  return (
    <div className="flex bg-gray-50 min-h-screen relative">

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-[90px] left-4 z-[100] bg-white p-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[80] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <div
        className={`
          fixed md:static top-[70px] left-0
          h-[calc(100vh-70px)] md:h-screen
          bg-white shadow-xl
          w-72 md:w-1/3 lg:w-1/4 z-[90]
          p-6 space-y-6 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-y-auto md:sticky md:top-[70px]
        `}
      >
        {/* CLOSE — MOBILE ONLY */}
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={26} />
        </button>

        <ProfileCardUser />
        <BasicDetails />
        <MyAccountSidebar />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto lg:h-screen pt-[70px] lg:pt-0">

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-full border transition ${
              activeTab === "pending"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Pending Request
          </button>

          <button className="px-4 py-2 rounded-full border bg-gray-100">
            Rejected
          </button>

          <button className="px-4 py-2 rounded-full border bg-gray-100">
            Favourite
          </button>
        </div>

        {activeTab === "pending" && (
          <>
            {isLoading && (
              <p className="text-center text-gray-500">
                Loading pending requests...
              </p>
            )}

            {!isLoading && pendingProfiles.length === 0 && (
              <p className="text-center text-gray-600">
                No pending requests found.
              </p>
            )}

            <div className="space-y-6">
              {pendingProfiles.map((item) => (
                <RequestCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
