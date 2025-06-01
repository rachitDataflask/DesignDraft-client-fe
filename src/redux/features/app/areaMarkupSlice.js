// redux/slices/areaMarkupSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  floor: null, // This is the outer rectangle from FloorPlanEditor
  areas: [], // Rectangles drawn inside floor (in AreaMarkup)
};

const areaMarkupSlice = createSlice({
  name: "areaMarkup",
  initialState,
  reducers: {
    setFloor(state, action) {
      state.floor = action.payload;
    },
    addArea(state, action) {
      state.areas.push(action.payload);
    },
    updateArea(state, action) {
      const { index, newData } = action.payload;
      state.areas[index] = { ...state.areas[index], ...newData };
    },
    resetAreas(state) {
      state.areas = [];
    },
  },
});

export const { setFloor, addArea, updateArea, resetAreas } =
  areaMarkupSlice.actions;

export default areaMarkupSlice.reducer;
