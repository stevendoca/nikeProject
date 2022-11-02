import React from "react";
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
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    padding: "0 44px",
    fontSize: 16,
    lineHeight: 1.7,
    [theme.breakpoints.down("md")]: {
      padding: "0 8px",
    },
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
  console.log("detailProduct", detailProduct);

  console.log("index", index);
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  const isLoading = useSelector((state) => state.product.isLoading);
  let listLazyLoad = [];
  for (let i = 0; i < 6; i++) {
    //should write a seperate function
    listLazyLoad.push(
      <Grid item xs={6} key={i}>
        <Skeleton animation="wave">
          <img
            className={classes.productImage}
            src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.5/w_383,c_limit/fa49236e-bc0b-4194-996c-5148086aa5cf/air-zoom-pegasus-39-road-running-shoes-fRzz2h.png"
            alt="item"
          />
        </Skeleton>
      </Grid>
    );
  }
  return (
    <div>
      <Hidden mdDown>
        {isLoading ? (
          <Grid container className={classes.productContainer} spacing={2}>
            {listLazyLoad}
          </Grid>
        ) : (
          <Grid container className={classes.productContainer} spacing={2}>
            {detailProduct.imgDetails[index].imgs.map((item, key) => {
              return (
                <Grid item sx={12} md={6} key={key}>
                  <img className={classes.productImage} src={item.img} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Hidden>
      <Hidden mdUp>
        <Container maxWidth="xl">
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
                          height="450"
                          title="Contemplative Reptile"
                        />
                      </CardActionArea>
                    </Skeleton>
                  ) : (
                    <CardActionArea>
                      <Hidden mdUp>
                        <CardMedia
                          component="img"
                          image={item.img}
                          height="450"
                          title="Contemplative Reptile"
                        />
                      </Hidden>
                      <Hidden mdDown>
                        <CardMedia
                          component="img"
                          image={item.img}
                          height="750"
                          title="Contemplative Reptile"
                        />
                      </Hidden>
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
