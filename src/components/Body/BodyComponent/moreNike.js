import React from "react";
import { styled } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeGenderTypeProduct } from "../../../features/product/productSlice";

const Item = styled(Paper)(() => ({
  fontSize: 24,
  marginBottom: 32,
  boxShadow: "none",
}));
const TrendingContainer = styled(Paper)(() => ({
  height: 540,
  display: "flex",
  backgroundPosition: "center top",
  alignItems: "flex-end",
  backgroundRepeat: "no-repeat",
}));
const ContentLink = styled(Paper)(() => ({
  color: "black",
  textDecoration: "none",
}));
const ShopLink = styled(Paper)(() => ({
  color: "black",
  textDecoration: "none",
  margin: "0 8px 8px 0",
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
const titleMoreNike = "MoreNike";

const dataMoreNike = [
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_2.0/w_587,c_limit/a8c6d7f6-6d2f-46af-b9bd-8be808dda1cf/nike-just-do-it.jpg",
    titleButton: "Men's",
    gender: "male",
    typeProduct: "clothing",
  },
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_2.0/w_587,c_limit/595336c7-94a3-4a5e-ad6d-65a1f6ae82da/nike-just-do-it.jpg",
    titleButton: "Women's",
    gender: "female",
    typeProduct: "clothing",
  },
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_2.0/w_587,c_limit/d0ca9b63-2a15-41eb-8c86-8d121987f715/nike-just-do-it.jpg",
    titleButton: "Kid's",
    gender: "kid",
    typeProduct: "clothing",
  },
];
const MoreNike = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const mobileTrending = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Item>{titleMoreNike}</Item>
      <Grid container spacing={3}>
        {dataMoreNike.map((item, index) => {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Link
                to="/listProduct"
                onClick={() => {
                  dispatch(
                    changeGenderTypeProduct({
                      gender: item.gender,
                      typeProduct: item.typeProduct,
                    })
                  );
                }}
                style={{ textDecoration: "none" }}
              >
                <ContentLink>
                  {!mobileTrending && (
                    <TrendingContainer
                      style={{
                        backgroundImage: `url(${item.img})`,
                      }}
                    >
                      <div style={{ padding: 40 }}>
                        <ShopLink>{item.titleButton}</ShopLink>
                      </div>
                    </TrendingContainer>
                  )}
                  {mobileTrending && (
                    <TrendingContainer
                      style={{
                        backgroundImage: `url(${item.img})`,
                        height: "305px",
                      }}
                    >
                      <div style={{ padding: 20 }}>
                        <ShopLink>{item.titleButton}</ShopLink>
                      </div>
                    </TrendingContainer>
                  )}
                </ContentLink>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MoreNike;
