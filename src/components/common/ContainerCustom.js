import React from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 48px",
    [theme.breakpoints.down("md")]: {
      margin: "0 24px",
    },
    "&.mgb": {
      marginBottom: "84px",
    },
    "&.mgt": {
      marginTop: "84px",
    },
  },
}));
const ContainerCustom = (props) => {
  const { mgt, mgb } = props;
  const classes = useStyles();
  return (
    <div className={`${classes.root}${mgt ? " mgt" : ""}${mgb ? " mgb" : ""}`}>
      {props.children}
    </div>
  );
};

export default ContainerCustom;
