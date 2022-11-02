import { Container, Hidden } from "@mui/material";
import React from "react";
import { Route } from "react-router-dom";
import { Component } from "react";
import NavMain from "../components/NavBar/NavMain";
import NavSub from "../components/NavBar/NavSub";

const HomeLayout = (props) => {
  return (
    <React.Fragment>
      <Hidden lgDown>
        <Container maxWidth="xl">
          <NavSub />
          <NavMain />
          {/* Still missing NavMain */}
          {/* Still missing NavMain */}
          {/* Still missing NavMain */}
          {/* Still missing NavMain */}
          {/* Still missing NavMain */}
        </Container>
      </Hidden>
      <Hidden xlUp>
        <NavSub />
        <NavMain />
      </Hidden>
      {props.children}
    </React.Fragment>
  );
};
const HomeTemplate = (props) => {
  return (
    <div>
      (
      <Route
        {...props}
        render={(propsComponent) => (
          <HomeLayout>
            <Component {...propsComponent} />
          </HomeLayout>
        )}
      />
      )
    </div>
  );
};

export default HomeTemplate;
