import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Grid, Skeleton } from "@mui/material";
// import * as action from "../../Cart/Action/action";
// import * as ActionType from "../../Cart/Content/content";
import {
  checkDuplicateAndReturnIndex,
  notifyError,
  notifySuccess,
} from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartFavor } from "../../../features/cart/cartSlice";
import { modalHandler } from "../../../features/product/productSlice";
import ModalTransition from "./modal";
const useStyles = makeStyles((theme) => ({
  ProductContainer: {
    padding: "0 44px",
    fontSize: 16,
    lineHeight: 1.7,
    // [theme.breakpoints.down("md")]: {
    //   padding: "0 8px",
    // },
  },
  ProductImage: {
    width: "100%",
  },
  ShoesType: {
    fontSize: 16,
    marginBottom: 4,
  },
  ShoesName: {
    fontSize: 28,
  },
  Price: {
    fontSize: 16,
    textAlign: "right",
  },
  Size: {
    margin: "20px 0 12px",
  },
  SelectSize: {
    fontSize: 16,
  },
  AlertSelectSize: {
    fontSize: 16,
    color: "rgb(212, 63, 33)",
  },
  SizeGuide: {
    fontSize: 16,
    color: "#757575",
    textAlign: "right",
  },
  SizeRadio: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  SizeLabel: {
    fontSize: 16,
    padding: "10px 0 10px 0",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "20px",
    "&:hover": {
      boxShadow: "0 0 0 2px black",
      borderRadius: 2,
    },
  },
  SizeLabelChecked: {
    boxShadow: "rgb(17, 17, 17) 0px 0px 0px 1px inset",
    padding: "10px 0 10px 0",
    fontSize: 16,
    padding: "10px 0 10px 0",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "20px",
  },
  AddtoBag: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  Favorite: {
    width: "100%",
    color: "black",
    backgroundColor: "transparent",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "1px #ccc solid",
    outline: "none",
    cursor: "pointer",
  },
  FavoriteBorderIcon: {
    height: 15,
  },
  ProductLink: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
  },
  ProductColorway: {
    display: "none",
  },
  ProductColorwayImage: {
    width: "100px",
    height: "100px",
    border: "1px solid rgb(17, 17, 17)",
    borderRadius: "4px",
    opacity: 1,
  },
  ProductColorwayImageHide: {
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    opacity: 0.8,
  },
  CheckSize: {
    boxShadow: "rgb(212, 63, 33) 0px 0px 0px 1px",
    padding: "1px",
    borderRadius: "4px",
  },
  AlertSize: {
    margin: "20px 0px",
  },
  AddtoBagNotAllow: {
    cursor: "not-allowed",
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
  },
}));
const ProductMain = ({ detailProduct, getIndexImg, indexPress }) => {
  const classes = useStyles();
  const [size, setSize] = useState("");
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const products = useSelector((state) => state.cart.products);
  const modal = useSelector((state) => state.product.modalStatus);
  const dispatch = useDispatch();
  // window.addEventListener("click", (event) => {
  //   dispatch(modalHandler(false));
  //   console.log("click");
  // });
  const productDispatch = {
    id: detailProduct._id,
    name: detailProduct.name,
    message: detailProduct.message,
    sizes: detailProduct.sizes,
    size: size,
    price: detailProduct.price,
    quantity: 1,
    color: detailProduct.imgDetails[indexPress].color,
    img: detailProduct.imgDetails[indexPress].imgs[indexPress].img,
  };
  const favorProduct = {
    _id: detailProduct._id,
    name: detailProduct.name,
    message: detailProduct.message,
    sizes: detailProduct.sizes,
    size: size,
    price: detailProduct.price,
    quantity: 1,
    color: detailProduct.imgDetails[indexPress].color,
    img: detailProduct.imgDetails[indexPress].imgs[indexPress].img,
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleChange = (e) => {
    const { value } = e.target;
    setSize(value);
  };
  const checkSize = () => {
    if (size === "") {
      setFlag(true);
      return;
    }
    setFlag(false);
  };
  const addProduct = () => {
    if (size) {
      // handleOpen();
      dispatch(modalHandler(true));
      // dispatch(
      //   action.createAction({
      //     type: ActionType.ADD_TO_CART,
      //     payload: productDispatch,
      //   })
      // );
      const indexItem = checkDuplicateAndReturnIndex(productDispatch, products);
      dispatch(addToCart({ productDispatch, indexItem }));
    }
  };
  const checkSizeFavor = () => {
    if (size === "") {
      setFlag(true);
      return;
    }
    setFlag(false);
    //handleOpen;
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (!userLocal) {
      notifyError("Please login");
    } else {
      // dispatch(
      //   action.createAction({
      //     type: ActionType.ADD_TO_CARD_FAVOR,
      //     payload: favorProduct,
      //   })
      // );
      dispatch(addToCartFavor(favorProduct));
    }
  };
  const listSize = detailProduct.sizes.map((item, index) => (
    <Grid item xs={4} key={index}>
      <label>
        <input
          type="radio"
          name="box"
          value={item.size}
          className={classes.SizeRadio}
          onChange={handleChange}
          onBlur={checkSize}
        />
        <div
          className={
            size === item.size ? classes.SizeLabelChecked : classes.SizeLabel
          }
        >
          {item.size}
        </div>
      </label>
    </Grid>
  ));
  const isLoading = useSelector((state) => state.product.isLoading);
  const listSizeLazyLoad = detailProduct.sizes.map((item, index) => (
    <Grid item xs={4} key={index}>
      <Skeleton width="100%">
        <label>
          <input
            type="radio"
            name="box"
            value={item.size}
            className={classes.SizeRadio}
          />
          <div className={classes.SizeLabel}>{item.size}</div>
        </label>
      </Skeleton>
    </Grid>
  ));
  return (
    <Grid container className={classes.ProductContainer} spacing={2}>
      <Grid item xs={8}>
        {isLoading ? (
          <Skeleton>
            <div className={classes.ShoesType}>Men's shoes</div>
          </Skeleton>
        ) : (
          <div className={classes.ShoesType}>Men's shoes</div>
        )}
        {isLoading ? (
          <Skeleton>
            <div className={classes.ShoesName}>{detailProduct.name}</div>
          </Skeleton>
        ) : (
          <div className={classes.ShoesName}>{detailProduct.name}</div>
        )}
      </Grid>
      <Grid item xs={4}>
        {isLoading ? (
          <Skeleton>
            <div className={classes.Price}>
              {detailProduct.price.toLocaleString()}
            </div>
          </Skeleton>
        ) : (
          <div className={classes.Price}>
            {detailProduct.price.toLocaleString()}
          </div>
        )}
      </Grid>
      {detailProduct.imgDetails.map((item, index) => {
        return (
          <Grid item xs={4} key={index}>
            {isLoading ? (
              <Skeleton>
                <img
                  src={item.imgs[0].img}
                  className={classes.ProductColorwayImage}
                />
              </Skeleton>
            ) : (
              <img
                alt="productImg"
                key={index}
                src={item.imgs[0].img}
                className={
                  indexPress === index
                    ? classes.ProductColorwayImage
                    : classes.ProductColorwayImageHide
                }
                onClick={() => {
                  getIndexImg(index);
                }}
              />
            )}
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Grid container className={classes.Size} spacing={2}>
          {" "}
          <Grid
            item
            xs={6}
            className={flag ? classes.AlertSelectSize : classes.SelectSize}
          >
            {" "}
            {isLoading ? (
              <Skeleton width="100%">
                {" "}
                <span>Select Size</span>
              </Skeleton>
            ) : (
              <span>Select Size</span>
            )}
          </Grid>
          <Grid item xs={6} className={classes.SizeGuide}>
            {" "}
            {isLoading ? (
              <Skeleton>
                <span>Size Guide</span>
              </Skeleton>
            ) : (
              <span>Size Guide</span>
            )}
          </Grid>
          {isLoading ? listSizeLazyLoad : listSize}
        </Grid>
        {flag && (
          <Alert severity="error" className={classes.AlertSize}>
            Please choosen size
          </Alert>
        )}
        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton width="100%">
              <button className={classes.AddToBag}>Add to Bag</button>
            </Skeleton>
          ) : (
            <button
              className={flag ? classes.AddtoBagNotAllow : classes.AddtoBag}
              onClick={() => {
                checkSize();
                addProduct();
              }}
            >
              Add to Bag
            </button>
          )}
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton width="100%">
              <button className={classes.Favorite}>
                Favorite{" "}
                <img
                  src="https://icon-library.com/images/heart-icon-svg/heart-icon-svg-17.jpg"
                  className={classes.FavoriteBorderIcon}
                />
              </button>
            </Skeleton>
          ) : (
            <button
              className={classes.Favorite}
              onClick={() => {
                checkSizeFavor();
              }}
            >
              Favorite{" "}
              <img
                src="https://icon-library.com/images/heart-icon-svg/heart-icon-svg-17.jpg"
                className={classes.FavoriteBorderIcon}
              />
            </button>
          )}
        </Grid>
      </Grid>
      <Grid />
      <ModalTransition
        // open={open}
        // handleOpen={handleOpen}
        // handleClose={handleClose}
        productDisPatch={productDispatch}
      />
    </Grid>
  );
};

export default ProductMain;
