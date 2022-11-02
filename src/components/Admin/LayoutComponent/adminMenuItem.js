import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { Link } from "react-router-dom";
const ListItemLink = (props) => {
  const { icon, primary, to } = props;
  const renderLink = React.useMemo(() =>
    React.forwardRef((itemProps, ref) => (
      <Link to={to} ref={ref} {...itemProps} />
    ))
  );
  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export const mainAdminMenuItems = (
  <div>
    <List aria-label="main mailbox folders">
      <ListItemLink to="/admin" primary="Dashboard" icon={<DashboardIcon />} />
      <ListItemLink
        to="/admin/product"
        primary="Products"
        icon={<ListAltIcon />}
      />
      <Link
        to="/admin/manageCart"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
      </Link>
    </List>
  </div>
);
export const secondaryAdminMenuItems = (
  <div>
    <ListSubheader inset>Quick links</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Lasr quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
