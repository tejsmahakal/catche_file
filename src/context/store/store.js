// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../context/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // Remove auth reducer if authSlice doesn't exist
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});