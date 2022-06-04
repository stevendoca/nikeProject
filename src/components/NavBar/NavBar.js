import { Container, Hidden } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router-dom";
import NavSub from "./NavSub";

const NavBar = () => {
  return (
    <div>
      <Hidden lgDown>
        <Container maxWidth="xl">
          <NavSub />
        </Container>
      </Hidden>
      <Hidden xlUp>
        <NavSub />
      </Hidden>
      <Outlet />
    </div>
  );
};

export default NavBar;
