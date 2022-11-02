import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import navBarReducer from "../features/navBar/navBarSlice,";
import orderDataReducer from "../features/orderData/orderDataSlice";
import { combineReducers } from "redux";
import userReducer from "../features/user/userSlice";
import signInAndSignUpReducer from "../features/SignInAndSignUpSlice/signInAndSignUpSlice";
import signInUpReducer from "../features/SignInUp/signInUpSlice";
const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  navBar: navBarReducer,
  orderData: orderDataReducer,
  user: userReducer,
  // signInAndSignUp: signInAndSignUpReducer,
  signInUp: signInUpReducer,
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
