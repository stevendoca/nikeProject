// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export const initialState = { listUser: [] };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    listUserAction: (state, action) => {
      console.log("action payload", action.payload);
      state.listUser = action.payload;
    },
  },
});
export const { listUserAction } = userSlice.actions;
export default userSlice.reducer;
