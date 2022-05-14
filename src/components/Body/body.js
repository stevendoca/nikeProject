import React from "react";
import styled from "styled-components";
import { makeStyles } from "tss-react/mui";

import Carousel from "./BodyComponent/carousel";
import MerchMenu from "./BodyComponent/merchMenu";
import MoreNike from "./BodyComponent/moreNike";
import ProductScroll from "./BodyComponent/productScroll";
import Trending from "./BodyComponent/trending";

const Div = styled.div`
  margin-top: 84px;
`;
const useStyles = makeStyles()((theme) => {
  return {
    bodyComponent: {
      marginTop: 84,
    },
    body: {
      padding: "0 44px 50px",
    },
  };
});
const Body = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <div className={classes.bodyComponent}>
        <Div>
          <Carousel carouselImg={props.carouselImg} />
        </Div>
      </div>
      <div className={classes.bodyComponent}>
        <Div>
          <Trending dataTrending={props.dataTrending} />
        </Div>
      </div>
      <div className={classes.bodyComponent}>
        <Div>
          <MoreNike
            titleMoreNike={props.titleMoreNike}
            dataMoreNike={props.dataMoreNike}
          />
        </Div>
      </div>
      <div className={classes.bodyComponent}>
        <Div>
          <ProductScroll />
        </Div>
      </div>
      <div className={classes.bodyComponent}>
        <Div>
          <MerchMenu merch={props.merchMenu} />
        </Div>
      </div>
    </div>
  );
};

export default Body;
