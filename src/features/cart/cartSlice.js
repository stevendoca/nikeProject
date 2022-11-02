import { createSlice } from "@reduxjs/toolkit";
const cartLocal = JSON.parse(localStorage.getItem("cart"));
const useFavor = JSON.parse(localStorage.getItem("userFavor"));

const initialState = {
  products: cartLocal || [],
  productFavors: useFavor || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload.indexItem) {
        state.products[action.payload.indexItem].quantity += 1;
      } else {
        state.products.push(action.payload.productDispatch);
      }
    },
    resetCart: (state) => {
      state.products = [];
    },
    removeToCart: (state, action) => {
      if (state.products[action.payload].quantity > 1) {
        state.products[action.payload].quantity -= 1;
      } else {
        state.products.splice(action.payload, 1);
      }
    },
    addToCartFavor: (state, action) => {
      console.log(action.payload);
    },
    updateSizeColor: (state, action) => {
      state.products[action.payload.itemIndex].size = action.payload.size;
    },
    updateQuantity: (state, action) => {
      state.products[action.payload.itemIndex].quantity = parseInt(
        action.payload.quantity
      );
    },
  },
});
export const {
  addToCart,
  addToCartFavor,
  updateSizeColor,
  updateQuantity,
  resetCart,
  removeToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
