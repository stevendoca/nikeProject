import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./title";
import Link from "@material-ui/core/Link";

const preventDefault = (event) => {
  event.preventDefault();
};
const useStyles = makeStyles({ depositContext: { flex: 1 } });
const Deposit = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Today Incoming</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {" "}
        on July 10,2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Details
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposit;
