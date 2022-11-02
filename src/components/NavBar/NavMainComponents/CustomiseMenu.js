import React from "react";
import { makeStyles } from "@mui/styles";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "animate.css";
const useStyles = makeStyles({
  mainMenuChoiceLink: {
    fontSize: 16,
    height: 54,
    padding: "19px 12px",
    marginTop: 52,
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "black",
      borderBottom: "2px black solid",
    },
  },
  customiseChoiceContainer: {
    position: "absolute",
    left: 0,
    width: "100%",
    display: "none",
    alignItems: "flex-start",
    paddingLeft: 255,
    padding: "16px 40px 20px 40px",
    top: 60,
    backgroundColor: "white",
  },
  Choice: {
    padding: "16px 8px 0px",
    display: "inline-block",
    textAlign: "left",
    width: 210,
  },
  menuTitle: {
    display: "block",
    marginBottom: 14,
    fontSize: 16,
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "black",
    },
  },
  menuItem: {
    display: "block",
    color: "#757575",
    marginBottom: 6,
    fontSize: 14,
    textDecoration: "none",
    lineHeight: 1.428571,
    "&:hover": {
      color: "black",
    },
  },
});
const CustomiseMenu = () => {
  const classes = useStyles();
  const openCustomise = () => {
    let underline = document.getElementById("Customise");
    ReactDOM.findDOMNode(underline).style.borderBottom = "2px black solid";
    let container = document.getElementById("customiseContainer");
    ReactDOM.findDOMNode(container).style.display = "flex";
  };
  const closeCustomise = () => {
    let underline = document.getElementById("Customise");
    ReactDOM.findDOMNode(underline).style.border = "none";
    let container = document.getElementById("customiseContainer");
    ReactDOM.findDOMNode(container).style.display = "none";
  };
  const openFallBack = () => {
    let fallBack = document.getElementById("fallback");
    ReactDOM.findDOMNode(fallBack).style.backgroundColor = "rgba(0,0,0,0.4)";
    ReactDOM.findDOMNode(fallBack).style.zIndex = "2";
  };
  const closeFallBack = () => {
    let fallback = document.getElementById("fallback");
    ReactDOM.findDOMNode(fallback).style.backgroundColor = "transparent";
    ReactDOM.findDOMNode(fallback).style.zIndex = "-1";
  };
  return (
    <span
      onMouseEnter={() => {
        openCustomise();
        openFallBack();
      }}
      onMouseLeave={() => {
        closeCustomise();
        closeFallBack();
      }}
    >
      <Link
        to="/customShoe"
        id="Customise"
        className={classes.mainMenuChoiceLink}
      >
        Customize
      </Link>
      <div id="customiseContainer" className={classes.customiseChoiceContainer}>
        <div className="animate__animated animate__fadeInDown">
          <div className={classes.Choice}>
            <a href="#a" className={classes.menuTitle}>
              Featured
            </a>
            <a href="#" className={classes.menuItem}>
              Nike By Your Release
            </a>
          </div>
        </div>
        <div className="animate__animated animate__fadeInDown">
          <div className={classes.Choice}>
            <a href="#a" className={classes.menuTitle}>
              Nike By You
            </a>
            <a href="#" className={classes.menuItem}>
              Men
            </a>
            <a href="#" className={classes.menuItem}>
              Women
            </a>
          </div>
        </div>
        <div className="animate__animated animate__fadeInDown">
          <div className={classes.Choice}>
            <a href="#a" className={classes.menuTitle}>
              By Sport
            </a>
            <a href="#" className={classes.menuItem}>
              Lifestyle
            </a>
            <a href="#" className={classes.menuItem}>
              Running
            </a>
            <a href="#" className={classes.menuItem}>
              Basketball
            </a>
            <a href="#" className={classes.menuItem}>
              Gym and Training
            </a>
            <a href="#" className={classes.menuItem}>
              Football
            </a>
            <a href="#" className={classes.menuItem}>
              Baseball
            </a>
            <a href="#" className={classes.menuItem}>
              Skateboarding
            </a>
          </div>
        </div>
        <div className="animate__animated animate__fadeInDown">
          <div className={classes.Choice}>
            <a href="#a" className={classes.menuTitle}>
              Icons
            </a>
            <a href="#" className={classes.menuItem}>
              Air Max
            </a>
            <a href="#" className={classes.menuItem}>
              Air Force 1
            </a>
            <a href="#" className={classes.menuItem}>
              Metcon
            </a>
            <a href="#" className={classes.menuItem}>
              Huaranche
            </a>
            <a href="#" className={classes.menuItem}>
              Free
            </a>
            <a href="#" className={classes.menuItem}>
              Flyknit
            </a>
          </div>
        </div>
      </div>
    </span>
  );
};

export default CustomiseMenu;
