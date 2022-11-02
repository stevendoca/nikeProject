import { Container, Divider, Hidden } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router-dom";
import NavInfo from "./infoNav";
import NavMain from "./NavMain";
import NavSub from "./NavSub";

const NavBar = () => {
  return (
    <div>
      <Hidden lgDown>
        <Container maxWidth="xl">
          <NavSub />
          <NavMain />
          <NavInfo />
        </Container>
      </Hidden>
      <Hidden xlUp>
        <NavSub />
        {/* <Divider color="#FDA228" sx={{ height: 12, width: "92px" }} />
        <p>hi</p> */}
        <NavMain />
        <NavInfo />
      </Hidden>
      <Outlet />
    </div>
  );
};

export default NavBar;
