// api/auth.js
import { api } from "./api";
 
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    // loginUser: builder.mutation({
    //   query: ({ email, password }) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: {
    //       username: email, // backend expects username
    //       password,
    //     },
    //   }),
    // }),
 
    signupUser: builder.mutation({
      query: ({ email, password, mobileNumber }) => ({
        url: "/users/register",
        method: "POST",
        body: { email, password, mobileNumber },
      }),
    }),
 
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

     getCurrentUser: builder.query({
      query: () => "/auth/me",
    }),
    
  }),
});
 
export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useLogoutUserMutation,
} = authApi;