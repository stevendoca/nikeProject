import { createSlice } from "@reduxjs/toolkit";

const GenderAndTypeProduct = JSON.parse(
  localStorage.getItem("GenderAndTypeProduct")
);
const search = JSON.parse(localStorage.getItem("search"));
export const initialState = {
  //default type product
  typeProduct: GenderAndTypeProduct?.typeProduct,
  gender: GenderAndTypeProduct?.gender,
  data: [],
  dataSort: [],
  dataFilter: [],
  dataSearchList: [],
  dataSearchInput: search === null ? [] : search,
  sortByTitle: "",
  isLoading: false,
  modalStatus: false,
  isModalExist: false,
  filterColor: [],
  filterSize: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeGenderTypeProduct: (state, action) => {
      state.gender = action.payload.gender;
      state.typeProduct = action.payload.typeProduct;
    },
    sortData: (state, action) => {
      state.dataSort = action.payload;
    },
    sortByTitleReducer: (state, action) => {
      state.sortByTitle = action.payload;
    },
    filterColorData: (state, action) => {
      state.dataFilter = action.payload;
    },
    filterData: (state, action) => {
      state.dataFilter = action.payload;
    },
    filterColorHandler: (state, action) => {
      state.filterColor = action.payload;
    },
    filterSizeHandler: (state, action) => {
      state.filterSize = action.payload.filterSize;
    },
    dataSearch: (state, action) => {
      state.dataSearchList = action.payload;
    },
    dataSearchInput: (state, action) => {
      state.dataSearchInput = action.payload;
    },
    fetchAPIListProduct: (state, action) => {
      state.data = action.payload;
      state.dataSort = action.payload;
      state.dataFilter = action.payload;
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
  filterColorData,
  modalHandler,
  modalExistStatusHandler,
  filterColorHandler,
  filterSizeHandler,
  sortData,
  filterData,
  dataSearchInput,
  sortByTitleReducer,
} = productSlice.actions;
export default productSlice.reducer;
