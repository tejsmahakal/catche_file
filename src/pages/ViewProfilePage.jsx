// import React, { useState } from "react";
// import { Menu, X, ArrowLeft, ArrowRight } from "lucide-react";

// import GroomProfileCard from "../components/Brides/GroomProfileCard";
// import BasicDetails from "../components/ProfileCardUser/BasicDetails";
// import ProfileCardUser from "../components/ProfileCardUser/ProfileCardUser";
// import MyAccountSidebar from "../components/MyAccountSidebar/MyAccountSidebar";
// import Intrest from "../components/MyInterest/Interest";
// import { useAuth } from "../context/AuthContext";

// const ViewProfilePage = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { user } = useAuth();

//   // Dynamic heading based on gender
//   const partnerLabel =
//     user?.gender === "MALE"
//       ? "brides"
//       : user?.gender === "FEMALE"
//       ? "grooms"
//       : "matches";

//   const groomList = [
//     { id: 1 }, { id: 2 }, { id: 3 },
//     { id: 4 }, { id: 5 }, { id: 6 },
//   ];

//   return (
//     <div className="flex bg-gray-50 min-h-screen relative">

//       <button
//         className="lg:hidden fixed top-[90px] left-4 z-[100] bg-white p-2 rounded-full shadow-lg"
//         onClick={() => setSidebarOpen(true)}
//       >
//         <Menu size={24} />
//       </button>

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-[80] lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       <div
//         className={`
//           fixed md:static top-[70px] left-0 
//           h-[calc(100vh-70px)] md:h-screen
//           bg-white shadow-xl
//           w-72 md:w-1/3 lg:w-1/4 z-[90]
//           p-6 space-y-6 transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//           overflow-y-auto md:sticky md:top-[70px]
//         `}
//       >
//         <button
//           className="lg:hidden absolute top-4 right-4"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <X size={26} />
//         </button>

//         <ProfileCardUser />
//         <BasicDetails />
//         <MyAccountSidebar />
//       </div>

//       {/* RIGHT SIDE CONTENT */}
//       <div className="flex-1 p-6 space-y-10 overflow-y-auto lg:h-screen pt-[70px] lg:pt-0">
//         <Section title={`Recommended ${partnerLabel} for you`} data={groomList} />
//         <Section title={`Suitable ${partnerLabel} in Pune`} data={groomList} />
//         <Section title="Interested in you" data={groomList} />
//         <Intrest />
//       </div>
//     </div>
//   );
// };

// const Section = ({ title, data }) => {
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsPerPage = 2;

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handleNext = () => {
//     if (startIndex + itemsPerPage < data.length)
//       setStartIndex(startIndex + itemsPerPage);
//   };

//   const handlePrev = () => {
//     if (startIndex - itemsPerPage >= 0)
//       setStartIndex(startIndex - itemsPerPage);
//   };

//   const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="relative mb-10">
//       <div className="overflow-hidden">

//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-[24px] font-semibold text-orange-600">
//             {title}
//           </h2>
//           <a href="/MatchesInPune" className="text-[18px] text-orange-600">
//             View all
//           </a>
//         </div>

//         <div className="border-b border-gray-600 mb-4"></div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {visibleData.map((item) => (
//             <GroomProfileCard key={item.id} />
//           ))}
//         </div>

//         <div className="flex justify-center mt-3 space-x-2">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <span
//               key={i}
//               className={`w-2.5 h-2.5 rounded-full ${
//                 i === startIndex / itemsPerPage ? "bg-orange-500" : "bg-gray-300"
//               }`}
//             ></span>
//           ))}
//         </div>

//         <div className="border-b border-gray-300 mt-6"></div>
//       </div>

//       <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-2">
//         <button
//           onClick={handlePrev}
//           disabled={startIndex === 0}
//           className={`p-1 rounded-full border ${
//             startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
//           }`}
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={startIndex + itemsPerPage >= data.length}
//           className={`p-1 rounded-full border ${
//             startIndex + itemsPerPage >= data.length
//               ? "opacity-40 cursor-not-allowed"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           <ArrowRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewProfilePage;














import React, { useState } from "react";
import { Menu, X, ArrowLeft, ArrowRight } from "lucide-react";

import GroomProfileCard from "../components/Brides/GroomProfileCard";
import BasicDetails from "../components/ProfileCardUser/BasicDetails";
import ProfileCardUser from "../components/ProfileCardUser/ProfileCardUser";
import MyAccountSidebar from "../components/MyAccountSidebar/MyAccountSidebar";
import Intrest from "../components/MyInterest/Interest";
import { useAuth } from "../context/AuthContext";

const ViewProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const partnerLabel =
    user?.gender === "MALE"
      ? "brides"
      : user?.gender === "FEMALE"
      ? "grooms"
      : "matches";

  const groomList = [
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4 }, { id: 5 }, { id: 6 },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen relative">

      {/* MOBILE MENU */}
      <button
        className="md:hidden fixed top-[90px] left-4 z-[100] bg-white p-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[80] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside
        className={`
          fixed md:static top-[70px] left-0
          h-[calc(100vh-70px)] md:h-screen
          bg-white shadow-xl md:shadow-none
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
      </aside>

      {/* RIGHT CONTENT — PAGE SCROLL ONLY */}
      <main className="flex-1 p-6 space-y-10 pt-[70px] lg:pt-0">
        <Section title={`Recommended ${partnerLabel} for you`} data={groomList} />
        <Section title={`Suitable ${partnerLabel} in Pune`} data={groomList} />
        <Section title="Interested in you" data={groomList} />
        <Intrest />
      </main>
    </div>
  );
};

const Section = ({ title, data }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative mb-10">
      <div className="overflow-hidden">

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[22px] sm:text-[24px] font-semibold text-orange-600">
            {title}
          </h2>
          <a href="/MatchesInPune" className="text-sm sm:text-lg text-orange-600">
            View all
          </a>
        </div>

        <div className="border-b border-gray-300 mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleData.map((item) => (
            <GroomProfileCard key={item.id} />
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-2">
        <button
          onClick={() => setStartIndex(Math.max(0, startIndex - itemsPerPage))}
          disabled={startIndex === 0}
          className="p-1 rounded-full border hover:bg-gray-100 disabled:opacity-40"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={() =>
            setStartIndex(
              Math.min(data.length - itemsPerPage, startIndex + itemsPerPage)
            )
          }
          disabled={startIndex + itemsPerPage >= data.length}
          className="p-1 rounded-full border hover:bg-gray-100 disabled:opacity-40"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ViewProfilePage;
