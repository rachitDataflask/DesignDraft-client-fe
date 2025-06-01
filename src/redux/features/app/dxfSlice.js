import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  blocks: {},
  layers: {},
  bounds: null, // { x, y, width, height }
};

const dxfSlice = createSlice({
  name: "dxf",
  initialState,
  reducers: {
    setDxfFloorPlan(state, action) {
      const { entities, blocks, layers, bounds } = action.payload;
      state.entities = entities;
      state.blocks = blocks;
      state.layers = layers;
      state.bounds = bounds;
    },
    clearDxfFloorPlan(state) {
      state.entities = [];
      state.blocks = {};
      state.layers = {};
      state.bounds = null;
    },
  },
});

export const { setDxfFloorPlan, clearDxfFloorPlan } = dxfSlice.actions;
export default dxfSlice.reducer;
