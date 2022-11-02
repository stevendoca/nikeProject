import { makeStyles } from "@material-ui/core";
import React from "react";
import CreateUser from "../../components/User/createUser";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
const AdminUser = () => {
  return (
    <div>
      <CreateUser />
    </div>
  );
};

export default AdminUser;
