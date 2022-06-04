import React from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";

const Item = styled(Paper)(() => ({
  fontSize: 24,
  marginBottom: 32,
}));

const ContentLink = styled(Paper)(() => ({
  color: "black",
  textDecoration: "none",
}));

const TrendingContainer = styled(Paper)(() => ({
  height: 700,
  display: "flex",
  backgroundPosition: "center center",
  alignItems: "flex-end",
}));

const TrendingName = styled(Paper)(() => ({
  color: "white",
  fontSize: 25,
  fontWeight: 400,
  marginBottom: 30,
  backgroundColor: "transparent",
  border: "none",
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
const dataTrending = [
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0/h_700,c_limit/3bd36415-c20f-4521-9391-f60fe8beef8c/nike-just-do-it.jpg",
    title: "LeBron 18 'Equation'",
    button: "Shop",
  },
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0/h_700,c_limit/16416ae4-9d79-4614-be7b-c41d8541f56b/nike-just-do-it.png",
    title: "Sisterhood of Sport Collection",
    button: "Shop",
  },
];
const titleTrending = "Trending";
const Trending = () => {
  return (
    <div>
      <Item>{titleTrending}</Item>
      <div>
        <Grid container spacing={3}>
          {dataTrending.map((item, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <ContentLink href="#a">
                  <TrendingContainer
                    style={{ backgroundImage: `url(${item.img})` }}
                  >
                    <TrendingName>{item.title}</TrendingName>
                    <TrendingName>
                      <ShopLink>{item.button}</ShopLink>
                    </TrendingName>
                  </TrendingContainer>
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
