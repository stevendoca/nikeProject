import React from "react";
import Body from "./Body/body";

const Maincomponent = (props) => {
  return (
    <div>
      <Body
        carouselImg={props.carouselImg}
        titleTrending={props.titleTrending}
        dataTrending={props.dataTrending}
        titleMoreNike={props.titleMoreNike}
        dataMoreNike={props.dataMoreNike}
        merchMenu={props.merchMenu}
      />
    </div>
  );
};

export default Maincomponent;
