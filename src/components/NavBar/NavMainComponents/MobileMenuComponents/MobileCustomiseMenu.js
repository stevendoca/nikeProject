import { Drawer, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
const useStyles = makeStyles((theme) => ({
  MobileCustomiseMenuContainer: {
    padding: "10px 0",
  },
  MobileCustomiseMenu: {
    fontSize: 24,
    display: "flex",
    alignItems: "center",
    color: "black",
    textDecoration: "none",
  },
  ChevronRightIcon: {
    position: "absolute",
    right: 35,
  },
  drawerPaper: {
    width: 320,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  MobileMenuBack: {
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    color: "black",
    textDecoration: "none",
    padding: "4px 0",
    marginBottom: 28,
  },
  mobileMenu: {
    marginTop: 26,
    padding: "0 36px 150px",
  },
  MobileMenuHeadline: {
    padding: "7px 0 7px 7px",
    marginBottom: 16,
    fontSize: 24,
  },
  MobileMenuChoiceContainer: {
    paddingLeft: 7,
  },
  MobileMenuChoice: {
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    color: "#757575",
    textDecoration: "none",
    padding: "5px 0",
  },
}));

function MobileCustomiseMenu(props) {
  const classes = useStyles();
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [menu, setMenu] = useState(0);
  const [menuCategory, setMenuCategory] = useState(0);
  return (
    <div className={classes.MobileCustomiseMenuContainer}>
      <div
        className={classes.MobileCustomiseMenu}
        onClick={() => {
          setMenu(1);
        }}
      >
        Customize
        <ChevronRightIcon className={classes.ChevronRightIcon} />
      </div>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={menu === 1 ? true : false}
        onClose={() => {
          setMenu(0);
        }}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenu(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            All
          </div>
          <div className={classes.MobileMenuHeadline}>Customize</div>
          <div className={classes.MobileMenuChoiceContainer}>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(1);
              }}
            >
              Featured
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(2);
              }}
            >
              Nike By You
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(3);
              }}
            >
              By Sport
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(4);
              }}
            >
              Icons
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
          </div>
        </div>
      </Drawer>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={menuCategory === 1 ? true : false}
        onClose={() => {
          setMenuCategory(0);
        }}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Customize
          </div>
          <div className={classes.MobileMenuHeadline}>Featured</div>
          <div className={classes.MobileMenuChoiceContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              Nike By You Release
            </a>
          </div>
        </div>
      </Drawer>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={menuCategory === 2 ? true : false}
        onClose={() => {
          setMenuCategory(0);
        }}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Customize
          </div>
          <div className={classes.MobileMenuHeadline}>Nike By You</div>
          <div className={classes.MobileMenuChoiceContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              Men
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Women
            </a>
          </div>
        </div>
      </Drawer>

      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={menuCategory === 3 ? true : false}
        onClose={() => {
          setMenuCategory(0);
        }}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Customize
          </div>
          <div className={classes.MobileMenuHeadline}>By Sport</div>
          <div className={classes.MobileMenuChoiceContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              LifeStyle
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Running
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Basketball
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Gym and Training
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Footbal
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Basketball
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Skatebording
            </a>
          </div>
        </div>
      </Drawer>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={menuCategory === 4 ? true : false}
        onClose={() => {
          setMenuCategory(0);
        }}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Customize
          </div>
          <div className={classes.MobileMenuHeadline}>Icons</div>
          <div className={classes.MobileMenuChoiceContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              Air Max
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Air Force
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Metcon
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Huarache
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Free
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Flyknit
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default MobileCustomiseMenu;
