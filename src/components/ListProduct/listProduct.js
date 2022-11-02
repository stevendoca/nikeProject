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
  const [hideFilter, setHideFilter] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const gender = useSelector((state) => state.product.gender);
  const typeProduct = useSelector((state) => state.product.typeProduct);
  const data = useSelector((state) => state.product.data);
  const dataSearchList = useSelector((state) => state.product.dataSearchList);
  const dataSearchInput = useSelector((state) => state.product.dataSearchInput);
  const GenderAndTypeProduct = {
    gender: gender,
    typeProduct: typeProduct,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const callAPI = async () => {
      try {
        if (gender === "search" && typeProduct === "search") {
          const res = await API(`product`, "GET");
          const allData = res.data;
          const dataSearch = allData.filter((item, index) => {
            return (
              item.name.toLowerCase().indexOf(dataSearchInput.toLowerCase()) >
              -1
            );
          });
          dispatch(fetchAPIListProduct(dataSearch));
        } else {
          dispatch(isLoadingListProduct(true));
          const res = await API(
            `product/?gender=${gender}&typeProduct=${typeProduct}`,
            "GET"
          );
          dispatch(fetchAPIListProduct(res.data));
          dispatch(isLoadingListProduct(false));
        }
        localStorage.setItem(
          "GenderAndTypeProduct",
          JSON.stringify(GenderAndTypeProduct)
        );
      } catch (e) {
        console.log("e", e);
      }
      return () => {
        changeGenderTypeProduct({ gender: null, typeProduct: null });
      };
    };
    callAPI();
  }, [gender, typeProduct, dataSearchList]);
  const filterColor = useSelector((state) => state.product.filterColor);
  useEffect(() => {
    console.log("filterColor List", filterColor);
  }, [filterColor]);
  const filterSize = useSelector((state) => state.product.filterSize);
  const dataSort = useSelector((state) => state.product.dataSort);

  const dataFilter = useSelector((state) => state.product.dataFilter);

  const sortByTitle = useSelector((state) => state.product.sortByTitle);

  const handleFilter = (filter) => {
    console.log("filter Color", filterColor);
    var sortData = [];
    for (let i = 0; i < dataSort.length; i++) {
      sortData.push(dataSort[i]);
    }

    dispatch(filterColorData(dataSort));
    if (filter === "") {
      dispatch(filterColorData(data));
    } else {
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
            dispatch(filterColorData(colors));
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
            dispatch(filterColorData(sizes));
          }
        }
      }
    }
  };
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
                          onClick={() => handleSortHighLow()}
                        >
                          Price: High-Low
                        </a>
                      </div>
                      <div className={classes.SortByItem}>
                        <a
                          href="#"
                          className={classes.SortByLink}
                          onClick={() => handleSortLowHigh()}
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
                  <ListProductFilter handleFilter={handleFilter} />
                )}
              </Hidden>

              {!hideFilter && (
                <Grid item sm={12} md={10}>
                  {/* mobile */}
                  <ListproductMain data={dataFilter} />
                </Grid>
              )}
              {hideFilter && (
                <Grid item xs={12}>
                  <ListproductMain data={dataFilter} />
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
