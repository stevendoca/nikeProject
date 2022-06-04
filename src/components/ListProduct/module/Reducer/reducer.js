// import * as ActionType from "../Content/content";

// const GenderAndTypeProduct = JSON.parse(
//   localStorage.getItem("GenderAndTypeProduct")
// );
// let initialState = {
//   typeProduct: GenderAndTypeProduct?.typeProduct,
//   gender: GenderAndTypeProduct?.gender,
//   data: [],
//   isLoading: false,
// };

// const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case ActionType.CHANGE_GENDER_TYPEPRODUCT:
//       state.gender = payload.gender;
//       state.typeProduct = payload.typeProduct;
//       localStorage.setItem(
//         "GenderAndTypeProduct",
//         JSON.stringify({
//           gender: state.gender,
//           typeProduct: state.typeProduct,
//         })
//       );
//       break;
//     case ActionType.FETCH_API_LIST_PRODUCT:
//       state.data = payload;
//       break;
//     case ActionType.IS_LOADING_LIST_PRODUCT:
//       state.isLoading = payload;
//       break;
//     default:
//       return { ...state };
//   }
//   return { ...state };
// };
// export default reducer;
