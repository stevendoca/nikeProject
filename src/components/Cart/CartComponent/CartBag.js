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
import { Divider, FormControl, NativeSelect } from "@material-ui/core";
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
    paddingLeft: 10,
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
  cardProduct: {
    paddingTop: "30px",
    display: "flex",
    "& img": {
      width: "150px",
      aspectRatio: "1/1",
      marginRight: "30px",
      marginBottom: "30px",
      [theme.breakpoints.down("md")]: {
        marginRight: "10px",
        width: "100px",
        height: "100px",
      },
    },
    "& > div": {
      "& p:nth-child(2)": {
        color: "#7e7e7e",
        textTransform: "capitalize",
      },
      "& p:nth-child(3)": {
        color: "#7e7e7e",
        textTransform: "capitalize",
      },
    },
  },
  flex: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  root: {
    padding: "0 20px",
    display: "flex",
    maxWidth: "1100px",
    margin: "40px auto 0",
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
  const sumMoney = products.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
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
    <div>
      {products.length === 0 && <h5>There are no items in your bag</h5>}
      {products &&
        products.map((item, key) => {
          return (
            <div className={classes.cardProduct} key={key}>
              <a href="#">
                <img src={item.img} />
              </a>
              <div className={classes.flex}>
                <div>
                  <p>{item.name}</p>
                  <div className={classes.SubDetail}>
                    <p>{item.gender}</p>
                    <p>{item.typeProduct}</p>
                    <p>{item.color}</p>

                    <div className={classes.SelectContainer}>
                      <span className={classes.SelectFormContainer}>
                        Size
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
                      Move to Favourite
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
                </div>
                {/* <div>{item.price.toLocaleString()}d</div> */}

                <div>{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      <Divider />
    </div>
  );
};

export default CartBag;
