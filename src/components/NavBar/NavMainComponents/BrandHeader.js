import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  brandHeader: {
    position: "relative",
    background: "#f5f5f5",
    height: "36px",
    width: "100%",
    zIndex: 6,
    display: "flex",
    justifyContent: "space-between",
    padding: "0 36px 0 38px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  listMenu: {
    height: "100%",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    "& > li": {
      alignItems: "center",
      listStyle: "none",
      position: "relative",
      display: "flex",
      height: "100%",
    },
  },
  logo: {
    height: "100%",
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "12px",
  },
  submenu: {
    zIndex: 2,
    position: "absolute",
    minWidth: "240px",
    padding: "24px 24px 24px 16px",
    top: "100%",
    right: 0,
    borderRadius: "0 0 8px 8px",
    backgroundColor: "#fff",
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(-20px)",
    transition: "opacity .2s,visibility 0s linear .2s,transform .25s ease",
    "&.active": {
      opacity: 1,
      visibility: "visible",
      transform: "translateY(0)",
      transition: "opacity .2s,visibility 0s,transform .25s ease",
    },
  },
  titleMenu: {
    position: "relative",
    display: "flex",
    alightItem: "center",
  },
  listItemSubMenu: {
    listStyle: "none",
    padding: 0,
  },
  titleHover: {
    padding: "4px 8px",
    cursor: "pointer",
    color: "black",
    "&:hover": {
      color: "#757575",
    },
  },
  itemHover: {
    color: "#757575",
    fontSize: "14px !important",
    padding: "4px 8px",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
  },
  titleSubMenu: {
    cursor: "pointer",
    padding: "4px 8px",
    marginBottom: "12px !important",
  },
  bar: {
    padding: "4px",
    fontSize: "12px !important",
  },
}));

const dataList = [
  {
    title: "Help",
    link: "/",
    data: {
      title: "Help",
      content: [
        "Order Status",
        "Dispatch and Delivery",
        "Returns",
        "Contact Us",
        "Privacy Policy",
        "Terms of Sale",
        "Terms of Use",
        "Send Us Feedback",
      ],
    },
  },
  {
    title: "Join Us",
    link: "/signup",
  },
  {
    title: "Sign in",
    link: "/login",
  },
];
const BrandHeader = () => {
  return <div>BrandHeader</div>;
};

export default BrandHeader;
