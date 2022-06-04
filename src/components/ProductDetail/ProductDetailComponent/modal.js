import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@mui/material/Modal";
import { Backdrop, Grid, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { modalHandler } from "../../../features/product/productSlice";
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: "none",
    // padding: theme.spacing(2, 4, 3),
    height: 400,
    width: 500,
  },
  img: {
    width: 200,
    height: 200,
  },
  alert: {
    margin: "10px 0px",
  },
  iconClose: {
    cursor: "pointer",
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
});
// const Fade = React.forwardRef(function Fade(props, ref) {
//   const { in: open, children, onEnter, onExited, ...other } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter();
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited();
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {children}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element,
//   in: PropTypes.bool.isRequired,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
// };
const ModalTransition = ({ productDisPatch }) => {
  const classes = useStyles();
  const history = useNavigate();
  const modal = useSelector((state) => state.product.modalStatus);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const sumQuantity = products.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={modal}
      onClose={() => dispatch(modalHandler(false))}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={11}>
            <Alert severity="success">Added to Bag</Alert>
          </Grid>
          <Grid item xs={1}>
            <CloseIcon
              className={classes.iconClose}
              onClick={() => dispatch(modalHandler(false))}
            />
          </Grid>
          <Grid item xs={6}>
            <img src={productDisPatch.img} className={classes.img} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h6">
              {productDisPatch.name}
            </Typography>
            <Typography variant="p" component="p">
              {productDisPatch.message}
            </Typography>
            <Typography variant="p" component="p">
              Size {productDisPatch.name}
            </Typography>
            <Typography variant="inherit" component="span">
              {productDisPatch.price.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.Checkout}>
              {/* to={{pathname: `/cart/${item._id}`}} */}
              <Link to="/cart">
                <button className={classes.CheckoutButton}>
                  View Bag({sumQuantity})
                </button>
              </Link>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Link to="/cart">
              <button className={classes.CheckoutButton}>Checkout</button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default ModalTransition;
