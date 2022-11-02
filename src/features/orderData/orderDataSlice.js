import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataOrder: [],
  dataProcess: [],
  dataDelivered: [],
};
export const OrderDataSlice = createSlice({
  name: "orderdata",
  initialState,
  reducers: {
    dataOrderReducer: (state, action) => {
      state.dataOrder = action.payload;
    },
    dataDeliverReducer: (state, action) => {
      state.dataDelivered = action.payload;
    },
    dataProcessReducer: (state, action) => {
      state.dataProcess = action.payload;
    },
  },
});
export const {
  dataOrderReducer,
  dataDeliverReducer,
  dataProcessReducer,
  testReducer,
} = OrderDataSlice.actions;
export default OrderDataSlice.reducer;
