import { CssBaseline, Grid, makeStyles, Paper } from "@material-ui/core";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import CollapsibleTable from "../../components/Admin/collapsibleTable";
import CreateUser from "../../components/Admin/createUser";
import Chart from "../../components/Admin/DashBoardComponents/chart";
import Deposit from "../../components/Admin/DashBoardComponents/deposit";
import Order from "../../components/Admin/DashBoardComponents/order";
import AdminMenu from "../../components/Admin/LayoutComponent/adminMenu";
import AdminMenuSecond from "../../components/Admin/LayoutComponent/adminMenuSecond";
import Box from "@mui/material/Box";
import AdminMenuFinal from "../../components/Admin/LayoutComponent/adminMenuFinal";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 280,
  },

  content: {
    flexGrow: 1,
    height: "105vh",
    overflow: "auto",
    marginTop: "50px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box display="flex">
          <AdminMenuFinal />
          <Box className={classes.content}>
            <Container className={classes.container}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <Deposit />
                  </Paper>
                </Grid>
                <Grid item xs={!2} style={{ marginBottom: 50 }}>
                  <Paper className={classes.paper}>
                    <Order />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
