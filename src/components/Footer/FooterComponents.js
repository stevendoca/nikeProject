import { Divider, Grid, Hidden } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  GridContainer: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    marginBottom: 16,
  },
  footerItem: {
    color: "white",
    display: "block",
    marginBottom: 5,
    fontSize: 14,
    textDecoration: "none",
    lineHeight: 1.9,
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
      paddingBottom: "0.5rem",
    },
    // [theme.breakpoints.down("md")]: {
    //   display: "none",
    // },
  },
  footerSubItem: {
    color: "#7e7e7e",
    display: "block",
    marginBottom: 5,
    fontSize: 12,
    textDecoration: "none",
    lineHeight: 1.9,
    "&:hover": {
      color: "white",
    },
  },
  socialIconContainer: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      marginTop: 16,
    },
  },
  socialLinkIcon: {
    backgroundColor: "white",
    color: "black",
    borderRadius: "50%",
    height: 30,
    width: 30,
    margin: "0 0 0 16px",
    [theme.breakpoints.down("xs")]: {
      margin: "0 16px 0 0",
    },
  },
  Button: {
    float: "right",
  },
  hr: {
    border: "none",
    borderTop: "1px grey solid",
  },
  Col2SubMenu: {
    marginTop: 20,
  },
  Icon: {
    color: "white",
  },
  SubFooterContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },

    borderTop: "1px #222 solid",
  },
  subFooterCanada: {
    color: "white",
    fontSize: 10,
    margin: "0 8px 0",
  },
  subFooterItemContainer: {
    float: "right",
    padding: "10px",
  },
  subFooterItem: {
    color: "#7e7e7e",
    fontSize: 10,
    margin: "0 10px 0",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  subFooterCol2: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
    },
  },
}));
const FooterComponents = () => {
  const classes = useStyles();
  const [buttonHelp, setButtonHelp] = useState(false);
  const [buttonAbout, setButtonAbout] = useState(false);
  return (
    <div>
      <Grid container spacing={2} className={classes.GridContainer}>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <a href="#a" className={classes.footerItem}>
                <b>FIND A STORE</b>
              </a>
              <a href="#a" className={classes.footerItem}>
                <b>BECOME A MEMBER</b>
              </a>
              <a href="#a" className={classes.footerItem}>
                <b>SIGN UP FOR EMAIL</b>
              </a>
              <a href="#a" className={classes.footerItem}>
                <b>SEND US FEEDBACK</b>
              </a>
            </Grid>
            {/* Rendering for desktop */}
            <Hidden smDown>
              <Grid item sm={4} md={3}>
                <a href="#a" className={classes.footerItem}>
                  <b>GET HELP</b>
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Order Status
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Delivery
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Returns
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Payment Options
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Contact Us
                </a>
              </Grid>
              <Grid item sm={4} md={3}>
                <a href="#a" className={classes.footerItem}>
                  <b>ABOUT NIKE</b>
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  News
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Careers
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Investors
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Sustainabilitys
                </a>
              </Grid>
            </Hidden>
            <Hidden smUp>
              <Grid item xs={12} className={classes.col2Mobile}>
                <Divider sx={{ bgcolor: "#A9A9A9", borderBottomWidth: 0.5 }} />
                <a
                  href="#a"
                  className={classes.footerItem}
                  onClick={() => {
                    setButtonHelp((prevState) => !prevState);
                    setButtonAbout(false);
                  }}
                  style={{ paddingTop: 20 }}
                >
                  {" "}
                  GET HELP{" "}
                  {!buttonHelp && <AddIcon className={classes.Button} />}
                  {buttonHelp && <RemoveIcon className={classes.Button} />}
                </a>
                {buttonHelp && (
                  <div className={classes.Col2SubMenu}>
                    <a href="#a" className={classes.footerSubItem}>
                      Order Status
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Delivery
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Returns
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Payment Options
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Contact Us
                    </a>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} className={classes.col2Mobile}>
                <Divider />
                <a
                  href="#a"
                  className={classes.footerItem}
                  onClick={() => {
                    setButtonAbout((prevState) => !prevState);
                    setButtonHelp(false);
                  }}
                >
                  <b>
                    ABOUT NIKE{" "}
                    {!buttonAbout && <AddIcon className={classes.Button} />}{" "}
                    {buttonAbout && <RemoveIcon className={classes.Button} />}
                  </b>
                </a>
                {buttonAbout && (
                  <div className={classes.Col2SubMenu}>
                    <a href="#a" className={classes.footerSubItem}>
                      News
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Careers
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Investor
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Sustainability
                    </a>
                  </div>
                )}
              </Grid>
            </Hidden>
            {/* Empty Column */}
            <Hidden smDown>
              <Grid item md={3}></Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.socialIconContainer}>
          <a href="#a">
            <TwitterIcon className={classes.socialLinkIcon} />
          </a>
          <a href="#a">
            <FacebookOutlinedIcon className={classes.socialLinkIcon} />
          </a>
          <a href="#a">
            <YouTubeIcon className={classes.socialLinkIcon} />
          </a>
          <a href="#a">
            <InstagramIcon className={classes.socialLinkIcon} />
          </a>
        </Grid>
      </Grid>
      {/* Sub-Footer */}
      <Grid container spacing={2} className={classes.SubFooterContainer}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} alignItems="flex-end">
            <Hidden xsDown>
              <Grid item xs={12}>
                <LocationOnIcon className={classes.Icon} />
                <span className={classes.subFooterCanada}>Canada</span>
                <span className={classes.subFooterItem}>
                  {" "}
                  © 2022 Nike, Inc. All Rights Reserved
                </span>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.subFooterCol2}>
          <Grid container spacing={2}>
            <Hidden smDown>
              <Grid item sm={12}>
                <div className={classes.subFooterItemContainer}>
                  <span className={classes.subFooterItem}>Guildes</span>
                  <span className={classes.subFooterItem}>Term of Sales</span>
                  <span className={classes.subFooterItem}>Term of Use</span>
                  <span className={classes.subFooterItem}>
                    Nike Privacy Policy
                  </span>
                </div>
              </Grid>
            </Hidden>
            <Hidden smUp>
              <div className={classes.subFooterItemContainer}>
                <Grid item xs={12} sm={3}>
                  <span className={classes.subFooterItem}>Guides</span>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <span className={classes.subFooterItem}>Term of Sales</span>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <span className={classes.subFooterItem}>Term of Use</span>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <span className={classes.subFooterItem}>
                    Nike Privacy Policy
                  </span>
                </Grid>
              </div>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default FooterComponents;
