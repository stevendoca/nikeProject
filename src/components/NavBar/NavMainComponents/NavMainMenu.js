import { Container, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";
import CustomiseMenu from "./CustomiseMenu";
import KidsMenu from "./KidsMenu";
import MenMenu from "./MenMenu";
import SaleMenu from "./SaleMenu";
import SNKRSMenu from "./SNKRSMenu";
import WomenMenu from "./WomenMenu";
import { Link } from "react-router-dom";

// const useStyles = makeStyles({
//   mainMenuContainer: {
//     flex: 1,
//     textAlign: "center",
//   },
//   mainMenu: {
//     backgroundColor: "transparent",
//     position: "absolute",
//     width: "100%",
//     height: 64,
//     top: 0,
//     left: 0,
//   },
//   mainMenuChoice: {
//     margin: "0 auto",
//     marginTop: 20,
//   },
// });
const useStyles = makeStyles((theme) => ({
  mainMenuContainer: {
    flexGrow: 1,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  // mainMenu: {
  //   backgroundColor: "transparent",
  //   position: "absolute",
  //   width: "100%",
  //   height: 64,
  //   top: 0,
  //   left: 0,
  // },
  // mainMenuChoice: {
  //   margin: "0 auto",
  //   marginTop: 20,
  // },
}));
const NavMainMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainMenuContainer}>
      <div>
        <div>
          <Hidden lgDown>
            <Container maxWidth="xl">
              <MenMenu />
              <WomenMenu />
              <KidsMenu />
              <CustomiseMenu />
              <SaleMenu />
              <SNKRSMenu />
            </Container>
          </Hidden>
          <Hidden xlUp>
            <MenMenu />
            <WomenMenu />
            <KidsMenu />
            <CustomiseMenu />
            <SaleMenu />
            <SNKRSMenu />
          </Hidden>
        </div>
      </div>
    </div>
  );
};

export default NavMainMenu;
