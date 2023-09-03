import { AppBar, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Hidden from "@material-ui/core/Hidden";

import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import API from "../../Axios/API";
import {
  changeGenderTypeProduct,
  fetchAPIListProduct,
  filterColorData,
  filterData,
  isLoadingListProduct,
  sortByTitleReducer,
  sortData,
} from "../../features/product/productSlice";
import ListProductFilter from "./ListProductComponent/listProductFilter";
import ListproductMain from "./ListProductComponent/listproductMain";
import ListProductMobile from "./ListProductComponent/listProductMobile";
import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 44,
    marginBottom: 44,
    padding: "0 20px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  Head: {
    padding: "15px 0 12px",
    backgroundColor: "white",
    display: "block",
    color: "black",
    boxShadow: "none",
    zIndex: 1,
  },
  FilterButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  SearchName: {
    fontSize: 24,
    display: "inline-block",
  },
  HideFilter: {
    fontSize: 16,
    paddingRight: 25,
    display: "flex",
    alignItems: "center",
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "white",
  },
  IconFilter: {
    marginLeft: 8,
    width: 16,
    height: 16,
  },
  SortBy: {
    fontSize: 16,
    padding: "0 6px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
    outline: "none",
    backgroundColor: "white",
  },
  SortByItemContainer: {
    // padding: "24px 28px 15px 0",
    // textAlign: "right",
    // position: "absolute",
    // right: 0,
    // zIndex: 2,
    // width: 160,
    // backgroundColor: "white",
  },
  SortByItem: {
    lineHeight: 1.75,
  },
  SortByLink: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "#757575",
    },
    FilterButton: {
      float: "right",
      display: "flex",
      alignItems: "center",
    },
    SearchName: {
      fontSize: 24,
      display: "inline-block",
    },
    HideFilter: {
      fontSize: 16,
      paddingRight: 25,
      display: "flex",
      alignItems: "center",
      border: "none",
      outline: "none",
      cursor: "pointer",
      backgroundColor: "white",
    },
    IconFilter: {
      marginLeft: 8,
      width: 16,
      height: 16,
    },
    SortBy: {
      fontSize: 16,
      padding: "0 6px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      border: "none",
      outline: "none",
      backgroundColor: "white",
    },
    SortByItemContainer: {
      padding: "24px 28px 15px 0",
      textAlign: "right",
      position: "absolute",
      right: 0,
      zIndex: 2,
      width: 160,
      backgroundColor: "white",
    },
    SortByItem: {
      lineHeight: 1.75,
    },
    SortByLink: {
      color: "black",
      textDecoration: "none",
      "&:hover": {
        color: "#757575",
      },
      fontSize: 16,
    },
    ListProductContainer: {
      paddingTop: 32,
    },
    fontSize: 16,
  },
  ListProductContainer: {
    paddingTop: 32,
  },
}));
const ListProduct = () => {
  const classes = useStyles();
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({
    typeProduct: [],
    gender: [],
    listColor: [],
  });
  const [open, setOpen] = useState("");
  const handleToggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const [hideFilter, setHideFilter] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const gender = useSelector((state) => state.product.gender);
  console.log("gender", gender);
  const typeProduct = useSelector((state) => state.product.typeProduct);
  console.log("products", typeProduct);
  const data = useSelector((state) => state.product.data);
  console.log("data", data);
  const dataSearchList = useSelector((state) => state.product.dataSearchList);
  const dataSearchInput = useSelector((state) => state.product.dataSearchInput);

  const GenderAndTypeProduct = {
    gender: gender,
    typeProduct: typeProduct,
  };

  const dispatch = useDispatch();

  const filterColor = useSelector((state) => state.product.filterColor);

  const filterSize = useSelector((state) => state.product.filterSize);
  const dataSort = useSelector((state) => state.product.dataSort);

  const dataFilter = useSelector((state) => state.product.dataFilter);

  const sortByTitle = useSelector((state) => state.product.sortByTitle);
  const [triggerHandleFilter, setTriggerHandlerFilter] = useState("");

  const handleFilter = () => {
    var sortData = [];
    for (let i = 0; i < dataSort.length; i++) {
      sortData.push(dataSort[i]);
    }

    dispatch(filterData(dataSort));
    if (triggerHandleFilter) {
      if (sortData) {
        if (filterColor.length > 0) {
          for (let i = 0; i < filterColor.length; i++) {
            var colors = sortData.filter((item, index) => {
              for (let j = 0; j < item.imgDetails.length; j++) {
                const colorSplit = item.imgDetails[j].color.split("/");
                for (let n = 0; n < colorSplit.length; n++) {
                  if (colorSplit[n] === filterColor[i]) {
                    return item;
                  }
                }
              }
            });
            sortData = colors;
            dispatch(filterData(colors));
          }
        }
        if (filterSize.length > 0) {
          for (let m = 0; m < filterSize.length; m++) {
            let sizes = sortData.filter((item, index) => {
              for (let j = 0; j < item.sizes.length; j++) {
                if (item.sizes[j].size === filterSize[m]) {
                  return item;
                }
              }
            });
            sortData = sizes;
            dispatch(filterData(sizes));
          }
        }
      }
    }
  };
  useEffect(() => {
    console.log("go Effectt");
    const callingAPI = async () => {
      console.log("abc");
      dispatch(isLoadingListProduct(true));
      const res = await API(
        `product/?gender=${gender}&typeProduct=${typeProduct}`,
        "GET"
      );
      console.log("res", res);
      dispatch(fetchAPIListProduct(res.data));
      dispatch(isLoadingListProduct(false));
    };
    callingAPI();
  }, [gender, typeProduct]);
  useEffect(() => {
    console.log("testing");
  }, []);
  const handleFeature = () => {
    dispatch(sortData(data));
    dispatch(filterColorData(data));
    dispatch(filterColor({ filterColor: [] }));
    dispatch(filterSize({ filterSize: [] }));
    dispatch(sortByTitleReducer(""));
  };
  const handleNewest = () => {
    const dataSort = [];
    for (let i = dataSort.length - 1; i >= 0; i--) {
      dataSort.push(dataSort[i]);
    }
    const dataSortFilter = [];
    for (let i = dataFilter.length - 1; i >= 0; i--) {
      dataSortFilter.push(dataFilter[i]);
    }
    dispatch(sortData(dataSort));
    dispatch(filterColorData(dataSortFilter));
    dispatch(sortByTitleReducer("Newest"));
  };
  const handleSortHighLow = () => {
    const dataSortTemp = [];
    for (let i = 0; i < dataSort.length; i++) {
      dataSortTemp.push(dataSort[i]);
    }
    dataSortTemp.sort((a, b) => (a.price < b.price ? 1 : -1));
    const dataSortFilter = [];
    for (let i = 0; i < dataFilter.length; i++) {
      dataSortFilter.push(dataFilter[i]);
    }
    dispatch(sortData(dataSortTemp));
    dispatch(filterColorData(dataSortFilter));
    dispatch(sortByTitleReducer("Price: High-Low"));
  };
  const handleSortLowHigh = () => {
    const dataSortTemp = [];
    for (let i = 0; i < dataSort.length; i++) {
      dataSortTemp.push(dataSort[i]);
    }
    dataSortTemp.sort((a, b) => (a.price > b.price ? 1 : -1));
    const dataSortFilter = [];
    for (let i = 0; i < dataFilter.length; i++) {
      dataSortFilter.push(dataFilter[i]);
    }
    dataSortFilter.sort((a, b) => (a.price > b.price ? 1 : -1));
    dispatch(sortData(dataSortTemp));
    dispatch(filterColorData(dataSortFilter));
    dispatch(sortByTitleReducer("Price: Low-High"));
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getValue = (value) =>
    typeof value === "string" ? value.toUpperCase() : value;

  const filterPlainArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    console.log("array", array);
    console.log("filter", filter);
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
    console.log("go handle Sort");
    console.log("sort", sort);
    console.log("data", data);
    console.log("filter", filter);

    switch (sort) {
      case "Price: High-Low":
        console.log("go case 1");
        return filterPlainArray(data, filter).sort((a, b) => b.price - a.price);
      case "Price: Low-High":
        console.log("go case 2");
        return filterPlainArray(data, filter).sort((a, b) => a.price - b.price);
      default:
        console.log("go case 3");
        filterPlainArray(data, filter);
    }
  };
  const products = handleSort();
  const productsLength = products.length;

  console.log("products", products);

  return (
    <div>
      <Container>
        <div className={classes.container}>
          <AppBar position="sticky" className={classes.Head}>
            {gender === "search" && typeProduct === "search" ? (
              <div className={classes.SearchName}>
                {" "}
                {`{dataSearchInput} ({dataSort.length})`}
              </div>
            ) : (
              <div className={classes.SearchName}>
                {capitalizeFirstLetter(gender)}'s{" "}
                {capitalizeFirstLetter(typeProduct)}{" "}
                {dataFilter.length > 0 && (
                  <span>{`(${dataFilter.length})`}</span>
                )}
              </div>
            )}

            <Hidden smDown>
              <div className={classes.FilterButton}>
                <button
                  className={classes.HideFilter}
                  onClick={() => setHideFilter((hideFilter) => !hideFilter)}
                >
                  {hideFilter && <span>Show Filter</span>}{" "}
                  {!hideFilter && <span>HideFilter</span>}
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/filter-1739026-1477153.png"
                    className={classes.IconFilter}
                    alt=""
                  />
                </button>
                <div className={classes.SortByItemContainer}>
                  <button
                    className={classes.SortBy}
                    onClick={() => setSortBy((sortBy) => !sortBy)}
                  >
                    Sort By
                    {sortByTitle !== "" && (
                      <span style={{ color: "#757575" }}>:{sortByTitle}</span>
                    )}
                    {sortBy && <ExpandLessIcon />}
                    {!sortBy && <ExpandMoreIcon />}
                  </button>
                  {sortBy && (
                    <div className={classes.SortByItemContainer}>
                      <div className={classes.SortByItem}>
                        <a
                          href="#"
                          className={classes.SortByLink}
                          onClick={() => handleFeature()}
                        >
                          Featured
                        </a>
                      </div>
                      <div className={classes.SortByItem}>
                        <a
                          href="#"
                          className={classes.SortByLink}
                          onClick={() => handleNewest()}
                        >
                          Newest
                        </a>
                      </div>
                      <div className={classes.SortByItem}>
                        <a
                          href="#"
                          className={classes.SortByLink}
                          onClick={() => {
                            setSort("Price: High-Low");
                          }}
                        >
                          Price: High-Low
                        </a>
                      </div>
                      <div className={classes.SortByItem}>
                        <a
                          href="#"
                          className={classes.SortByLink}
                          onClick={() => setSort("Price: Low-High")}
                        >
                          Price: Low-High
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Hidden>
            <Hidden mdUp>
              <ListProductMobile
                handleFilter={handleFilter}
                handleFeatured={handleFeature}
                handleNewest={handleNewest}
                handleSortLowHigh={handleSortLowHigh}
                handleSortHighLow={handleSortHighLow}
              />
            </Hidden>
          </AppBar>
          <div className={classes.ListProductContainer}>
            <Grid container spacing={2}>
              {/* filter color on the left */}
              <Hidden smDown>
                {!hideFilter && (
                  <ListProductFilter
                    handleFilter={setTriggerHandlerFilter}
                    dataFilter={dataFilter}
                  />
                )}
              </Hidden>

              {!hideFilter && (
                <Grid item sm={12} md={10}>
                  {/* mobile */}
                  <ListproductMain
                    filter={filter}
                    setFilter={setFilter}
                    open={open}
                    setOpen={setOpen}
                    productsLength={productsLength}
                    data={products}
                  />
                </Grid>
              )}
              {hideFilter && (
                <Grid item xs={12}>
                  <ListproductMain
                    filter={filter}
                    setFilter={setFilter}
                    open={open}
                    setOpen={setOpen}
                    productsLength={productsLength}
                    data={products}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ListProduct;
