import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Drawer from "@material-ui/core/Drawer";
const useStyles = makeStyles((theme) => ({
  MobileCollectionMenuContainer: {
    padding: "10px 0",
  },
  MobileCollectionMenu: {
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
  MobileMenuCollectionContainer: {
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
const MobileCollections = (props) => {
  const classes = useStyles();

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [menu, setMenu] = React.useState(0);
  const [menuCategory, setMenuCategory] = React.useState(0);
  return (
    <div className={classes.MobileCollectionMenuContainer}>
      <div
        className={classes.MobileCollectionMenu}
        onClick={() => {
          setMenu(1);
        }}
      >
        Collection
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
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
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
          <div className={classes.MobileMenuHeadline}>Collection</div>
          <div className={classes.MobileMenuSaleContainer}>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(1);
              }}
            >
              Trending
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(2);
              }}
            >
              LifeStyle
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(3);
              }}
            >
              Running
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(4);
              }}
            >
              Football
              <ChevronRightIcon className={classes.ChevronRightIcon} />
            </div>
            <div
              className={classes.MobileMenuChoice}
              onClick={() => {
                setMenuCategory(5);
              }}
            >
              Kids
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
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Collection
          </div>
          <div className={classes.MobileMenuHeadline}>Trending</div>
          <div className={classes.MobileMenuCollectionContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              Dunk
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Metcon
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Jordan X Paris Saint-Germain
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              SuperRep Shoes
            </a>

            <a href="#a" className={classes.MobileMenuChoice}>
              Nike Essential
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
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Collection
          </div>
          <div className={classes.MobileMenuHeadline}>LifeStyle</div>
          <div className={classes.MobileMenuCollectionContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              Air Force 1
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Blazer
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Air Max
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Air Max 90
            </a>

            <a href="#a" className={classes.MobileMenuChoice}>
              Air Max Plus
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
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Collection
          </div>
          <div className={classes.MobileMenuHeadline}>Running</div>
          <div className={classes.MobileMenuCollectionContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              React
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Pegasus
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
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Collection
          </div>
          <div className={classes.MobileMenuHeadline}>Football</div>
          <div className={classes.MobileMenuCollectionContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              Phantom
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Mercurial
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              National Teams Collection
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Football Clubs
            </a>

            <a href="#a" className={classes.MobileMenuChoice}>
              Liverpool F.C
            </a>
          </div>
        </div>
      </Drawer>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={menuCategory === 5 ? true : false}
        onClose={() => {
          setMenuCategory(0);
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.mobileMenu}>
          <div
            className={classes.MobileMenuBack}
            onClick={() => {
              setMenuCategory(0);
            }}
          >
            <ChevronLeftIcon style={{ marginRight: "16px" }} />
            Collection
          </div>
          <div className={classes.MobileMenuHeadline}>Kids</div>
          <div className={classes.MobileMenuCollectionContainer}>
            <a href="#a" className={classes.MobileMenuChoice}>
              Air Max
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Air Force
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Running{" "}
            </a>
            <a href="#a" className={classes.MobileMenuChoice}>
              Football{" "}
            </a>

            <a href="#a" className={classes.MobileMenuChoice}>
              Basketball{" "}
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileCollections;
