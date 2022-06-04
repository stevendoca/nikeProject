import { configureStore } from "@reduxjs/toolkit";
import { initialState as productInitialState } from "../features/product/productSlice";
import { saveState, loadState } from "../common/localStorage/localStorage";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import navBarReducer from "../features/navBar/navBarSlice,";
import orderDataReducer from "../features/orderData/orderDataSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  navBar: navBarReducer,
  orderData: orderDataReducer,
});

// const preloadedState = {
//   product: {
//     typeProduct: loadState("GenderAndTypeProduct")?.typeProduct,
//     gender: loadState("GenderAndTypeProduct")?.gender,
//     data: [],
//     isLoading: false,
//     modalStatus: false,
//     isModalExist: false,
//   },
//   cart: {
//     products: loadState("cart")?.products || [],
//     productFavors: loadState("cart")?.productFavor || [],
//   },
// };
export const store = configureStore({
  reducer: rootReducer,
});
