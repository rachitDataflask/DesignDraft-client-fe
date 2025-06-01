import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: [],
  reducers: {
    // 1st reducer: Save room id and area when room is created
    addRoom: (state, action) => {
      const { id, area } = action.payload;
      state.push({ id, area, name: "" }); // initialize with empty name
    },

    // 2nd reducer: Update the room name by matching room id
    updateRoomName: (state, action) => {
      const { id, name } = action.payload;
      const room = state.find((r) => r.id === id);
      if (room) {
        room.name = name;
      }
    },

    // 3rd reducer: Reset all rooms
    resetRooms: () => {
      return [];
    },
  },
});

export const { addRoom, updateRoomName, resetRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
