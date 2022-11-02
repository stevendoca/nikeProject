import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { Navigate, Route } from "react-router-dom";
import AdminMenu from "../components/Admin/LayoutComponent/adminMenu";
import AdminFooter from "../components/Admin/LayoutComponent/footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  appBarSpacer: theme.mixins.toolbar,
}));

const AdminLayout = (props) => {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <div className={classes.root}>
        <AdminMenu />
        <div className={classes.content}>
          <Container className={classes.container}>{props.children}</Container>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};
const AdminTemplate = ({ Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (localStorage.getItem("isAdmin")) {
          return (
            <AdminLayout>
              <Component {...props} />
            </AdminLayout>
          );
        } else {
          return <Navigate to="/" />;
        }
      }}
    />
  );
};

export default AdminTemplate;
