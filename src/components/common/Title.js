import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "24px",
    [theme.breakpoints.down("md")]: {
      paddingBottom: "13px",
    },
    "& h2": {
      margin: 0,
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: "28px",
      [theme.breakpoints.down("md")]: {
        marginBottom: "24px",
      },
    },
  },
}));
const Title = (props) => {
  const { title } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
