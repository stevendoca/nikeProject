import React, { ReactDOM, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import Hidden from "@mui/material/Hidden";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSizeColor,
  updateQuantity,
  removeToCart,
} from "../../../features/cart/cartSlice";
import {
  checkDuplicateAndReturnIndex,
  notifyError,
} from "../../../utils/utils";
import { FormControl, NativeSelect } from "@material-ui/core";
import API from "../../../Axios/API";

const useStyles = makeStyles((theme) => ({
  CartBag: {
    // [theme.breakpoints.down("sm")]: {
    //   marginBottom: 16,
    // },
  },
  Product: {
    display: "flex",
    clear: "both",
    padding: "24px 8px",
    borderBottom: "1px #cccccc solid",
  },
  ProductImageContainer: {
    paddingRight: 16,
  },
  ProductImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    // [theme.breakpoints.down("xs")]: {
    //   width: 80,
    //   height: 80,
    // },
  },
  ProductDetail: {
    width: "100%",
    lineHeight: 1.75,
  },
  ProductName: {
    textDecoration: "none",
    color: "black",
  },
  Price: {
    float: "right",
    // [theme.breakpoints.down("xs")]: {
    //   float: 'none',
    // },
  },
  SubDetail: {
    color: "#757575",
  },
  SelectContainer: {
    display: "flex",
    alignItems: "baseline",
    // [theme.breakpoints.down("xs")]: {
    //   flexDirection: 'column',
    // },
  },
  SelectFormControl: {
    marginRight: 10,
  },
  CartItemAction: {
    marginTop: 16,
    // [theme.breakpoints.down("sm")]: {
    //   marginTop: 36,
    // },
    color: "#757575",
  },
  CartItemActionButton: {
    marginRight: 16,
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
    },
  },
  MoreOptionsMobile: {
    marginTop: 36,
    width: "100%",
    color: "black",
    backgroundColor: "white",
    padding: "8px 24px",
    borderRadius: 20,
    outline: 0,
    border: "1px #cccccc solid",
    fontSize: 16,
    cursor: "pointer",
    lineHeight: 1.75,
  },
  SelectFormContainer: {
    display: "flex",
    alignItems: "center",
  },
}));
const CustomSelect = withStyles((theme) => ({
  input: {
    fontSize: 16,
    color: "#757575",
    padding: "0px 12px",
    lineHeight: "inherit",
  },
}))(InputBase);
const CartBag = () => {
  const products = useSelector((state) => state.cart.products);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [itemProduct, setItemProduct] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const openMoreOption = () => {
    let moreOption = document.getElementById("MoreOptionsContainer");
    ReactDOM.findDOMNode(moreOption).style.display = "block";
  };
  const removeItemfromCart = (item) => {
    const indexItemRemoved = checkDuplicateAndReturnIndex(item, products);
    if (indexItemRemoved) {
      dispatch(removeToCart(indexItemRemoved));
    }
  };
  const postFavouriteCart = () => {
    return async () => {
      try {
        const userLocal = JSON.parse(localStorage.getItem("user"));
        const { token } = userLocal;
        const userFavour = JSON.parse(localStorage.getItem("userFavor"));
        if (userFavour === null) {
          const res = await API(
            "/users/addUpdateFavorite",
            "POST",
            { productFavorite: [] },
            token
          );
        } else {
          const res = await API(
            "/users/addUpdateFavorite",
            "POST",
            { productFavorite: userFavour },
            token
          );
        }
      } catch (e) {
        notifyError("add favourite fail");
        console.log({ ...e });
      }
    };
  };
  //get size when user click
  const handleChangeSize = (event) => {
    const { value } = event.target;
    console.log("value", value);
    const index = checkDuplicateAndReturnIndex(itemProduct, products);
    if (index) {
      const payload = {
        itemIndex: index,
        size: value,
      };
      dispatch(updateSizeColor(payload));
    }
  };
  const handleChangeQuantity = (event) => {
    const { value } = event.target;
    const index = checkDuplicateAndReturnIndex(itemProduct, products);

    if (index) {
      const payload = {
        itemIndex: index,
        quantity: value,
      };
      dispatch(updateQuantity(payload));
    }
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);
  return (
    <div className={classes.CartBag}>
      {products &&
        products.map((item, key) => {
          return (
            <div className={classes.Product} key={key}>
              <a href="#" className={classes.ProductImageContainer}>
                <img className={classes.ProductImage} src={item.img} />
              </a>
              <div className={classes.ProductDetail}>
                <a href="#" className={classes.ProductName}>
                  {item.name}
                </a>
                <div className={classes.Price}>
                  {item.price.toLocaleString()}d
                </div>
                <div className={classes.SubDetail}>
                  <div>Men's Shoes</div>
                  <div>White/Black/Cosmic Clay/White</div>
                  <div className={classes.SelectContainer}>
                    <span className={classes.SelectFormContainer}>
                      size
                      <FormControl className={classes.SelectFormControl}>
                        <NativeSelect
                          value={item.size}
                          input={
                            <CustomSelect
                              onChange={handleChangeSize}
                              onClick={() => {
                                setItemProduct(item);
                              }}
                            />
                          }
                        >
                          {" "}
                          {item.sizes.map((i, key) => {
                            return (
                              <option value={i.size} key={key}>
                                {i.size}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                    </span>
                    <span className={classes.SelectContainer}>
                      Quantity
                      <FormControl className={classes.SelectFormControl}>
                        <NativeSelect
                          value={item.quantity}
                          input={
                            <CustomSelect
                              onChange={handleChangeQuantity}
                              onClick={() => {
                                setItemProduct(item);
                              }}
                            />
                          }
                        >
                          {quantity.map((i, key) => {
                            return (
                              <option value={i} key={key}>
                                {i}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                    </span>
                  </div>
                </div>
                <Hidden xsDown>
                  <div className={classes.CartItemAction}>
                    <span
                      className={classes.CartItemActionButton}
                      onClick={() => {
                        // chua biet
                        // dispatch(
                        //   Action.createAction({
                        //     type: ActionType.REMOVECART_TOFAVOR,
                        //     payload: item,
                        //   })
                        // );
                        postFavouriteCart();
                      }}
                    >
                      Move to Favourites
                    </span>
                    <span
                      className={classes.CartItemActionButton}
                      onClick={() => {
                        removeItemfromCart(item);
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </Hidden>
                <Hidden smUp>
                  <button
                    className={classes.MoreOptionsMobile}
                    onClick={openMoreOption}
                  >
                    More Options
                  </button>
                </Hidden>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CartBag;
