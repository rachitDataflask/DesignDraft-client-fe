import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: [],
  reducers: {
    // 1st reducer: Save full room details when room is created
    addRoom: (state, action) => {
      const { id, area, x, y, width, height } = action.payload;
      state.push({
        id,
        area,
        x,
        y,
        width,
        height,
        name: "", // initialize with empty name
      });
    },

    // 2nd reducer: Update the room name by matching room id
    updateRoomName: (state, action) => {
      const { id, name } = action.payload;
      const room = state.find((r) => r.id === id);
      if (room) {
        room.name = name;
      }
    },

    // ✅ New: Update room position
    updateRoomPosition: (state, action) => {
      const { id, x, y } = action.payload;
      const room = state.find((r) => r.id === id);
      if (room) {
        room.x = x;
        room.y = y;
      }
    },

    // 4th reducer: Reset all rooms
    resetRooms: () => {
      return [];
    },
  },
});

export const { addRoom, updateRoomName, updateRoomPosition, resetRooms } =
  roomsSlice.actions;

export default roomsSlice.reducer;
