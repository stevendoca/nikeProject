import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  logging: false,
  auth: false,
  errorMessage: false,
  currentUser: undefined,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //login action
    login(state, action) {
      state.logging = true;
      state.errorMessage = false;
      state.auth = false;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.errorMessage = false;
      state.logging = false;
      state.currentUser = action.payload;
      state.auth = false;
    },
    loginFailed(state) {
      state.logging = false;
      state.errorMessage = true;
      state.auth = false;
    },
    //logout action
    logout(state) {
      state.logging = true;
    },
    logoutSuccess(state) {
      state.logging = false;
      state.errorMessage = false;
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.auth = false;
    },
    setAuth(state) {
      state.auth = true;
    },
  },
});

// actions
export const LoginActions = LoginSlice.actions;

// selector
export const selectIsLogging = (state) => state.LoginReducer.logging;
export const selectIsLoggedIn = (state) => state.LoginReducer.isLoggedIn;
export const selectEmailLogging = (state) =>
  state.LoginReducer.currentUser?.email;
export const selectNameLogging = (state) =>
  state.LoginReducer.currentUser?.name;
export const selectTypeUserLogging = (state) =>
  state.LoginReducer.currentUser?.userType;
export const selectIDUser = (state) => state.LoginReducer.currentUser?._id;
export const selectUserName = (state) => state.LoginReducer.currentUser?.name;
export const selectUserType = (state) =>
  state.LoginReducer.currentUser?.userType;
export const selectUserFavorites = (state) =>
  state.LoginReducer.currentUser?.productsFavorite;

//reducer
const LoginReducer = LoginSlice.reducer;

export default LoginReducer;
