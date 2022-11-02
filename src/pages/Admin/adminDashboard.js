import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper } from "@mui/material";
import Chart from "../../components/Admin/DashBoardComponents/chart";
import Deposit from "../../components/Admin/DashBoardComponents/deposit";
import Order from "../../components/Admin/DashBoardComponents/order";
const useStyles = makeStyles({
  paper: {
    // padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
});
const DashBoard = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposit />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Order />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashBoard;
