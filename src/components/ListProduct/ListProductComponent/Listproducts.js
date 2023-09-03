import { makeStyles } from "@mui/styles";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  lazyCard: {
    width: "calc((100% - 32px) / 3)",
    [theme.breakpoints.down("md")]: {
      width: "calc((100% - 16px) / 2)",
    },
    "& > span:nth-child(1)": {
      width: "100%",
      aspectRatio: "1/1",
      borderRadius: "10px",
      objectFit: "cover",
    },
    "& > p": {
      "&:nth-child(2)": {
        fontSize: "16px",
        color: "#111",
      },
      "&:nth-child(3)": {
        fontSize: "16px",
        color: "#757575",
      },
      "&:nth-child(4)": {
        fontSize: "16px",
        color: "#757575",
      },
      "&:nth-child(5)": {
        fontSize: "16px",
        color: "#111",
      },
    },
  },
  card: {
    cursor: "pointer",
    width: "calc((100% - 32px) / 3)",
    [theme.breakpoints.down("md")]: {
      width: "calc((100% - 16px) / 2)",
    },
    "& a": {
      textDecoration: "none",
      width: "100%",
      display: "block",
      "& img": {
        width: "100%",
        aspectRatio: "1/1",
        objectFit: "cover",
      },
      "& > p": {
        "&:nth-child(2)": {
          fontSize: "16px",
          color: "#111",
        },
        "&:nth-child(3)": {
          textTransform: "capitalize",
          fontSize: "16px",
          color: "#757575",
        },
        "&:nth-child(4)": {
          fontSize: "16px",
          color: "#757575",
        },
        "&:nth-child(5)": {
          fontSize: "16px",
          color: "#111",
        },
      },
    },
  },
}));
const Listproducts = (props) => {
  const { listProduct } = props;
  const classes = useStyles();
  const isLoading = useSelector((state) => state.product.isLoading);
  const renderLazyCard = () => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push(
        <div className={classes.lazyCard} key={i}>
          <Skeleton animation={"wave"}></Skeleton>
          <Skeleton>
            <p>Lorem, ipsum.</p>
          </Skeleton>
          <Skeleton>
            <p>Lorem, ipsum dolor.</p>
          </Skeleton>
          <Skeleton>
            <p>1 Colour</p>
          </Skeleton>
          <Skeleton>
            <p>200000</p>
          </Skeleton>
        </div>
      );
    }
    return arr;
  };
  return (
    <>
      {isLoading && <div className={classes.root}>{renderLazyCard()}</div>}{" "}
      {!isLoading && (
        <motion.div layout className={classes.root}>
          {!isLoading &&
            listProduct?.map((product) => {
              return (
                <motion.div
                  layout
                  transition={{ duration: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className={classes.card}
                  key={product._id}
                >
                  <Link to={`/detail/${product?._id}`}>
                    <img src={product?.img} alt="nike" />
                    <p>{product?.name}</p>
                    <p>
                      {product?.gender} {product?.typeProduct}
                    </p>
                    <p>{product?.imgDetails.length} Colour</p>
                    <p>{product?.price.toLocaleString()}₫</p>
                  </Link>
                </motion.div>
              );
            })}
        </motion.div>
      )}
    </>
  );
};

export default Listproducts;
