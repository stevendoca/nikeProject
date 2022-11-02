import { Hidden, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import React from "react";
import FooterComponents from "./FooterComponents";
const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: "black",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 8px 0",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "40px 20px 0",
    },
    [theme.breakpoints.up("md")]: {
      padding: "40px 40px 0",
    },
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <Hidden lgDown>
        <Container maxWidth="lg">
          <FooterComponents />
        </Container>
      </Hidden>
      <Hidden lgUp>
        <FooterComponents />
      </Hidden>
    </div>
  );
};

export default Footer;
