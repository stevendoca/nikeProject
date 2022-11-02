import { Toolbar } from "@mui/material";
import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import React from "react";
import NavMainMenu from "./NavMainComponents/NavMainMenu";
import LogoNike from "./NavMainComponents/logoNike";
import { Divider, makeStyles } from "@material-ui/core";
import SearchBox from "./NavMainComponents/SearchBox";
import NavMainFeature from "../NavBar/NavMainComponents/NavMainFeature";
const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
const useStyles = makeStyles({
  nav: {
    backgroundColor: "white",
    color: "black",
    position: "sticky",
    height: 60,
    boxShadow: "none",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  },

  toolbar: {
    padding: 0,
  },
  fallback: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});
const NavMain = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.nav}>
          <Toolbar className={classes.toolbar}>
            <LogoNike />
            <NavMainMenu />
            <NavMainFeature />
          </Toolbar>
          <SearchBox />
        </AppBar>
      </HideOnScroll>
      <div id="fallback" className={classes.fallback}></div>
    </React.Fragment>
  );
};

export default NavMain;

// import React from "react";
// import NavMainMenu from "./NavMainComponents/NavMainMenu";
// import PropTypes from "prop-types";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import Slide from "@material-ui/core/Slide";
// import { makeStyles } from "@material-ui/core/styles";
// import LogoNike from "./NavMainComponents/logoNike";

// /*Hide nav bar on scroll*/
// function HideOnScroll(props) {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({ target: window ? window() : undefined });
//   // console.log(trigger);

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }
// HideOnScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   window: PropTypes.func,
// };

// /*Style*/
// const useStyles = makeStyles((theme) => ({
//   nav: {
//     backgroundColor: "white",
//     color: "black",
//     position: "sticky",
//     height: 60,
//     boxShadow: "none",
//     fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
//   },

//   toolbar: {
//     padding: 0,
//   },
//   fallback: {
//     position: "fixed",
//     left: 0,
//     top: 0,
//     width: "100%",
//     height: "100%",
//     zIndex: -1,
//   },
// }));

// export default function NavMain(props) {
//   const classes = useStyles();

//   return (
//     <React.Fragment>
//       {/* <CssBaseline /> */}

//       <HideOnScroll {...props}>
//         <AppBar className={classes.nav}>
//           <Toolbar className={classes.toolbar}>
//             <NavMainMenu />
//             <LogoNike />
//           </Toolbar>
//         </AppBar>
//       </HideOnScroll>
//       <div id="fallback" className={classes.fallback}></div>
//     </React.Fragment>
//   );
// }
