import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import ContainerCustom from "../../common/ContainerCustom";
import SortButton from "./SortButton";

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    height: "40px",
  },
  root: {
    zIndex: 3,
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    // position: "fixed",
    top: 0,
    left: 0,
    // padding: "0 48px",
    transition: "transform .15s ease",
    // transform: "translateY(60px)",
    transform: "translateY(-25px)",

    [theme.breakpoints.down("md")]: {
      padding: "0 24px",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "left",
    },
    "& h1": {
      color: "#111",
      fontSize: "24px",
      fontWeight: "normal",
      transition: "transform .15s",
      transformOrigin: "left",
      [theme.breakpoints.down("md")]: {
        fontSize: "20px",
      },
    },
    "&.fixed": {
      position: "fixed",
      top: 0,
      left: 0,
      padding: "0 48px",
      transition: "transform .15s ease",
      [theme.breakpoints.down("md")]: {
        padding: "0 24px",
      },
      "& h1": {
        transform: "scale(.75)",
      },
      "&.show": {
        transform: "translateY(60px)",
      },
    },
  },
  IconFilter: {
    marginLeft: 8,
    width: 16,
    height: 16,
  },
  toolBox: {
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hideButton: {
    cursor: "pointer",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    paddingRight: "25px",
    color: "#111",
    "& span": {
      paddingRight: "10px",
    },
  },
}));
const FilterBar = (props) => {
  const { sort, setSort, setOpen, open, productsLength, title } = props;
  const [direction, setDirection] = useState("");
  const classes = useStyles();
  const filterBar = useRef(null);
  return (
    <ContainerCustom mgt={true}>
      <div ref={filterBar} className={classes.filterContainer}>
        <div className={classes.root}>
          <h1>
            {title} <span>{productsLength}</span>
          </h1>
          <div className={classes.toolBox}>
            <button className={classes.hideButton} onClick={setOpen}>
              <span>{open ? "Hide" : "Show"} filters</span>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/filter-1739026-1477153.png"
                className={classes.IconFilter}
                alt=""
              />
            </button>
            <SortButton sort={sort} setSort={setSort} />
          </div>
        </div>
      </div>
    </ContainerCustom>
  );
};

export default FilterBar;
