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
const Carousel = (props) => {
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
        {props.carouselImg?.map((item, index) => {
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
