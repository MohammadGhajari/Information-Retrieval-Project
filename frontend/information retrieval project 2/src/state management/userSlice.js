import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // email: "example@gmail.com",
  name: "",
  email: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
  },
});
export const { setName, setEmail } = userSlice.actions;

export default userSlice.reducer;
