import { createSlice } from "@reduxjs/toolkit";

const GenderAndTypeProduct = JSON.parse(
  localStorage.getItem("GenderAndTypeProduct")
);
export const initialState = {
  //default type product
  typeProduct: GenderAndTypeProduct?.typeProduct,
  gender: GenderAndTypeProduct?.gender,
  data: [],
  isLoading: false,
  modalStatus: false,
  isModalExist: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeGenderTypeProduct: (state, action) => {
      state.gender = action.payload.gender;
      state.typeProduct = action.payload.typeProduct;
      // loItem(
      //   "GenderAndTypeProduct",
      //   JSON.stringify({
      //     gender: state.gender,
      //     typeProduct: state.typeProduct,
      //   })
      // );
    },
    fetchAPIListProduct: (state, action) => {
      state.data = action.payload;
    },
    isLoadingListProduct: (state, action) => {
      state.isLoading = action.payload;
    },
    modalHandler: (state, action) => {
      state.modalStatus = action.payload;
    },
    modalExistStatusHandler: (state, action) => {
      state.isModalExist = action.payload;
    },
  },
});
export const {
  changeGenderTypeProduct,
  fetchAPIListProduct,
  isLoadingListProduct,
  modalHandler,
  modalExistStatusHandler,
} = productSlice.actions;
export default productSlice.reducer;
