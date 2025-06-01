import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"));

// const initialState = savedUser || {
//   email: "",
//   token: "",
// };
const initialState = savedUser || {
  identifier: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.email = action.payload.email;
      state.identifier = action.payload.identifier;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: () => {
      localStorage.removeItem("user");
      // return { email: "", token: "" };
      return { identifier: "", token: "" };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
