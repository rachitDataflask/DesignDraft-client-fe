import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./features/app/projectSlice";
import userReducer from "./features/app/userSLice";
import { apiSlice } from "./features/api/api";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  preloadedState: {
    user: userFromStorage || {},
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
