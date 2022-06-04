// nike app
import React from "react";
import { Card, CardActionArea, Container, Grid } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMedia from "@mui/material/CardMedia";
import Slider from "react-slick";
import { makeStyles } from "tss-react/mui";

//useStyles is a hook, so the first word must be "use"
const useStyles = makeStyles()((theme) => {
  return {
    root: {
      color: theme.palette.primary.main,
    },
    apply: {
      marginRight: theme.spacing(2),
    },
    image: {
      maxHeight: "100%",
      maxWidth: "100%",
    },
  };
});
const carouselImg = [
  "https://static.nike.com/a/images/f_auto/dpr_2.0/w_1792,c_limit/5d61a8a7-21bd-4850-8ef7-0947c58dfc19/nike-kids.png",
  "https://static.nike.com/a/images/f_auto/dpr_1.0/w_1229,c_limit/e04d1808-9792-46ba-bcbd-3b2302a40b31/nike-by-you-custom-shoes.jpg",
];
const Carousel = () => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container maxWidth="1000">
      <Slider {...settings}>
        {carouselImg?.map((item, index) => {
          return (
            <Card key={index}>
              <CardActionArea>
                <CardMedia
                  className={classes.image}
                  component="img"
                  image={item}
                />
              </CardActionArea>
            </Card>
          );
        })}
      </Slider>
    </Container>
  );
};

export default Carousel;
