import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "example@gmail.com",
  // email: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});
export const { setIsLoggedIn, setEmail } = userSlice.actions;

export default userSlice.reducer;
