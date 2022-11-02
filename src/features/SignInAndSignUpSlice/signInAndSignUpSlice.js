import { createSlice } from "@reduxjs/toolkit";

let userLocal = JSON.parse(localStorage.getItem("user"));

export const initialState = {
  open: false,
  openSU: false,
  user: userLocal,
  dataAll: [],
  dataSearchList: [],
  dataSuggest: [],
  isAdmin: false,
};

export const signInAndSignUpSlice = createSlice({
  name: "signInAndsignUp",
  initialState,
  reducer: {
    openSignIn: (state, action) => {
      console.log("action", action.payload);
      state.open = action.payload.data;
    },
    openSignUp: (state, action) => {
      console.log("action", action.payload);
      state.openSU = action.payload.data;
    },
    logOut: (state, action) => {
      state.user = action.payload;
      state.isAdmin = false;
    },
    fetchAPILogin: (state, action) => {
      state.user = action.payload;
      state.open = false;
    },
    getAllData: (state, action) => {
      console.log("action", action);
      console.log("action payload", action.payload);
      state.dataAll = action.payload;
    },
    search: (state, action) => {
      state.dataSearchList = action.payload;
    },
    suggest: (state, action) => {
      state.dataSuggest = action.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

// export const {
//   openSignIn,
//   openSignUp,
//   logOut,
//   fetchAPILogin,
//   getAllData,
//   search,
//   suggest,
//   setAdmin,
// } = signInAndSignUpSlice.actions;

export default signInAndSignUpSlice.reducer;
