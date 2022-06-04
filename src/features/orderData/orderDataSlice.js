import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  dataOrder: [],
  dataProcess: [],
  dataDelivered: [],
};
export const OrderDataSlice = createSlice({
  name: "order data",
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
export const { dataOrderReducer, dataDeliverReducer, dataProcessReducer } =
  OrderDataSlice.actions;
export default OrderDataSlice.reducer;
