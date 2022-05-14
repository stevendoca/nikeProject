import { notifyError, notifySuccess } from "../../../utils/utils";
import * as ActionType from "../Content/content";
const cartLocal = JSON.parse(localStorage.getItem("cart"));
const useFavor = JSON.parse(localStorage.getItem("userFavor"));
const initialState = {
  products: cartLocal || [],
  productFavors: useFavor || [],
};
const checkDuplicate = (payload, arr) => {
  for (const item of arr) {
    if (
      item.id === payload.id &&
      item.color === payload.color &&
      item.size === payload.size
    ) {
      return item;
    }
    return null;
  }
};
const checkDuplicateFavor = (payload) => {
  const userFavor = JSON.parse(localStorage.getItem("userFavor"));
  for (let data of userFavor) {
    if (
      data?.name === payload.name &&
      data?.color === payload.color &&
      data?.size === payload.size
    ) {
      return data;
    }
  }
  return null;
};
const cartReducer = (state = initialState, { type, payload }) => {
  let cloneProducts = [...state.products];
  let cloneProductFavors = [...state.productFavors];
  switch (type) {
    case ActionType.ADD_TO_CART:
      const itemAdded = checkDuplicate(payload, cloneProducts);
      if (itemAdded) {
        itemAdded.quantity += 1;
      } else {
        cloneProducts = [...cloneProducts, payload];
      }
      localStorage.setItem("cart", JSON.stringify(cloneProducts));
      return { ...state, payload };
    default:
      return { ...state };
  }
};
export default cartReducer;
