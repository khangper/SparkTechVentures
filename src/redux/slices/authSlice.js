import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, 
  userRole: "",
  accountId: "",
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("accountId", action.payload.accountId);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("email", action.payload.email);

      state.isLoggedIn = true;
      state.userRole = action.payload.role;
      state.accountId = action.payload.accountId;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.userRole = "";
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
