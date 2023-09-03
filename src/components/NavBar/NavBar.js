import { Container, Divider, Hidden } from "@material-ui/core";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavInfo from "./infoNav";
import NavMain from "./NavMain";
import NavSub from "./NavSub";

const NavBar = () => {
  return (
    <div>
      <Hidden lgDown>
        <NavSub />
        <NavMain />
        <NavInfo />
      </Hidden>
      <Hidden xlUp>
        <NavSub />

        <Divider color="#FDA228" sx={{ height: 5, width: "92px" }} />
        <NavMain />
        <NavInfo />
      </Hidden>
      <Outlet />
    </div>
  );
};

export default NavBar;
