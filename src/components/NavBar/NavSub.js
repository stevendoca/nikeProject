import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import SignIn from "./NavMainComponents/SignIn";
const useStyles = makeStyles({
  nav: {
    backgroundColor: "white",
    color: "black",
    paddingLeft: 36,
    paddingRight: 38,
    position: "relative",
    boxShadow: "none",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
    zIndex: 1101,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    padding: 0,
    minHeight: 36,
  },
  jordan: {
    height: 24,
    width: 24,
    "&:hover": {
      opacity: 0.7,
    },
  },
  linkJordan: {
    padding: "0 12px",
    height: 34,
    display: "flex",
    alignItems: "center",
  },
  nav1: {
    height: 34,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  nav1Menu: {
    margin: "0 12px",
    textDecoration: "none",
    color: "black",
    fontSize: 12,
    "&:hover": {
      color: "grey",
    },
    cursor: "pointer",
  },
  helpMenuContainer: {
    padding: "24px 24px 24px 18px",
    position: "absolute",
    right: 130,
    zIndex: 10,
    width: 200,
    fontSize: 14,
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "white",
  },
  helpMenuHeader: {
    padding: "4px 8px",
    marginBottom: 12,
    fontSize: 16,
    cursor: "pointer",
  },
  helpMenuItem: {
    color: "#757575",
    padding: "4px 8px",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
  },
});
const NavSub = () => {
  const classes = useStyles();
  const [helpMenu, setHelpMenu] = useState(false);
  return (
    <AppBar className={classes.nav} id="navsub">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}></Typography>
        <div className={classes.nav1}>
          <SignIn />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavSub;
