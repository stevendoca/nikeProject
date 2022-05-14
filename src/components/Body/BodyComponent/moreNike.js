import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(() => ({ fontSize: 24, marginBottom: 32 }));
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
const MoreNike = (props) => {
  return (
    <div>
      <Item>{props.titleMoreNike}</Item>
      <Grid container spacing={3}>
        {props.dataMoreNike.map((item, index) => {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <ContentLink>
                <TrendingContainer
                  style={{ backgroundImage: `url(${item.img})` }}
                >
                  <div>
                    <ShopLink>{item.titleButton}</ShopLink>
                  </div>
                </TrendingContainer>
              </ContentLink>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MoreNike;
