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
import { Link } from "react-router-dom";
import Logo from "../../common/logo";
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
    marginLeft: "40px",
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
            {/* <Link to="/">
              <svg
                className="pre-logo-svg"
                height="60px"
                width="60px"
                fill="#111"
                viewBox="0 0 69 32"
              >
                <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.2 5.12 2.16 7.52Q11.2 18 14 18q2.24 0 5.04-.72z"></path>
              </svg>
            </Link> */}
            <Logo />
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
