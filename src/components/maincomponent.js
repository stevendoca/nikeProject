import React from "react";
import Body from "./Body/body";

const Maincomponent = (props) => {
  return (
    <div>
      <Body
        titleMoreNike={props.titleMoreNike}
        dataMoreNike={props.dataMoreNike}
        merchMenu={props.merchMenu}
      />
    </div>
  );
};

export default Maincomponent;
