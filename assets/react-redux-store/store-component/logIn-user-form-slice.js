import { createSlice } from "@reduxjs/toolkit";

const LogInUserSlice = createSlice({
  name: "userLogIn",
  initialState: {
    loading: false,
    error: null,
    show: false,
    showPasswordLogin: false,
    
  },
  reducers: {
    setShowPasswordLogin(state, action) {
      state.showPasswordLogin = action.payload;
    },
  },
});

export const { setShowPasswordLogin } = LogInUserSlice.actions;

export default LogInUserSlice.reducer;