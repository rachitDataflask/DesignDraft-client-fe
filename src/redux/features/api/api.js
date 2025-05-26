import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { data } from "react-router-dom";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   tagTypes: ["User"],
//   endpoints: (builder) => ({
// signup: builder.mutation({
//   query: (newUser) => ({
//     url: "auth/signup",
//     method: "POST",
//     body: newUser,
//   }),
//   invalidatesTags: ["User"],
// }),

// login: builder.mutation({
//   query: (User) => ({
//     url: `auth/login`,
//     method: "POST",
//     body: User,
//   }),
//   invalidatesTags: ["User"],
// }),

//     addProject: builder.mutation({
//       query: (data) => ({
//         url: `api/project`,
//         method: "POST",
//         body: data.body,
//       }),
//       invalidatesTags: ["Project"],
//     }),
//   }),
// });

// src/features/api/apiSlice.js or wherever you define your API

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (newUser) => ({
        url: "auth/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (User) => ({
        url: `auth/login`,
        method: "POST",
        body: User,
      }),
      invalidatesTags: ["User"],
    }),

    addProject: builder.mutation({
      query: (projectData) => ({
        url: "api/project",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Project"],
    }),

    getProjectList: builder.query({
      query: (id) => ({
        url: "api/project",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `api/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useAddProjectMutation,
  useGetProjectListQuery,
  useDeleteProjectMutation,
} = apiSlice;
