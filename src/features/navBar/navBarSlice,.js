import { createSlice } from "@reduxjs/toolkit";
const userLocal = JSON.parse(localStorage.getItem("user"));
const initialState = {
  openModal: false,
  openSignUp: false,
  userLocal: userLocal,
  dataAll: [],
  dataSearchList: [],
  dataSuggest: [],
  isAdmin: false,
};
const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    modalHandler: (state, action) => {
      state.openModal = action.payload;
    },
    signUpHandler: (state, action) => {
      state.openSignUp = action.payload;
    },
    logOut: (state, action) => {
      state.user = action.payload;
      state.isAdmin = false;
    },
    fetch_API_login: (state, action) => {
      state.userLocal = action.payload;
      state.openModal = false;
    },
    suggest: (state, action) => {
      state.dataSuggest = action.payload.payload;
    },
  },
});
export const { modalHandler, signUpHandler, logOut, fetch_API_login, suggest } =
  navBarSlice.actions;
export default navBarSlice.reducer;
