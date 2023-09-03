import { Grid, makeStyles } from "@material-ui/core";
import { Box, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilterBarMobile from "./FilterBarMobile";
import LeftPanel from "./LeftPanel";
import Listproducts from "./Listproducts";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 48px",
  },
  rootLayOut: {
    width: "80%",
    margin: "0 auto",
  },
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
  ex: {
    width: "100%",
  },
}));

const ListproductMain = (props) => {
  const { open, filter, setOpen, setFilter, listProduct, productsLength } =
    props;
  const classes = useStyles();
  const navigate = useNavigate();
  const menu = [
    "Shoes",
    "Sports Bras",
    "Tops & T-Shirts",
    "Hoodies & SweathiAts",
    "Jackets & Gilets",
    "Trousers & Tights",
    "Shorts",
    "Compression & Baseslayer",
    "Tracksuits",
    "Jumpsuits & Rompers",
    "Skirts & Dresses",
    "Socks",
    "Accessories & Equipment",
  ];
  const colors = [
    "purple",
    "black",
    "red",
    "orange",
    "blue",
    "white",
    "brown",
    "green",
    "yellow",
    "grey",
    "pink",
  ];
  const brands = [
    "Nike Sportswear",
    "Jordan",
    "Nike By You",
    "NikeLab",
    "ACG",
    "Nike Pro",
    "Nike",
  ];
  const sports = [
    "Lifestyle",
    "Running",
    "Training & Gym",
    "Basketball",
    "American Football",
    "Football",
    "Yoga",
    "Golf",
    "Skateboarding",
    "Tenis",
    "Athlete",
    "Waking",
    "Outdoor",
    "Volleyball",
    "Hiking",
    "Dance",
  ];
  const athletes = [
    "LeBron James",
    "Kevin Durant",
    "Kyrie Irving",
    "Paul George",
    "Tiger Woods",
    "Cristiano Ronaldo",
    "Serena Williams",
    "Rafael Nadal",
    "Naomi Osaka",
    "Kylian Mbappe",
    "RussellWestbrrok",
    "Carmelo Anthony",
    "Giannis Antetokounmpo",
    "Nyjah Huston",
  ];
  const bestfor = [
    "Warm Weather",
    "Wet Weather Conditions",
    "Cold Weather",
    "Low-Impact Activities",
    "High-Impact Activities",
  ];
  const collaborator = ["Patta", "sacai", "Off-White", "Gyakusou"];
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
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <FilterBarMobile
          className={classes.ex}
          filter={filter}
          setFiltter={setFilter}
          productsLength={productsLength}
          colors={colors}
          brands={brands}
          sports={sports}
          bestfor={bestfor}
          athletes={athletes}
          collaborator={collaborator}
          menu={menu}
        />
      </Box>
      <Box sx={{ display: "flex" }} className={classes.root}>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {open && (
            <LeftPanel
              filter={filter}
              setFilter={setFilter}
              menu={menu}
              colors={colors}
              open={open}
              brands={brands}
              sports={sports}
              athletes={athletes}
              bestfor={bestfor}
              collaborator={collaborator}
            />
          )}
        </Box>

        <Listproducts listProduct={listProduct} />
      </Box>
    </div>
  );
};

export default ListproductMain;
