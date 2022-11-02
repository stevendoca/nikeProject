import { Container, CssBaseline } from "@mui/material";
import React, { Fragment } from "react";
import Body from "./Body/body";
import Footer from "./Footer/Footer";

const Maincomponent = (props) => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Body
          titleMoreNike={props.titleMoreNike}
          dataMoreNike={props.dataMoreNike}
          merchMenu={props.merchMenu}
        />
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Maincomponent;
