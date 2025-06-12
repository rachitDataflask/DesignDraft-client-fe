// import { configureStore } from "@reduxjs/toolkit";
// import projectReducer from "./features/app/projectSlice";
// import userReducer from "./features/app/userSLice";
// import { apiSlice } from "./features/api/api";
// import floorPlanReducer from "./features/app/FloorPlanSlice";
// import areaMarkupReducer from "./features/app/areaMarkupSlice";
// import dxfReducer from "./features/app/dxfSlice";
// import roomReducer from "./features/app/roomSlice";

// const userFromStorage = JSON.parse(localStorage.getItem("user"));

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     project: projectReducer,
//     rooms: roomReducer,

//     floorPlan: floorPlanReducer,
//     areaMarkup: areaMarkupReducer,
//     dxf: dxfReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   preloadedState: {
//     user: userFromStorage || {},
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import projectReducer from "./features/app/projectSlice";
import userReducer from "./features/app/userSLice";
import { apiSlice } from "./features/api/api";
import floorPlanReducer from "./features/app/FloorPlanSlice";
import areaMarkupReducer from "./features/app/areaMarkupSlice";
import dxfReducer from "./features/app/dxfSlice";
import roomReducer from "./features/app/roomSlice";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["rooms"], // this must match the key in combineReducers
};

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  floorPlan: floorPlanReducer,
  areaMarkup: areaMarkupReducer,
  dxf: dxfReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  rooms: roomReducer, // this key must match the whitelist
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {
    user: userFromStorage || {},
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
