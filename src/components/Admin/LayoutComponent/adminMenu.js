import { withStyles } from "@material-ui/styles";
import {
  AppBar,
  Badge,
  Button,
  createTheme,
  Divider,
  Drawer,
  IconButton,
  List,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { mainAdminMenuItems, secondaryAdminMenuItems } from "./adminMenuItem";
import { notifySuccess } from "../../../utils/utils";
import { logOut } from "../../../features/navBar/navBarSlice,";
import { makeStyles } from "@mui/styles";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";

const drawerWidth = 240;
const StyledButton = withStyles({
  root: {
    backgroundImage:
      "linear-gradient(to left, #227df9 0%, #7462f9 25%, #df3ef8 50%, #7462f9 75%, #227df9 100%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "3px 3px 5px 2px rgb(105 131 255 / 45%)",
    backgroundSize: "250% auto",
    transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
    transformOrigin: "50% 50% 0px",
    transition: "all 0.5s ease !important",
    width: "100%",
    "&:hover": {
      backgroundPosition: "right center",
    },
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 20, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage:
      "linear-gradient(to left, #227df9 0%, #7462f9 25%, #df3ef8 50%, #7462f9 75%, #227df9 100%)",
    backgroundSize: "250% auto",
    transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
    transformOrigin: "50% 50% 0px",
    transition: "all 0.5s ease !important",
    "&:hover": {
      backgroundPosition: "right center",
    },
    color: "red",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    color: "red",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  test: {
    color: "red",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const AdminMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  ////////////
  ///////////
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const theme = createTheme();
  return (
    <React.Fragment>
      <Box>
        <AppBar
          position="absolute"
          sx={
            open
              ? {
                  width: `calc(100% - ${drawerWidth}px)`,
                  transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                }
              : { zIndex: (theme) => theme.zIndex.drawer + 1 }
          }
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          ModalProps={{
            hideBackdrop: true,
          }}
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainAdminMenuItems}</List>
          <Divider />
          <List>{secondaryAdminMenuItems}</List>
          <StyledButton
            onClick={() => {
              navigate.push("/");
              notifySuccess("good bye");
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("user");
              dispatch(logOut(null));
            }}
          >
            Log out
          </StyledButton>
        </Drawer>
      </Box>
    </React.Fragment>
  );
};

export default AdminMenu;
