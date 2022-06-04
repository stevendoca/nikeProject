import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Drawer, Grid, Hidden } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ReactDOM } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/utils";
import CartBag from "./CartComponent/CartBag";
import CartSummary from "./CartComponent/CartSummary";
import CartFavourite from "./CartComponent/CartFavourite";
import PayPal from "../Paypal/paypal";
import API from "../../Axios/API";
import { resetCart } from "../../features/cart/cartSlice";
const useStyles = makeStyles({
  Container: {
    margin: "40px 0",
  },
  Cart: {
    width: 1100,
    // [theme.breakpoints.down('md')]: {
    //     width: '92%',
    // },
    // [theme.breakpoints.down('sm')]: {
    //     width: '100%',
    //     // padding: '0 8px',
    // },
    margin: "0px auto",
    fontSize: 16,
  },
  CloseIcon: {
    float: "right",
    color: "grey",
    cursor: "pointer",
  },
  PromoCode: {
    padding: "8px 0 30px 16px",
    fontSize: 12,
  },
  PromoCodeTitle: {
    fontSize: 14,
  },
  Bag: {
    fontSize: 22,
  },
  BagMobile: {
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.75,
  },
  NumberItems: {
    color: "#757575",
  },
  CheckoutButton: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1.75,
  },
  CheckoutMobileContainer: {
    width: "100%",
    padding: "16px 0px",
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  MoreOptionsContainer: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    backgroundColor: "white",
    zIndex: 2,
    display: "none",
  },
  MoreOptionsButton: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 1.75,
  },
  MoreOptionsCancel: {
    width: "inherit",
    color: "black",
    backgroundColor: "white",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "1px #cccccc solid",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1.75,
  },
  MemberCheckoutContainer: {
    padding: 24,
  },
});
const Cart = (props) => {
  const classes = useStyles();
  const [PromoCode, setPromodeCode] = useState(true);
  const [checkOut, setCheckOut] = useState(false);
  const products = useSelector((state) => state.cart.products);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);
  const cancelMoreOptions = () => {
    let moreOption = document.getElementById("MoreOptionsContainer");
    ReactDOM.findDOMNode(moreOption).style.display = "none";
  };
  const sumMoney = products.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const dispatch = useDispatch();
  const history = useNavigate();
  const postAPICart = (data, token, history) => {
    return async () => {
      try {
        const res = await API("/cart/create", "POST", data, token);
        setTimeout(() => {
          notifySuccess("order successful");
          dispatch(resetCart());
        }, 2000);
      } catch (e) {
        notifyError("order fail");
        console.log({ ...e });
      }
    };
  };
  const checkOutHandler = () => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      notifyError("Please sign in before checkout");
    } else {
      if (products.length > 0) {
        setCheckOut(true);
        // setOpen(true);
      } else {
        notifyError("Please buy product before checkout");
      }
    }
  };
  const transactionSuccess = (data) => {
    notifySuccess("Payment success");
    // for (const item of products ){
    //   delete item.sizes;
    //   delete item.message;
    // }
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const { token } = userLocal;
    const object = {
      products: products,
      isPaid: data.paid,
      description: "paypal",
    };
    postAPICart(object, token, history);
  };
  const transactionLive = () => {
    for (const item of products) {
      delete item.sizes;
      delete item.message;
    }

    const userLocal = JSON.parse(localStorage.getItem("user"));
    const { token } = userLocal;
    const object = {
      products: products,
      isPaid: false,
      description: "Payment is on delivery",
    };
  };
  const transactionError = (data) => {
    console.log("error", data);
    setTimeout(() => {
      notifySuccess("Payment Fail");
    }, 2000);
  };
  const transactionCancel = (data) => {
    console.log("error", data);
  };
  const convertVNDtoUSD = () => {
    console.log(sumMoney);
    return (sumMoney / 23000).toFixed(2);
  };
  return (
    <div className={classes.Container}>
      <Container maxWidth="xl">
        <div className={classes.Cart}>
          <Hidden mdUp>
            <div className={classes.BagMobile}>
              <div className={classes.Bag}>Bag</div>
              <div>
                <span className={classes.NumberItems}> 2 Items | </span>{" "}
                {sumMoney.toLocaleString()}d
              </div>
            </div>
          </Hidden>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              {PromoCode && (
                <div className={classes.PromoCode}>
                  <div
                    className={classes.CloseIcon}
                    onClick={() => setPromodeCode(!PromoCode)}
                  >
                    CloseIcon
                  </div>
                  <div className={classes.PromoCodeTitle}>
                    HAVE A PROMO CODE?
                  </div>
                  <div>
                    If you have a promo code you will be able to apply it on the
                    payment page during checkout.
                  </div>
                </div>
              )}
              <Hidden smDown>
                <div className={classes.Bag}>Bag</div>
              </Hidden>
              <CartBag />
            </Grid>
            <Grid item md={4} xs={12}>
              <CartSummary />
            </Grid>
          </Grid>
          <CartFavourite />
        </div>
      </Container>
      {/* Check Out Button Mobile */}
      <Hidden mdUp>
        <div className={classes.CheckoutMobileContainer}>
          <div style={{ margin: "0 12px" }}>
            <button
              className={classes.CheckoutButton}
              onClick={() => checkOutHandler()}
            >
              Go to Checkout
            </button>
          </div>
        </div>
        <Drawer
          container={container}
          variant="temporary"
          anchor="bottom"
          open={checkOut ? true : false}
          onClose={() => {
            setTimeout(false);
          }}
          ModalProps={{ keepMounted: true }}
        >
          <div className={classes.MemberCheckoutContainer}>
            <PayPal
              sum={convertVNDtoUSD()}
              transactionSuccess={transactionSuccess}
              transactionCancel={transactionCancel}
              transactionError={transactionError}
            />

            <button
              className={classes.MoreOptionsButton}
              onClick={transactionLive}
            >
              Member CheckOut
            </button>
          </div>
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <div id="MoreOptionsContainer" className={classes.MoreOptionsContainer}>
          <button className={classes.MoreOptionsButton}>
            Move to Favourites
          </button>
          <button className={classes.MoreOptionsButton}>Remove</button>
          <button
            className={classes.MoreOptionsCancel}
            onClick={() => cancelMoreOptions()}
          >
            Cancel
          </button>
        </div>
      </Hidden>
    </div>
  );
};

export default Cart;
