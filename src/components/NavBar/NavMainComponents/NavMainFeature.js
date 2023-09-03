import { Drawer, Grid, IconButton, InputBase } from "@material-ui/core";
// import { makeStyles } from "@mui/styles";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  useHistory,
  useLocation,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom";
import API from "../../../Axios/API";
import {
  changeGenderTypeProduct,
  dataSearchInput,
} from "../../../features/product/productSlice";
import {
  getAllData,
  search,
  suggest,
} from "../../../features/SignInUp/signInUpSlice";
import MobileMenMenu from "./MobileMenuComponents/MobileMenMenu";
import MobileWomenMenu from "./MobileMenuComponents/MobileWomenMenu";
import MobileKidsMenu from "./MobileMenuComponents/MobileKidsMenu";
import MobileCustomiseMenu from "./MobileMenuComponents/MobileCustomiseMenu";
import MobileSaleMenu from "./MobileMenuComponents/MobileSaleMenu";
import MobileSNKRSMenu from "./MobileMenuComponents/MobileSNKRSMenu";
import MobileCollections from "./MobileMenuComponents/MobileCollections";

// const useStyles = makeStyles({
//   navMainFeature: {
//     backgroundColor: "red",
//     height: 34,
//     display: "flex",
//     alignItems: "center",
//     position: "absolute",
//     right: 36,
//     // [theme.breakpoints.down("sm")]: {
//     //   right: 10,
//     // },
//   },
//   nonMobile: {
//     display: "flex",
//     // [theme.breakpoints.down("sm")]: {
//     //   display: "none",
//     // },
//   },
//   Mobile: {
//     display: "none",
//     // [theme.breakpoints.down("sm")]: {
//     //   display: "flex",
//     // },
//   },
//   mainNavButtonLink: {
//     color: "black",
//     height: 24,
//     "&:hover": {
//       color: "black",
//     },
//   },
//   input: {
//     // padding: "6px 48px",
//     // height: 56,
//   },
//   mainNavButton: {
//     padding: 16,
//     height: 46,
//     borderRadius: "50%",
//     "&:hover": {
//       backgroundColor: "#dee1e3",
//     },
//   },
//   inputBar: {
//     padding: "4px 4px",
//     alignItems: "center",
//     borderRadius: 30,
//     width: 155,
//     marginRight: 20,
//     "&:hover": {
//       backgroundColor: "#dee1e3",
//     },
//   },
//   input: {
//     marginLeft: 50,
//     width: "65%",
//     backgroundColor: "green",
//   },
//   iconButton: {
//     padding: 1,
//     borderRadius: "50%",
//   },
//   drawerMobileMenu: {
//     width: 320,
//     // [theme.breakpoints.down("xs")]: {
//     //   width: 300,
//     // },
//   },
//   drawerMobileSearchBox: {
//     width: "100%",
//     height: "100%",
//   },
//   mobileMenu: {
//     marginTop: 26,
//     padding: "0 26px 150px",
//   },
//   mobileSubMenu: {
//     paddingTop: 16,
//   },
//   mobileSearchBoxContainer: {
//     margin: "8px 20px 0px 36px",
//   },
//   mobileMainSearchBar: {
//     borderRadius: 30,
//     padding: "2px 2px",
//   },
//   mobileMainNavButton: {
//     padding: "0 6px 0 0",
//     borderRadius: "50%",
//     color: "black",
//   },
//   mobilePopularSearch: {
//     padding: "30px 0px 0px 0px",
//   },
//   mobilePopularSearchTerms: {
//     color: "black",
//     fontSize: 19,
//     textDecoration: "none",
//     marginBottom: "12px",
//   },
//   sumQuanlity: {
//     position: "absolute",
//     right: "15px",
//     top: "9px",
//     fontSize: "9px",
//   },
//   TopSuggestTitle: {
//     fontSize: 16,
//     color: "#757575",
//     paddingBottom: 16,
//   },
//   TopSuggest: {
//     fontSize: 20,
//     paddingBottom: 12,
//   },
//   TopSuggestItem: {
//     color: "#757575",
//     textDecoration: "none",
//   },
//   SearchProductImg: {
//     width: "100%",
//   },
// });
const useStyles = makeStyles((theme) => ({
  navMainFeature: {
    height: 34,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: 36,
    [theme.breakpoints.down("sm")]: {
      right: 10,
    },
  },
  nonMobile: {
    display: "flex",
    backgroundColor: "f5f5f5",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  Mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  mainNavButtonLink: {
    color: "black",
    height: 24,
    "&:hover": {
      color: "black",
    },
  },
  input: {
    padding: "6px 48px",
    height: 36,
  },
  mainNavButton: {
    padding: 6,
    height: 36,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#dee1e3",
    },
  },
  inputBar: {
    padding: "4px 4px",
    alignItems: "center",
    borderRadius: 30,
    width: 155,
    marginRight: 20,
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#dee1e3",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    width: "65%",
  },
  iconButton: {
    padding: 1,
    borderRadius: "50%",
  },
  drawerMobileMenu: {
    width: 320,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  drawerMobileSearchBox: {
    width: "100%",
    height: "100%",
  },
  mobileMenu: {
    marginTop: 26,
    padding: "0 26px 150px",
  },
  mobileSubMenu: {
    paddingTop: 16,
  },
  mobileSearchBoxContainer: {
    margin: "8px 20px 0px 36px",
  },
  mobileMainSearchBar: {
    borderRadius: 30,
    padding: "2px 2px",
  },
  mobileMainNavButton: {
    padding: "0 6px 0 0",
    borderRadius: "50%",
    color: "black",
  },
  mobilePopularSearch: {
    padding: "30px 0px 0px 0px",
  },
  mobilePopularSearchTerms: {
    color: "black",
    fontSize: 19,
    textDecoration: "none",
    marginBottom: "12px",
  },
  sumQuanlity: {
    position: "absolute",
    right: "15px",
    top: "9px",
    fontSize: "9px",
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
  SearchProductImg: {
    width: "100%",
  },
}));
const NavMainFeature = (props) => {
  const classes = useStyles();
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const openFallBack = () => {
    let fallBack = document.getElementById("fallback");
    console.log("fallback", fallBack);
    ReactDOM.findDOMNode(fallBack).style.backgroundColor = "rgba(0,0,0,0.4)";
    ReactDOM.findDOMNode(fallBack).style.zIndex = "2";
    let navSub = document.getElementById("navsub");
    ReactDOM.findDOMNode(navSub).style.zIndex = "1100";
  };
  const openSearchBox = () => {
    let searchBox = document.getElementById("searchbox");
    console.log("searchBox", searchBox);
    ReactDOM.findDOMNode(searchBox).style.display = "block";
  };
  const [mobile, setMobile] = React.useState(false);
  const [mobileSearchBox, setMobileSearchBox] = useState(false);
  const products = useSelector((state) => state.cart.products);
  let dataAll = useSelector((state) => state.signInUp.dataAll);
  const dataSearchList = useSelector((state) => state.signInUp.dataSearchList);
  const dataSuggest = useSelector((state) => state.signInUp.dataSuggest);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const handleMobile = () => {
    setMobile(!mobile);
  };
  const handleMobileSearchBox = () => {
    setMobileSearchBox(!mobileSearchBox);
  };
  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await API("product", "GET");
        dataAll = res.data;
        dispatch(getAllData(res.data));
        dispatch(search([]));
        dispatch(suggest([]));
      } catch (e) {
        console.log(e);
      }
    };
    callAPI();
  }, []);
  const sumQuanlity = products.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  const handleSearchInput = (e) => {
    if (e.target.value == "") {
      dispatch(search([]));
    } else {
      let suggest = ["male", "female", "kid"];
      let dataSearch = dataAll.filter((item, index) => {
        return (
          item.name.tolowerCase().indexOf(e.target.value.tolowerCase()) > -1
        );
      });
      const dataSearchSort = dataSearch.slice(0, 5);
      const dataSuggestSort = suggest.filter((item, index) => {
        return item.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
      });
      dispatch(search(dataSearchSort));
      dispatch(suggest(dataSuggestSort));
    }
  };
  const listDataSearch = dataSearchList.map((item, index) => {
    <Grid
      item
      xs={6}
      sm={4}
      className={classes.SearchProduct}
      onClick={() => {
        Navigate(`/detailProduct/${item._id}`);
        handleMobileSearchBox();
      }}
    >
      <img src={item.img} className={classes.SearchProductImg} />
      <div>{item.name}</div>
      <div style={{ color: "#757575" }}>{item.message}</div>
      <div className={classes.SearchProductPrice}>
        {item.price.toLocaleString()}
      </div>
    </Grid>;
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
            handleMobileSearchBox();
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
    console.log("go handleSubmit");
    console.log("data", data);

    if (data !== undefined) {
      console.log("go here");
      dataInput = data;
    } else {
      dataInput = e.target.searchbar.value;
    }

    if (dataInput !== "") {
      dispatch(dataSearchInput(dataInput));
      dispatch(
        changeGenderTypeProduct({ gender: "search", typeProduct: "search" })
      );
      localStorage.setItem("search", JSON.stringify(dataInput));
      if (location.pathname === "/listProduct") {
        navigate("/listProduct");
      } else {
        navigate("/listProduct");
      }
    }
    handleMobileSearchBox();
  };
  return (
    <div className={classes.navMainFeature}>
      <span className={classes.nonMobile}>
        <div
          className={classes.inputBar}
          onClick={() => {
            openSearchBox();
            openFallBack();
          }}
        >
          <IconButton className={classes.mainNavButton}>
            <SearchIcon style={{ fill: "black" }} />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        {/* Favorite Icon */}
        <IconButton
          className={classes.mainNavButton}
          style={{ marginRight: "12px" }}
        >
          <Link to="/user/favorite" className={classes.mainNavButtonLink}>
            <FavoriteBorderIcon />
          </Link>
        </IconButton>

        {/* Bag Items */}
        <IconButton className={classes.mainNavButton}>
          <Link to="/cart" className={classes.mainNavButtonLink}>
            <WorkOutlineIcon />
          </Link>
        </IconButton>
        <span className={classes.sumQuanlity}>{sumQuanlity}</span>
      </span>
      <span className={classes.Mobile}>
        {/* Bag Items */}
        <IconButton
          className={classes.mainNavButton}
          style={{ marginLeft: "10px" }}
        >
          <Link to="/cart" className={classes.mainNavButtonLink}>
            <WorkOutlineIcon />
          </Link>
        </IconButton>
        {/* Search Button */}
        <IconButton
          className={classes.mainNavButton}
          style={{ marginLeft: "10px" }}
          onClick={handleMobileSearchBox}
        >
          <SearchIcon style={{ fill: "black" }} />
        </IconButton>
        <Drawer
          container={container}
          variant="temporary"
          anchor="top"
          open={mobileSearchBox}
          onClose={handleMobileSearchBox}
          classes={{ paper: classes.drawerMobileSearchBox }}
          ModalProps={{ keepMounted: true }}
        >
          <div className={classes.mobileSearchBoxContainer}>
            <div>
              <span className={classes.mobileMainSearchBar}>
                <form onSubmit={handleSubmitSearch}>
                  <IconButton className={classes.mobileMainNavButton}>
                    <SearchIcon style={{ fill: "black" }} />
                  </IconButton>
                  <InputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    style={{ diwth: "65%" }}
                    onInput={(e) => {
                      handleMobileSearchBox(e);
                    }}
                    name="searchbar"
                  />
                </form>
              </span>
              <IconButton
                className={classes.mobileMainNavButton}
                style={{ position: "absolute", right: 20, top: 20 }}
                onClick={handleMobileSearchBox}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {dataSearchList.length == 0 && dataSuggest.length == 0 ? (
              <div className={classes.mobilePopularSearch}>
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
                    className={classes.mobilePopularSearchTerms}
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
                    className={classes.mobilePopularSearchTerms}
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
                    className={classes.mobilePopularSearchTerms}
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
                    className={classes.mobilePopularSearchTerms}
                    onClick={(e) => {
                      handleSubmitSearch(e, "Nike React");
                    }}
                  >
                    Nike React
                  </a>
                </p>
              </div>
            ) : (
              <div className={classes.mobilePopularSearch}>
                <p>
                  <div className={classes.TopSuggestTitle}>Top Suggestion</div>
                </p>
                <p>
                  <Grid container spacing={1}>
                    {listDataSearch}
                  </Grid>
                </p>
              </div>
            )}
          </div>
        </Drawer>

        {/* MenuIcon */}
        <IconButton
          className={classes.mainNavButton}
          style={{ marginLeft: "10px" }}
          onClick={handleMobile}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobile}
          onClose={handleMobile}
          classes={{ paper: classes.drawerMobileMenu }}
          ModalProps={{ keepMounted: true }}
        >
          <div className={classes.mobileMenu}>
            <MobileMenMenu />
            <MobileWomenMenu />
            <MobileKidsMenu />
            <MobileCustomiseMenu />
            <MobileSaleMenu />
            <MobileCollections />
          </div>
        </Drawer>
      </span>
    </div>
  );
};

export default NavMainFeature;
