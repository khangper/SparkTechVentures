import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  accountId: "",
  role: "",
  username: "",
  fullName: "",
  gender: null,
  email: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  picture: "",
  storeId: null,
  storeName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const {
        token,
        accountId,
        role,
        username,
        fullName,
        gender,
        email,
        phone,
        address,
        dateOfBirth,
        picture,
        storeId,
        storeName,
      } = action.payload;

      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("accountId", action.payload.accountId);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("email", action.payload.email);

      state.isLoggedIn = true;
      state.token = token;
      state.accountId = accountId;
      state.role = role;
      state.username = username;
      state.fullName = fullName;
      state.gender = gender;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.dateOfBirth = dateOfBirth;
      state.picture = picture;
      state.storeId = storeId;
      state.storeName = storeName;
    },
    // logout: (state) => {
    //   localStorage.clear();
    //   state.isLoggedIn = false;
    //   state.userRole = "";
    //   state.accessToken = "";
    // },
    logout: (state) => {
      localStorage.clear();
      // sessionStorage.clear(); // Nếu có lưu sessionStorage
      return { ...initialState }; // Reset Redux về trạng thái ban đầu
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
