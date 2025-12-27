/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Bell, Menu, X, User } from "lucide-react";

import NotificationSidebar from "../../components/NotificationPanel/NotificationPanel";
import LogoutPanel from "../../components/LogoutPanel/LogoutPanel";
import { useAuth } from "../../context/AuthContext";

import {
  useGetOwnProfileQuery,
  useGetSentInterestsQuery,
  useGetReceivedInterestsQuery,
} from "../../context/profileApi";

import { mapNavbarProfile } from "../../context/mapNavbarProfile";

/* ================= NAV ORDER (SINGLE SOURCE) ================= */

const NAV_ITEMS = [
  { name: "Home", path: "/", public: true },
  { name: "Search Profiles", path: "/search-profiles", public: true },

  // Protected (middle)
  { name: "Brides", path: "/brides", protected: true },
  { name: "Grooms", path: "/grooms", protected: true },

  { name: "Success Stories", path: "/success-stories", public: true },
  { name: "Membership Plans", path: "/plans", public: true },
  { name: "Contact Us", path: "/contact", public: true },
];

/* ================= COMPONENT ================= */

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const loggedIn = isLoggedIn || !!localStorage.getItem("token");

  const [openNotify, setOpenNotify] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* API CALLS (SAFE) */
  const { data: ownProfile } = useGetOwnProfileQuery(undefined, {
    skip: !loggedIn,
  });
  const { data: sentData } = useGetSentInterestsQuery(undefined, {
    skip: !loggedIn,
  });
  const { data: receivedData } = useGetReceivedInterestsQuery(undefined, {
    skip: !loggedIn,
  });

  const navbarProfile = useMemo(
    () => mapNavbarProfile(ownProfile, sentData, receivedData),
    [ownProfile, sentData, receivedData]
  );

  const getInitial = () => {
    const name = navbarProfile?.fullName;
    return name ? name.charAt(0).toUpperCase() : <User size={16} />;
  };

  /* ================= RENDER ================= */

  return (
    <>
      <nav className="w-full sticky top-0 z-[200] bg-[#FF8C4426] backdrop-blur-md shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[64px] px-4 md:px-10">

          {/* LOGO */}
          <div className="text-xl font-bold text-[#FF8A41]">
            Matrimony
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              if (item.protected && !loggedIn) return null;

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#FF8A41] font-semibold"
                        : "text-gray-700 hover:text-[#FF8A41]"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-3">
            {loggedIn && (
              <button
                onClick={() => setOpenNotify(true)}
                className="relative p-2 rounded-full hover:bg-white/40"
              >
                <Bell size={20} className="text-[#FF8A41]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {navbarProfile?.receivedCount || 0}
                </span>
              </button>
            )}

            {loggedIn ? (
              <div
                onClick={() => setOpenLogout(true)}
                className="w-9 h-9 bg-[#FF8A41] text-white flex items-center justify-center rounded-full font-semibold cursor-pointer"
              >
                {getInitial()}
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <NavLink
                  to="/signin"
                  className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/40"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X size={24} className="text-[#FF8A41]" />
              ) : (
                <Menu size={24} className="text-[#FF8A41]" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="md:hidden bg-[#FF8C4426] backdrop-blur border-t border-orange-300">
            <ul className="flex flex-col px-4 py-4 text-base font-medium">

              {NAV_ITEMS.map((item) => {
                if (item.protected && !loggedIn) return null;

                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 px-3 rounded hover:bg-white/40"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}

              {/* AUTH ACTIONS */}
              <div className="mt-4 pt-4 border-t border-gray-300">
                {!loggedIn ? (
                  <>
                    <NavLink
                      to="/signin"
                      onClick={() => setMenuOpen(false)}
                      className="block bg-[#FF8A41] text-white py-3 rounded-full text-center mb-3"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="block bg-[#FF8A41] text-white py-3 rounded-full text-center"
                    >
                      Sign Up
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-full"
                  >
                    Logout
                  </button>
                )}
              </div>
            </ul>
          </div>
        )}
      </nav>

      {/* ================= PANELS ================= */}
      <NotificationSidebar
        open={openNotify}
        onClose={() => setOpenNotify(false)}
      />

      <LogoutPanel
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        sentCount={navbarProfile?.sentCount || 0}
        receivedCount={navbarProfile?.receivedCount || 0}
      />
    </>
  );
};

export default Navbar;