import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { Hidden } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../utils/utils";
import API from "../../../Axios/API";
import { resetCart } from "../../../features/cart/cartSlice";
import PayPal from "../../Paypal/paypal";

const useStyles = makeStyles((theme) => ({
  Summary: {
    padding: "0 20px",
  },
  Title: {
    fontSize: 22,
    marginBottom: 12,
  },
  PriceDetail: {
    marginBottom: 8,

    lineHeight: 1.75,
  },
  HelpIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    cursor: "pointer",
  },
  Price: {
    float: "right",
  },
  TotalPrice: {
    margin: "12px 0",
    borderTop: "1px #cccccc solid",
    borderBottom: "1px #cccccc solid",
    padding: "14px 0",
  },
  Checkout: {
    padding: "20px 16px",
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
    marginBottom: 12,
  },
  CheckoutMobileContainer: {
    width: "100%",
    padding: "16px 12px",
    position: "fixed",
    bottom: 0,
  },
  HelpTooltip: {
    fontSize: 14,
    padding: "0 5px",
    width: 220,
    borderRadius: 2,
    lineHeight: 1.3,
    cursor: "pointer",
  },
}));
const CartSummary = () => {
  const classes = useStyles({
    Summary: {
      padding: "0 20px",
    },
    Title: {
      fontSize: 22,
      marginBottom: 12,
    },
    PriceDetail: {
      marginBottom: 8,

      lineHeight: 1.75,
    },
    HelpIcon: {
      width: 16,
      height: 16,
      marginLeft: 8,
      cursor: "pointer",
    },
    Price: {
      float: "right",
    },
    TotalPrice: {
      margin: "12px 0",
      borderTop: "1px #cccccc solid",
      borderBottom: "1px #cccccc solid",
      padding: "14px 0",
    },
    Checkout: {
      padding: "20px 16px",
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
      marginBottom: 12,
    },
    CheckoutMobileContainer: {
      width: "100%",
      padding: "16px 12px",
      position: "fixed",
      bottom: 0,
    },
    HelpTooltip: {
      fontSize: 14,
      padding: "0 5px",
      width: 220,
      borderRadius: 2,
      lineHeight: 1.3,
      cursor: "pointer",
    },
  });
  const [openHelp, setOpenHelp] = useState(false);
  const [checkOutStatus, setCheckOutStatus] = useState(false);
  const products = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();
  const history = useNavigate();

  const postAPICart = async (data, token, history) => {
    try {
      console.log("test");
      const res = await API("/cart/create", "POST", data, token);
      setTimeout(() => {
        notifySuccess("order successful");
        localStorage.removeItem("cart");
        dispatch(resetCart());
        history("/user/order");
      }, 2000);
    } catch (e) {
      notifyError("order fail");
      console.log({ ...e });
    }
  };
  const sumMoney = products.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
  const handleHelpClose = () => {
    setOpenHelp(false);
  };
  const checkOut = () => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      alert("please sign in before checkout");
    } else {
      if (products.length > 0) {
        setCheckOutStatus(true);
      } else {
        alert("please buy products before checkout");
      }
    }
  };
  const transactionSuccess = (data) => {
    notifySuccess("payment success");
    console.log("products", products);
    const productsCopy = JSON.parse(JSON.stringify(products));

    for (const item of productsCopy) {
      console.log("item", item.message);
      delete item.message;
      delete item.sizes;
    }

    const userLocal = JSON.parse(localStorage.getItem("user"));
    const { token } = userLocal;
    const object = {
      products: productsCopy,
      isPaid: data.paid,
      description: "paypal;",
    };
    postAPICart(object, token, history);
  };
  const transactionLive = () => {
    const productsCopy = JSON.parse(JSON.stringify(products));

    for (const item of productsCopy) {
      delete item.sizes;
      delete item.message;
    }
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const { token } = userLocal;
    const object = {
      products: productsCopy,
      isPaid: false,
      description: "Payment on delivery",
    };
    postAPICart(object, token, history);
  };
  const transactionError = (data) => {
    setTimeout(() => {
      notifySuccess("Payment fail");
    }, 2000);
  };
  const transactionCancel = (data) => {
    console.log("error", data);
  };
  const convertVNDtoUSD = () => {
    return parseInt((sumMoney / 23000).toFixed(2));
  };
  return (
    <div className={classes.Summary}>
      <div className={classes.Title}>Summary</div>
      <div className={classes.PriceDetail}>
        Subtotal
        <ClickAwayListener onClickAway={handleHelpClose}>
          <Tooltip
            arrow
            placement="bottom-end"
            open={openHelp}
            onClose={handleHelpClose}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div className={classes.HelpTooltip}>
                The subtotal reflects the total price of your order, including
                taxes, before any applicable discounts. It does not include
                delivery costs and international transaction fees.
              </div>
            }
          >
            <HelpIcon
              className={classes.HelpIcon}
              onClick={() => setOpenHelp(!openHelp)}
            />
          </Tooltip>
        </ClickAwayListener>
        <div className={classes.Price}>{sumMoney.toLocaleString()}d</div>
      </div>
      <div className={classes.PriceDetail}>
        Estimated Delivery & Handling
        <div className={classes.Price}>0d</div>
      </div>
      <div className={classes.TotalPrice}>
        Total{" "}
        <div className={classes.Price}>
          <b>{sumMoney.toLocaleString()}</b>
        </div>
      </div>
      {!checkOutStatus && (
        <Hidden smDown>
          <div className={classes.Checkout}>
            <button
              className={classes.CheckoutButton}
              onClick={() => {
                checkOut();
              }}
            >
              Guess CheckOut
            </button>
            <button className={classes.CheckoutButton}>Member CheckOut</button>
          </div>
        </Hidden>
      )}
      <Hidden smDown>
        {checkOutStatus && (
          <PayPal
            sum={convertVNDtoUSD()}
            transactionSuccess={transactionSuccess}
            transactionCancel={transactionCancel}
            transactionError={transactionError}
          />
        )}
        {checkOutStatus && (
          <button onClick={transactionLive} className={classes.CheckoutButton}>
            Payment on Delivery
          </button>
        )}
      </Hidden>
    </div>
  );
};

export default CartSummary;
