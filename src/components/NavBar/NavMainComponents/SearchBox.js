import { Grid, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../../../Axios/API";
import {
  changeGenderTypeProduct,
  isLoadingListProduct,
  dataSearchInput,
} from "../../../features/product/productSlice";
import { openSignIn } from "../../../features/SignInAndSignUpSlice/signInAndSignUpSlice";
import {
  getAllData,
  search,
  suggest,
} from "../../../features/SignInUp/signInUpSlice";
import { Skeleton } from "@mui/material";
import { testing } from "../../../features/SignInUp/signInUpSlice";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: 312,
    backgroundColor: "white",
    display: "none",
    padding: "0px 36px 0px 36px",
  },
  nike: {
    width: 59.62,
    hegiht: 20.87,
    "&:hover": {
      opacity: 0.7,
    },
  },
  linkNike: {
    padding: "0 12px",
    height: 60,
    width: 84,
  },
  searchBoxContainer: {
    display: "block",
  },
  searchBarContainer: {
    height: 62,
    position: "absolute",
    left: 150,
    right: 150,
    padding: "10px 170px",
  },
  mainSearchBar: {
    borderRadius: 30,
    padding: "2px 2px",
    "&:hover": {
      backgroundColor: "#dee1e3",
    },
  },
  closeSearchBoxButton: {
    float: "right",
    margin: "12px 30px",
  },
  mainNavButton: {
    padding: 6,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#dee1e3",
    },
  },
  mainNavButtonLink: {
    color: "black",
    height: 24,
    "&:hover": {
      color: "black",
    },
  },
  popularSearch: {
    padding: "10px 0px 0px 290px",
  },
  popularSearchTerms: {
    color: "black",
    fontSize: 19,
    textDecoration: "none",
    marginBottom: "12px",
    "&:hover": {
      color: "grey",
    },
  },
  SearchResult: {
    minHeight: 380,
    padding: "40px 0 50px",
  },
  SearchProduct: {
    cursor: "pointer",
    minHeight: 350,
  },
  SearchProductImg: {
    width: "100%",
    height: "70%",
  },
  SearchProductPrice: {
    position: "absolute",
    bottom: 40,
  },
  TopSuggestTitle: {
    fontSize: 16,
    color: "#757575",
    paddingBottom: 16,
  },
  TopSuggest: {
    fontSize: 20,
    paddingBottom: 12,
  },
  TopSuggestItem: {
    color: "#757575",
    textDecoration: "none",
  },
}));
const ClickOutSideSearchBox = (ref) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        ref.current.style.display = "none";
        let fallBack = document.getElementById("fallback");
        ReactDOM.findDOMNode(fallBack).style.backgroundColor = "transparent";
        ReactDOM.findDOMNode(fallBack).style.zIndex = "-1";
        let navsub = document.getElementById("navsub");
        ReactDOM.findDOMNode(navsub).style.zIndex = "1101";
      }
      //bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up

        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
  }, [ref]);
};
const SearchBox = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  /*Off fallback*/
  const closeFallBack = () => {
    let fallback = document.getElementById("fallback");
    ReactDOM.findDOMNode(fallback).style.backgroundColor = "transparent";
    ReactDOM.findDOMNode(fallback).style.zIndex = "-1";
    let navsub = document.getElementById("navsub");
    ReactDOM.findDOMNode(navsub).style.zIndex = "1101";
  };
  //SearchBox Closed Button
  const closeXSearchBox = () => {
    let searchBox = document.getElementById("searchbox");
    ReactDOM.findDOMNode(searchBox).style.display = "none";
  };
  const closeSearchBox = useRef(null);
  ClickOutSideSearchBox(closeSearchBox);
  let dataAll = useSelector((state) => state.signInUp.dataAll);
  const dataSearchList = useSelector((state) => state.signInUp.dataSearchList);
  const dataSuggest = useSelector((state) => state.signInUp.dataSuggest);
  const isLoading = useSelector((state) => state.product.isLoading);
  const testData = useSelector((state) => state.signInUp.testing);
  useEffect(() => {
    const callAPI = async () => {
      try {
        dispatch(isLoadingListProduct(true));
        const res = await API(`product`, "GET");
        dataAll = res.data;
        console.log("before");
        dispatch(testing("ok"));
        dispatch(getAllData(res.data));
        dispatch(search(dataSearchList));
        dispatch(suggest(dataSuggest));
        dispatch(isLoadingListProduct(false));
        console.log("abc");
      } catch (e) {
        console.log(e);
      }
    };
    callAPI();
  }, []);

  const handleSearchInput = (e) => {
    if (e.target.value == "") {
      dispatch(search([]));
    } else {
      let suggestGender = ["male", "female", "kid"];
      let dataSearch = dataAll.filter((item, index) => {
        return (
          item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        );
      });
      const dataSearchSort = dataSearch.slice(0, 5);
      const dataSuggestSort = suggestGender.filter((item, index) => {
        return item.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
      });
      dispatch(suggest(dataSuggestSort));

      dispatch(search(dataSearchSort));
    }
  };

  const listDataSearch = dataSearchList.map((item) => {
    if (item.status === 1) {
      return (
        <Grid
          item
          xs={2}
          className={classes.SearchProduct}
          onClick={() => {
            navigate(`/detailProduct/${item._id}`);
            closeXSearchBox();
            closeFallBack();
          }}
        >
          {" "}
          <img src={item.img} className={classes.SearchProductImg} />{" "}
          <div>{item.name}</div>
          <div style={{ color: "#757575" }}>{item.message}</div>
          <div className={classes.SearchProductPrice}>
            {item.price.toLocaleString()}
          </div>
        </Grid>
      );
    }
  });
  const listDataSuggest = dataSuggest.map((item) => {
    <div className={classes.TopSuggest}>
      {(item == "male" || item == "female" || item == "kid") && (
        <Link
          to="/listProduct"
          className={classes.TopSuggestItem}
          onClick={() => {
            dispatch(
              changeGenderTypeProduct({ gender: item, typeProduct: "shoes" })
            );
            closeSearchBox();
            closeFallBack();
          }}
        >
          {item}
        </Link>
      )}
    </div>;
  });
  const handleSubmitSearch = (e, data) => {
    e.preventDefault();
    let dataInput;
    if (data !== undefined) {
      dataInput = data;
    } else {
      dataInput = e.target.searchbar.value;
    }
    if (dataInput != "") {
      dispatch(dataSearchInput(dataInput));
      dispatch(
        changeGenderTypeProduct({ gender: "search", typeProduct: "search" })
      );
      localStorage.setItem("search", JSON.stringify(dataInput));
      if (location.pathname === "/listProduct") {
        location.go(0);
      } else {
        navigate(`/listProduct`);
      }
    }
    closeXSearchBox();
    closeFallBack();
  };
  return (
    <div id="searchbox" className={classes.searchBox} ref={closeSearchBox}>
      <div>
        <Link to="/">
          <IconButton className={classes.linkNike}>
            <a href="#">
              <img
                alt=""
                src="https://www.logomaker.com/wp-content/uploads/2018/05/2000px-Logo_NIKE.png"
                className={classes.nike}
              />
            </a>
          </IconButton>
        </Link>
        {/* SearchBar */}
        <span className={classes.searchBarContainer}>
          <div className="animate__animated animate__fadeInBottomRight">
            <div className={classes.mainSearchBar}>
              <form onSubmit={handleSubmitSearch}>
                <IconButton className={classes.mainNavButton}>
                  <SearchIcon style={{ fill: "black" }} />
                </IconButton>
                <InputBase
                  className={classes.input}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  style={{ width: "80%" }}
                  onInput={(e) => {
                    handleSearchInput(e);
                  }}
                  name="searchbar"
                />
              </form>
            </div>
          </div>
        </span>
        {/* Close Search Box Button */}
        <span className={classes.closeSearchBoxButton}>
          <div className="animate__animated animate__fadeInDown">
            <IconButton
              className={classes.mainNavButton}
              onClick={() => {
                closeXSearchBox();
                closeFallBack();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </span>
      </div>
      {isLoading ? (
        <div>
          <Skeleton width="100%">
            <div className={classes.popularSearch}>
              <div className="animate__animated animate__fadeInDown">
                <p
                  style={{
                    fontSize: "16px",
                    color: "#757575",
                    paddingBottom: "2px",
                  }}
                >
                  Popular Search Terms
                </p>
                <p>
                  <a href="#a" className={classes.popularSearchTerms}>
                    Air Force 1
                  </a>
                </p>
                <p>
                  <a href="#a" className={classes.popularSearchTerms}>
                    Jordan
                  </a>
                </p>
                <p>
                  <a href="#a" className={classes.popularSearchTerms}>
                    Air Max
                  </a>
                </p>
                <p>
                  <a href="#a" className={classes.popularSearchTerms}>
                    Nike React
                  </a>
                </p>
              </div>
            </div>
          </Skeleton>
        </div>
      ) : (
        <div>
          {dataSearchList.length === 0 && dataSuggest.length == 0 ? (
            <div className={classes.popularSearch}>
              <div className="animate__animated animate__fadeInDown">
                <p
                  style={{
                    fontSize: "16px",
                    color: "#757575",
                    paddingBottom: "2px",
                  }}
                >
                  Popular Search Term
                </p>
                <p>
                  <a
                    href="#a"
                    className={classes.popularSearchTerms}
                    onClick={(e) => {
                      handleSubmitSearch(e, "Air Force 1");
                    }}
                  >
                    Air Force 1
                  </a>
                </p>
                <p>
                  <a
                    href="#a"
                    className={classes.popularSearchTerms}
                    onClick={(e) => {
                      handleSubmitSearch(e, "Jordan");
                    }}
                  >
                    Jordan
                  </a>
                </p>
                <p>
                  <a
                    href="#a"
                    className={classes.popularSearchTerms}
                    onClick={(e) => {
                      handleSubmitSearch(e, "Air Max");
                    }}
                  >
                    Air Max
                  </a>
                </p>
                <p>
                  <a
                    href="#a"
                    className={classes.popularSearchTerms}
                    onClick={(e) => {
                      handleSubmitSearch(e, "Nike React");
                    }}
                  >
                    Nike React
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className={classes.SearchResult}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <div className="animate__animated animate__fadeInDown">
                    <div className={classes.TopSuggestTitle}>
                      Top Suggestion
                    </div>
                  </div>
                  {dataSuggest.length > 0 && <div>{listDataSuggest}</div>}
                </Grid>
                {listDataSearch}
              </Grid>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
