import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { data } from "react-router-dom";

export const adminDataApiSlice = createApi({
  reducerPath: "api2",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api2",
  }),
  endpoints: (builder) => ({
    getLocationList: builder.query({
      query: () => ({
        url: "api/admin/locations",
        method: "GET",
      }),
      providesTags: ["Location"],
    }),
  }),
});

export const { useGetLocationListQuery } = adminDataApiSlice;
