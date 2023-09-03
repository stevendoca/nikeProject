import { SettingsPowerRounded } from "@mui/icons-material";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import API from "../../Axios/API";
import {
  fetchAPIListProduct,
  isLoadingListProduct,
} from "../../features/product/productSlice";
import FilterBar from "./ListProductComponent/FilterBar";
import ListProductMain from "./ListProductComponent/listproductMain";
const ListProductFinal = () => {
  const [open, setOpen] = useState(true);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({
    typeProduct: [],
    gender: [],
    listColor: [],
  });
  const dispatch = useDispatch();
  const handleToggleOpen = () => {
    setOpen(!open);
  };
  const isLoading = useSelector((state) => state.product.isLoading);
  const gender = useSelector((state) => state.product.gender);
  const typeProduct = useSelector((state) => state.product.typeProduct);
  const listProductState = useSelector((state) => state.product.data);
  const getProducts = listProductState.map((product) => {
    return {
      ...product,
      listColor: product.imgDetails.reduce((acc, pro) => {
        return pro.color.replace(/[/]/g, " ");
      }, ""),
    };
  });
  console.log("get Products", getProducts);
  const title = "";
  const getValue = (value) =>
    typeof value === "string" ? value.toUpperCase() : value;

  const filterPlainArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    // console.log(filters);
    console.log("filter Keys", filterKeys);
    return array.filter((item) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;
        if (key !== "gender") {
          return filters[key].find((filter) => {
            return getValue(item[key]).includes(getValue(filter));
          });
        } else {
          return filters[key].find((filter) => {
            return getValue(item[key]) === getValue(filter);
          });
        }
      });
    });
  };
  const handleSort = () => {
    const temp = JSON.parse(
      JSON.stringify(filterPlainArray(getProducts, filter))
    );
    switch (sort) {
      case "Price: High-Low":
        return temp.sort((a, b) => b.price - a.price);
      case "Price: Low-High":
        return temp.sort((a, b) => a.price - b.price);
      default:
        return temp;
    }
  };
  const products = handleSort();
  const productsLength = products.length;

  useEffect(() => {
    const callAPI = async () => {
      console.log("gender", gender);
      console.log("typeProduct", typeProduct);
      dispatch(isLoadingListProduct(true));
      const res = await API(
        `product/?gender=${gender}&typeProduct=${typeProduct}`,
        "GET"
      );
      dispatch(fetchAPIListProduct(res.data));
      dispatch(isLoadingListProduct(false));
    };
    callAPI();
  }, []);
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <FilterBar
          productsLength={productsLength}
          open={open}
          setOpen={handleToggleOpen}
          sort={sort}
          setSort={setSort}
          title={title}
        />
      </Box>

      <ListProductMain
        filter={filter}
        listProduct={products}
        setFilter={setFilter}
        open={open}
        setOpen={setOpen}
        productsLength={productsLength}
        data={products}
      />
    </ThemeProvider>
  );
};

export default ListProductFinal;
