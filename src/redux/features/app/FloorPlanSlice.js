// redux/slices/floorPlanSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rect: null, // Persisted rectangle
};

const floorPlanSlice = createSlice({
  name: "floorPlan",
  initialState,
  reducers: {
    setRect(state, action) {
      state.rect = action.payload;
    },
    updateRectPosition(state, action) {
      if (state.rect) {
        state.rect.x = action.payload.x;
        state.rect.y = action.payload.y;
      }
    },
    updateRectTransform(state, action) {
      if (state.rect) {
        state.rect = {
          ...state.rect,
          ...action.payload,
        };
      }
    },
    resetFloorPlan(state) {
      state.rect = null;
    },
  },
});

export const {
  setRect,
  updateRectPosition,
  updateRectTransform,
  resetFloorPlan,
} = floorPlanSlice.actions;

export default floorPlanSlice.reducer;
