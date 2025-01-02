import userReducer from "./userSlice.js";
import darkModeReducer from "./darkModeSlice.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
