

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mttlprv1-production.up.railway.app",

    prepareHeaders: (headers, { getState }) => {
      // Try Redux auth state first
      const tokenFromState = getState()?.auth?.token;

      // Fallback to localStorage
      const token = tokenFromState || localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: [
    "Profile",
    "OwnProfile",
    "ProfilePhoto",
    "BrowseProfiles",
    "SentInterests",
    "ReceivedInterests",
  ],

  endpoints: () => ({}),
});
