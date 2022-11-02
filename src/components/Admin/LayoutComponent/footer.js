import { Link, Typography } from "@mui/material";
import React from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";

const AdminFooter = () => {
  return (
    <React.Fragment>
      <Typography variant="body2" color="textSecondary" align="center">
        {`Copyright ©`}
        <Link color="inherit" href="#">
          Nike
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </React.Fragment>
  );
};

export default AdminFooter;
