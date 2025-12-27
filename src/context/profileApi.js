// src/context/profileApi.js
import { apiSlice } from "./api";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    /*  PROFILE*/

    // getProfileById: builder.query({
    //   query: (userId) => `/api/v1/users/profile/${userId}`,
    //   providesTags: ["Profile"],
    // }),

    //Search Profile
    getPublicProfileById: builder.query({
  query: (profileId) => `/api/v1/profiles/${profileId}/public`,
  providesTags: ["PublicProfile"],
}),


    getProfileByProfileId: builder.query({
  query: (profileId) => `/api/v1/complete-profile/public/profile/${profileId}`,
  providesTags: ["Profile"],
}),

    getOwnProfile: builder.query({
      query: () => `/api/v1/complete-profile/me`,
      providesTags: ["OwnProfile"],
    }),

    /* PROFILE PHOTO (FIXED) */

  getProfilePhoto: builder.query({
      query: () => `/api/v1/documents/type/PROFILE_PHOTO`,
      providesTags: ["ProfilePhoto"],
    }),


    /*  BRIDES / GROOMS  */

    // getBrides: builder.query({
    //   query: ({ page = 0, size = 10 } = {}) =>
    //     `/api/v1/users/getAllUsers?page=${page}&size=${size}&gender=FEMALE`,
    //   providesTags: ["Brides"],
    // }),

    // getGrooms: builder.query({
    //   query: ({ page = 0, size = 10 } = {}) =>
    //     `/api/v1/users/getAllUsers?page=${page}&size=${size}&gender=MALE`,
    //   providesTags: ["Grooms"],
    // }),


    browseProfilesByGender: builder.query({
  query: ({ gender, page = 0, size = 20 }) =>
    `/api/v1/profiles/browse/gender/${gender}?page=${page}&size=${size}`,
  providesTags: ["BrowseProfiles"],
}),


    /* INTERESTS */
sendInterest: builder.mutation({
  query: ({ toUserId, message }) => ({
    url: "/api/v1/interests",
    method: "POST",
    body: {
      toUserId,
      message: message || "Hi! I found your profile interesting.",
      sourcePlatform: "WEB",
      autoMatched: false,
    },
  }),
  invalidatesTags: ["SentInterests", "ReceivedInterests"],
}),




    getSentInterests: builder.query({
      query: () => `/api/v1/interests/sent`,
      providesTags: ["SentInterests"],
    }),

    getReceivedInterests: builder.query({
      query: () => `/api/v1/interests/received`,
      providesTags: ["ReceivedInterests"],
    }),




    /* FAVORITES */
addToFavorite: builder.mutation({
  query: (profileId) => ({
    url: "/api/favorite/add",
    method: "POST",
    body: {
      profileId, 
    },
  }),
}),




  }),
});

export const {
  // useGetProfileByIdQuery,
  useGetPublicProfileByIdQuery,
  
  useGetProfileByProfileIdQuery,
  // useGetFullProfileQuery,
  useGetOwnProfileQuery,
  useGetProfilePhotoQuery,
  // useGetBridesQuery,
  // useGetGroomsQuery,

  useBrowseProfilesByGenderQuery,
  useSendInterestMutation,
  useGetSentInterestsQuery,
  useGetReceivedInterestsQuery,

  useAddToFavoriteMutation,
} = profileApi;
