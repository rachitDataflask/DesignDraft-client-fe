// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   name: "",
//   building_type: "",
//   sub_building_type: "",
//   location: "",
//   level: "",
//   scale: 0,
//   floor: {
//     x: 0,
//     y: 0,
//   },
// };

// const projectSlice = createSlice({
//   name: "project",
//   initialState,
//   reducers: {
//     setScale: (state, action) => {
//       state.scale = action.payload;
//     },
//     setX: (state, action) => {
//       state.floor.x = action.payload;
//     },
//     setY: (state, action) => {
//       state.floor.y = action.payload;
//     },
//     setName: (state, action) => {
//       state.name = action.payload;
//     },
//   },
// });

// export const { setScale, setX, setY, setName } = projectSlice.actions;
// export default projectSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  building_type: "",
  sub_building_type: "",
  location: "",
  level: "",
  scale: 0,
  floor: {
    x: 0,
    y: 0,
  },
  entities: [], // ⬅️ New field
  currentProject: null, // ⬅️ New field (optional, for full project data)
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setScale: (state, action) => {
      state.scale = action.payload;
    },
    setX: (state, action) => {
      state.floor.x = action.payload;
    },
    setY: (state, action) => {
      state.floor.y = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEntities: (state, action) => {
      state.entities = action.payload;
    },
    setProject: (state, action) => {
      const project = action.payload;
      // You can copy individual fields if needed
      state.currentProject = project;
      state.name = project.name || "";
      state.building_type = project.building_type || "";
      state.sub_building_type = project.sub_building_type || "";
      state.location = project.location || "";
      state.level = project.level || "";
      state.scale = project.scale || 0;
      state.floor = project.floor || { x: 0, y: 0 };
      state.entities = project.entities || [];
    },
  },
});

export const { setScale, setX, setY, setName, setEntities, setProject } =
  projectSlice.actions;

export default projectSlice.reducer;
