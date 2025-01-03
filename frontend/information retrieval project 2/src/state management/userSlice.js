import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // email: "example@gmail.com",
  name: "",
  email: "",
  profile: "",
  password: "",
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
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});
export const { setPassword, setProfile, setName, setEmail } = userSlice.actions;

export default userSlice.reducer;
