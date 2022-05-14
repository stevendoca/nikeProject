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
const Trending = (props) => {
  return (
    <div>
      <Item>{props.titleTrending}</Item>
      <div>
        <Grid container spacing={3}>
          {props.dataTrending.map((item, index) => {
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
