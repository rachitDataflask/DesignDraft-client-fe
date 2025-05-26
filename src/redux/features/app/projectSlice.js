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
  },
});

export const { setScale, setX, setY, setName } = projectSlice.actions;
export default projectSlice.reducer;
