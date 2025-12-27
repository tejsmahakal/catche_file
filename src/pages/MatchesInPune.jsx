import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import ProfileCardUser from "../components/ProfileCardUser/ProfileCardUser";
import BasicDetails from "../components/ProfileCardUser/BasicDetails";
import MyAccountSidebar from "../components/MyAccountSidebar/MyAccountSidebar";
import ProfileCard from "../components/Brides/GroomCard";

import img1 from "../assets/MatchesInPune/MatchInPunepic1.avif";
import img2 from "../assets/MatchesInPune/MatchInPunepic2.avif";
import img3 from "../assets/MatchesInPune/MatchInPunepic3.avif";
import img4 from "../assets/MatchesInPune/MatchInPunepic4.jpg";

const MatchesInPune = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profiles = [
    {
      id: "GR250661",
      name: "Kedar",
      image: img1,
      birthDate: "21-04-2002 (24 Yrs)",
      height: "5ft 9in",
      education: "BCA",
      occupation: "ENGINEER",
      city: "PUNE",
      caste: "Maratha MAHARASHTRA",
    },
    {
      id: "GR250662",
      name: "Sahare",
      image: img2,
      birthDate: "21-04-2002 (24 Yrs)",
      height: "5ft 9in",
      education: "BCA",
      occupation: "ENGINEER",
      city: "PUNE",
      caste: "Maratha MAHARASHTRA",
    },
    {
      id: "GR250663",
      name: "Shah",
      image: img3,
      birthDate: "21-04-2002 (24 Yrs)",
      height: "5ft 9in",
      education: "BCA",
      occupation: "ENGINEER",
      city: "PUNE",
      caste: "Maratha MAHARASHTRA",
    },
    {
      id: "GR250664",
      name: "Shekhar",
      image: img4,
      birthDate: "21-04-2002 (24 Yrs)",
      height: "5ft 9in",
      education: "BCA",
      occupation: "ENGINEER",
      city: "PUNE",
      caste: "Maratha MAHARASHTRA",
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen relative">

      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-[90px] left-4 z-[100] bg-white p-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[80] md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* LEFT SIDEBAR (visible from md and above, slide-in on mobile) */}
      <div
        className={`
          fixed md:static
          top-[70px] left-0
          h-[calc(100vh-70px)] md:h-screen
          bg-white shadow-xl
          w-72 md:w-1/3 lg:w-1/4
          z-[90] p-6 space-y-6
          transform transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}

          overflow-y-auto
          md:sticky md:top-[70px]
        `}
      >
        {/* MOBILE CLOSE BUTTON */}
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
      <div className="flex-1 p-6 overflow-y-auto lg:h-screen pt-[70px] md:pt-[70px] lg:pt-0">
        <h2
          className="text-3xl font-semibold text-orange-600 mb-6"
          style={{ fontFamily: "Garamond, serif" }}
        >
          Suitable Match in Pune
        </h2>

        <div className="flex flex-col gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesInPune;
