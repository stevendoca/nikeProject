// import { createSlice } from "@reduxjs/toolkit";

// let userLocal = JSON.parse(localStorage.getItem("user"));
// let initialState = {
//   open: false,
//   openSU: false,
//   user: userLocal,
//   dataAll: [],
//   dataSearchList: [],
//   dataSuggest: [],
//   isAdmin: false,
//   testing: "",
// };
// export const signInUpSlice = createSlice({
//   name: "signInUp",
//   initialState,
//   reducer: {
//     testing: (state, action) => {
//       console.log("testing");
//       console.log("payload", action.payload);
//       state.open = action.payload;
//     },
//   },
// });

// export const { testing } = signInUpSlice.actions;
// export default signInUpSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userLocal = JSON.parse(localStorage.getItem("user"));
export const initialState = {
  open: false,
  openSU: false,
  user: userLocal,
  dataAll: [],
  dataSearchList: [],
  dataSuggest: [],
  isAdmin: false,
  testing: "",
};

export const signInUpSlice = createSlice({
  name: "signInUp",
  initialState,
  reducers: {
    getAllData: (state, action) => {
      state.dataAll = action.payload;
    },
    search: (state, action) => {
      state.dataSearchList = action.payload;
    },
    suggest: (state, action) => {
      state.dataSuggest = action.payload;
    },
    testing: (state, action) => {
      state.testing = action.payload;
    },
  },
});
export const { getAllData, testing, search, suggest } = signInUpSlice.actions;
export default signInUpSlice.reducer;
