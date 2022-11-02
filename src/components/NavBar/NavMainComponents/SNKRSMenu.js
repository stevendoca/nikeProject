import { makeStyles } from "@mui/styles";
import React from "react";

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
});
const SNKRSMenu = () => {
  const classes = useStyles();
  return (
    <span>
      <a href="#a" className={classes.mainMenuChoiceLink}>
        SNKRS
      </a>
    </span>
  );
};

export default SNKRSMenu;
