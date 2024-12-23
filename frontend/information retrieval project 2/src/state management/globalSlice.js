import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});
export const { setIsLoggedIn } = globalSlice.actions;

export default globalSlice.reducer;
