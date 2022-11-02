import { Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  ListProductMainContainer: {
    padding: "0 40px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  ProductNotFound: {
    fontSize: 28,
    textAlign: "center",
    color: "#111",
  },
  ProductLink: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
    "&:hover": {
      "& $ProductDetailColorway": {
        display: "none",
      },
      "& $ProductColorway": {
        display: "block",
      },
    },
  },
  ProductImage: {
    width: "100%",
    height: "300px",
    [theme.breakpoints.down("xs")]: {
      height: "150px",
      width: "100%",
    },
  },
  ProductDetailColorway: {
    lineHeight: 1.75,
    display: "block",
  },
  ProductDetail: {
    lineHeight: 1.75,
    display: "block",
  },
  ProductColorway: {
    display: "none",
  },
  ProductColorwayImage: {
    width: 36,
    height: 36,
  },
  Message: {
    paddingTop: 12,
    color: "#fa5400",
  },
  ProductType: {
    color: "#757575",
  },
  Price: {
    paddingTop: 10,
  },
}));
const ListproductMain = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const filterColor = useSelector((state) => state.product.filterColor);
  const filterSize = useSelector((state) => state.product.filterSize);
  const dataSearchInput = useSelector((state) => state.product.dataSearchInput);
  const [imgURL, setImgURL] = useState({ URL: "", index: null });

  const isLoading = useSelector((state) => state.product.isLoading);
  let listLazyLoad = [];
  for (let i = 0; i < 15; i++) {
    listLazyLoad.push(
      <Grid item xs={6} md={4}>
        <span className={classes.ProductLink}>
          <Skeleton animation="wave">
            <img
              className={classes.ProductImage}
              src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/13f77ac7-f477-4120-baac-bbe0467ccf3a/custom-kd-13-music-by-you.jpg"
            />
          </Skeleton>
          <div className={classes.ProductDetailColorway}>
            <Skeleton animation="wave" width="100%">
              Product Name
            </Skeleton>
            <div className={classes.ProductType}>
              <Skeleton animation="wave" width="100%">
                <div>Basketball Shoes </div>
              </Skeleton>
              <Skeleton animation="wave" width="30%">
                <div>1 Color</div>
              </Skeleton>
            </div>
          </div>
          <Skeleton animation="wave" width="50%">
            <div className={classes.Price}>2.000.000</div>
          </Skeleton>
        </span>
      </Grid>
    );
  }

  return (
    <div>
      {isLoading ? (
        <Grid
          container
          spacing={2}
          className={classes.ListProductMainContainer}
        >
          {listLazyLoad}
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          className={classes.ListProductMainContainer}
        >
          {props.data.length === 0 &&
            (filterColor.length > 0 ||
              filterSize.length > 0 ||
              dataSearchInput.length > 0) &&
            isLoading === false && (
              <Grid item xs={12}>
                <div className={classes.ProductNotFound}>
                  Sorry, we can't find your product
                </div>
              </Grid>
            )}

          {props.data.map((item, index) => {
            if (item.status === 1) {
              return (
                <Grid item xs={6} md={4} key={index}>
                  <span className={classes.ProductLink}>
                    <img
                      className={classes.ProductImage}
                      src={imgURL.index === index ? imgURL.URL : item.img}
                      onClick={() => {
                        navigate(`/detailproduct/${item._id}`);
                      }}
                      alt="specific item img"
                    />
                    <div className={classes.Message}></div>
                    <div className={classes.ProductDetailColorway}>
                      <div className={classes.ProductName}>{item.name}</div>
                      <div className={classes.ProductType}>
                        <div>{item.message}</div>
                        <div>{item.color} Color</div>
                      </div>
                    </div>
                    <div className={classes.ProductColorway}>
                      {item.imgDetails.map((item1, index) => {
                        return (
                          <img
                            key={index}
                            className={classes.ProductColorwayImage}
                            src={item1.imgs[0].img}
                            onMouseOver={() =>
                              setImgURL({ URL: item1.imgs[0].img, index })
                            }
                          />
                        );
                      })}
                    </div>
                    <div className={classes.Price}>
                      {item.price.toLocaleString()}d
                    </div>
                  </span>
                </Grid>
              );
            }
          })}
        </Grid>
      )}
    </div>
  );
};

export default ListproductMain;
