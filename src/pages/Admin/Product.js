import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminMenuFinal from "../../components/Admin/LayoutComponent/adminMenuFinal";
import AdminProduct from "./AdminProduct";

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

const Product = () => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <ThemeProvider>
        <AdminMenuFinal />
        <Box className={classes.content}>
          <Container className={classes.container}>
            <AdminProduct />
          </Container>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Product;
