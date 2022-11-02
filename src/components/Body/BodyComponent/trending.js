import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeGenderTypeProduct } from "../../../features/product/productSlice";

const Item = styled(Paper)(() => ({
  fontSize: 24,
  marginBottom: 32,
  boxShadow: "none",
}));

const ContentLink = styled(Paper)(() => ({
  color: "black",
  textDecoration: "none",
}));

const TrendingContainer = styled(Paper)(() => ({
  height: 700,
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column-reverse",
  backgroundPosition: "center center",
}));

const TrendingName = styled(Paper)(() => ({
  color: "white",
  backgroundColor: "transparent",
  fontSize: 25,
  fontWeight: 400,
  marginBottom: 20,
  marginLeft: 30,
  boxShadow: "none",
}));

const ShopLink = styled(Paper)(() => ({
  color: "black",
  textDecoration: "none",
  margin: "0 8px 60px 30px",
  padding: "8px 28px",
  backgroundColor: "white",
  borderRadius: 20,
  fontSize: 16,
  textAlign: "center",
  "&:hover": {
    opacity: 0.8,
    transition: "all 0.75",
  },
}));
const dataTrending = [
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0/h_700,c_limit/3bd36415-c20f-4521-9391-f60fe8beef8c/nike-just-do-it.jpg",
    title: "LeBron 18 'Equation'",
    button: "Shop",
    gender: "male",
    typeProduct: "shoes",
  },
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0/h_700,c_limit/16416ae4-9d79-4614-be7b-c41d8541f56b/nike-just-do-it.png",
    title: "Sisterhood of Sport Collection",
    button: "Shop",
    gender: "female",
    typeProduct: "clothing",
  },
];
const titleTrending = "Trending";
const Trending = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobileTrending = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Item>{titleTrending}</Item>
      <div>
        <Grid container spacing={3}>
          {dataTrending.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <ContentLink href="#a">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/listProduct"
                    onClick={() => {
                      dispatch(
                        changeGenderTypeProduct({
                          gender: item.gender,
                          typeProduct: item.typeProduct,
                        })
                      );
                    }}
                  >
                    {!mobileTrending && (
                      <TrendingContainer
                        style={{
                          backgroundImage: `url(${item.img})`,
                        }}
                      >
                        <div>
                          <ShopLink>{item.button}</ShopLink>
                        </div>
                        <TrendingName>{item.title}</TrendingName>
                      </TrendingContainer>
                    )}
                    {mobileTrending && (
                      <TrendingContainer
                        style={{
                          backgroundImage: `url(${item.img})`,
                          height: "300px",
                        }}
                      >
                        <div>
                          <ShopLink>{item.button}</ShopLink>
                        </div>
                        <TrendingName>{item.title}</TrendingName>
                      </TrendingContainer>
                    )}
                  </Link>
                </ContentLink>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Trending;
