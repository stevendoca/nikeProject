import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  Grid,
  Hidden,
  Skeleton,
  Container,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    fontSize: 16,
  },
  productImage: {
    width: "100%",
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
}));

const ProductImage = ({ detailProduct, index }) => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  const isLoading = useSelector((state) => state.reducerURL.isLoading);
  let listLazyLoad = [];
  for (let i = 0; i < 6; i++) {
    listLazyLoad.push(
      <Grid item xs={6}>
        <Skeleton animation="wave">
          <img
            className={classes.productImage}
            src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.5/w_383,c_limit/fa49236e-bc0b-4194-996c-5148086aa5cf/air-zoom-pegasus-39-road-running-shoes-fRzz2h.png"
          />
        </Skeleton>
      </Grid>
    );
  }
  return (
    <div>
      <Hidden smDown>
        {" "}
        {""}{" "}
        {isLoading ? (
          <Grid container className={classes.productContainer} spacing={2}>
            {listLazyLoad}
          </Grid>
        ) : (
          <Grid container className={classes.productContainer} spacing={2}>
            {detailProduct.imgDetails[index].imgs.map((item, key) => {
              return (
                <img
                  className={classes.productImage}
                  src={item.img}
                  key={key}
                />
              );
            })}
          </Grid>
        )}
      </Hidden>
      <Hidden mdUp>
        <Container mdUp>
          <Slider {...settings}>
            {detailProduct.imgDetails[index].imgs.map((item, key) => {
              return (
                <Card className={classes.image} key={key}>
                  {isLoading ? (
                    <Skeleton>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={item.img}
                          title="Contemplative Reptile"
                        >
                          {""}
                        </CardMedia>
                      </CardActionArea>
                    </Skeleton>
                  ) : (
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        item={item.img}
                        title="Contemplative Reptile"
                      >
                        {""}
                      </CardMedia>
                    </CardActionArea>
                  )}
                </Card>
              );
            })}
          </Slider>
        </Container>
      </Hidden>
    </div>
  );
};

export default ProductImage;
