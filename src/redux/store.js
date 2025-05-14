import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./features/app/projectSlice";
import userReducer from "./features/app/userSLice";
import { apiSlice } from "./features/api/api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
