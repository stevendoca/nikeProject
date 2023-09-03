import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  listProducts: {
    display: "flex",
    overflowX: "auto",
    gap: "12px",
    scrollSnapType: "x mandatory",
    color: "rgba(0,0, 0, 0)",
    paddingBottom: "30px",
    transition: "color .2s ease-in-out",
    "&::-webkit-scrollbar": {
      height: "8px",
      appearance: "none",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "50px",
      backgroundColor: "inherit",
      boxShadow: "inset 0 0 0 20px",
    },
    "&:hover": {
      color: "rgb(0, 0, 0, .6)",
    },
  },
  productCard: {
    listStyle: "none",
    scrollSnapAlign: "start",
    flexShrink: 0,
    minWidth: "300px",
    minHeight: "300px",
    width: "calc(100% /3)",
    "& a": {
      listStyle: "none",
      textDecoration: "none",
    },
  },
  productImg: {
    width: "100%",
    aspectRatio: "1/1",
    display: "block",
  },
  infoProduct: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",
    margin: "20px 0 18px 0",
    "& > div:nth-child(1)": {
      fontSize: "16px",
      "& h4": {
        color: "#111",
        fontWeight: "normal",
      },
      "& p": {
        color: "#757575",
        textTransform: "capitalize",
      },
    },
    "& > div:nth-child(2)": {
      "& span": {
        color: "#111",
      },
    },
  },
});
const ScrollProducts = () => {
  const classes = useStyles();
  const products = useSelector((state) => state.product.data);
  console.log("products", products);
  const filterProducts = products.slice(0, 10);
  const renderProductCard = () => {
    return filterProducts.map((product) => {
      return (
        <li className={classes.productCard} key={product._id}>
          <Link to={`/detail/${product._id}`}>
            <img
              className={classes.productImg}
              src={product.img}
              alt={product.name}
            />
            <div className={classes.infoProduct}>
              <div>
                <h4>{product.name}</h4>
                <p>
                  {product.gender} {product.typeProduct}
                </p>
              </div>
              <div>
                <span>{product.price.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        </li>
      );
    });
  };
  return <ul className={classes.listProducts}>{renderProductCard()}</ul>;
};

export default ScrollProducts;
