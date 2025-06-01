import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./features/app/projectSlice";
import userReducer from "./features/app/userSLice";
import { apiSlice } from "./features/api/api";
import floorPlanReducer from "./features/app/FloorPlanSlice";
import areaMarkupReducer from "./features/app/areaMarkupSlice";
import dxfReducer from "./features/app/dxfSlice";
import roomReducer from "./features/app/roomSlice";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    rooms: roomReducer,

    floorPlan: floorPlanReducer,
    areaMarkup: areaMarkupReducer,
    dxf: dxfReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  preloadedState: {
    user: userFromStorage || {},
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
