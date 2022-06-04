import { Dialog, IconButton, makeStyles, Slide } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import API from "../../../Axios/API";
import {
  logOut,
  modalHandler,
  signUpHandler,
  fetch_API_login,
} from "../../../features/navBar/navBarSlice,";
import { notifyError, notifySuccess } from "../../../utils/utils";
const preventDefault = (event) => event.preventDefault();
const useStyles = makeStyles({
  nav1Menu: {
    margin: "0 12px",
    textDecoration: "none",
    color: "black",
    fontSize: 12,
    "&:hover": {
      color: "grey",
    },
    cursor: "pointer",
  },
  backdrop: {
    minHeight: 500,
    margin: "auto",
    width: 512,
    // [theme.breakpoints.down("xs")]: {
    //   width: 320,
    // },
  },
  SignInContainer: {
    margin: "0 28px",
    padding: 28,
    // [theme.breakpoints.down("xs")]: {
    //   margin: 0,
    // },
  },
  nike: {
    width: 50,
    hegiht: 17,
  },
  formHeader: {
    padding: "30px 0",
    margin: "0 auto",
    fontSize: "20px",
    maxWidth: "25ch",
    lineHeight: "26px",
    textAlign: "center",
    fontWeight: 700,
  },
  inputContainer: {
    margin: "15px 0",
  },
  input: {
    width: "100%",
    border: "1px solid #e5e5e5",
    borderRadius: 3,
    color: "#8d8d8d",
    height: 40,
    lineHeight: 17,
    padding: "0 16px",
    outline: 0,
  },
  inputValid: {
    color: "#fe0000",
    fontSize: 12,
  },
  NikeBirthday: {
    fontSize: 12,
    color: "#8d8d8d",
    textAlign: "center",
  },
  formSupport: {
    margin: "18px 0",
    color: "#8D8D8D",
    fontSize: 12,
    display: "flex",
  },
  formSupportGrow: {
    flexGrow: 1,
    verticalAlign: "baseline",
  },
  forgotPassword: {
    color: "#8D8D8D",
    textDecoration: "none",
  },
  formTerm: {
    fontSize: 12,
    textAlign: "center",
    color: "#8d8d8d",
    maxWidth: 285,
    margin: "3px auto 24px",
  },
  buttonSignIn: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "black",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  facebookLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#4267B2",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  facebookContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0px auto",
    width: 190,
  },
  Image: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  googleLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#DE5246",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  googleContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0px auto",
    width: 170,
  },
  joinUsContainer: {
    marginTop: 10,
    color: "#8d8d8d",
    fontSize: 12,
  },
  joinUs: {
    color: "black",
  },
  closeSignIn: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "black",
  },
  signInWithNormal: {
    // [theme.breakpoints.down("xs")]: {
    //   display: "none",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
  },
  signInWithMobile: {
    // [theme.breakpoints.down("xs")]: {
    //   display: "block",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   display: "none",
    // },
  },
  UserMenuContainer: {
    padding: "24px 24px 24px 18px",
    position: "absolute",
    right: 0,
    zIndex: 10,
    width: 200,
    fontSize: 14,
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "white",
  },
  UserMenuHeader: {
    padding: "4px 8px",
    marginBottom: 12,
    fontSize: 16,
    cursor: "pointer",
  },
  UserMenuItem: {
    color: "#757575",
    padding: "4px 8px",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
    width: "100%",
  },
  UserIcon: {
    marginLeft: 10,
    height: 28,
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SignIn = (props) => {
  const classes = useStyles();
  let { openModal, openSignUp, userLocal } = useSelector(
    (state) => state.navBar
  );
  const [userMenu, setUserMenu] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  // const fetch_API_Login_User = (data) => {
  //   return async () => {
  //     try {
  //       console.log("res data");
  //       const res = await API("users/login", "POST", data);
  //       dispatch(fetch_API_login(res.data));
  //       localStorage.setItem("user", JSON.stringify(res.data));
  //       const userLocal = JSON.parse(localStorage.getItem("user"));
  //       const favorLocal = userLocal?.user.productsFavorite;
  //       localStorage.setItem("userFavor", JSON.stringify(favorLocal));
  //     } catch (e) {
  //       notifyError("Login Fail");
  //     }
  //   };
  // };
  const fetch_API_Login_User = async (data) => {
    try {
      const res = await API("users/login", "POST", data);
      dispatch(fetch_API_login(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      const userLocal = JSON.parse(localStorage.getItem("user"));
      const favorLocal = userLocal?.user.productsFavorite;
      localStorage.setItem("userFavor", JSON.stringify(favorLocal));
    } catch (e) {
      notifyError("Login Fail");
    }
  };
  const onSubmit = (data, e) => {
    console.log("data", data);
    let form = document.getElementById("formSignIn");
    form.reset();
    fetch_API_Login_User(data);
  };
  const onCloseSignIn = (data, e) => {
    let form = document.getElementById("formSignIn");
    form.reset();
  };
  const onSubmitSignUp = () => {
    let form = document.getElementById("formSignUp");
    form.reset();
  };
  const emitOpenAction = () => {
    dispatch(modalHandler(!openModal));
  };
  return (
    <span>
      {!userLocal && (
        <div>
          <span className={classes.nav1Menu}>Join Us</span>
          <span
            className={classes.nav1Menu}
            onClick={() => {
              dispatch(modalHandler(!openModal));
            }}
          >
            Sign In
          </span>
          <Dialog
            open={openModal ? true : false}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              dispatch(modalHandler(!openModal));
              onCloseSignIn();
            }}
            classes={{ root: classes.backdrop }}
          >
            <div className={classes.SignInContainer}>
              {" "}
              <IconButton
                className={classes.closeSignIn}
                onClick={() => {
                  dispatch(modalHandler(!openModal));
                  onCloseSignIn();
                }}
              >
                <CloseIcon />
              </IconButton>
              <div>
                <center>
                  <img
                    src="https://www.logomaker.com/wp-content/uploads/2018/05/2000px-Logo_NIKE.png"
                    className={classes.nike}
                    alt="logo marker"
                  />
                </center>
              </div>
              <div className={classes.formHeader}>
                YOUR ACCOUNT FOR EVERYTHING NIKE
              </div>
              <form id="formSignIn" onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.inputContainer}>
                  <input
                    type="text"
                    placeholder="Email"
                    className={classes.input}
                    name="email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={classes.input}
                    name="password"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className={classes.formSupport}>
                  <span className={classes.formSupportGrow}>
                    <input type="checkbox" style={{ margin: "0 15px 0 0" }} />
                    Keep me signed in
                  </span>
                  <span
                    className={classes.formSupportGrow}
                    style={{ textAlign: "right" }}
                  >
                    <a href="#a" className={classes.forgotPassword}>
                      forgotPassword
                    </a>
                  </span>
                </div>
                <div className={classes.formTerm}>
                  By logging in, you agree to Nike's
                  <a href="#a" style={{ color: "#8d8d8d" }}>
                    Privacy Policy
                  </a>
                  and
                  <a href="#a" style={{ color: "#8d8d8d" }}>
                    Term of Use
                  </a>
                </div>
                <input
                  className={classes.buttonSignIn}
                  type="submit"
                  value="SIGN IN"
                />
                <center>
                  <b>OR</b>
                </center>
                <span className={classes.signInWithNormal}>
                  <button className={classes.facebookLink}>
                    <span className={classes.facebookContainer}>
                      Sign in with Facebook
                    </span>
                    <img
                      src="https://www.facebook.com/images/fb_icon_325x325.png"
                      className={classes.Image}
                      alt="facebook icon"
                    />
                  </button>
                  <button className={classes.googleLink}>
                    <span className={classes.googleContainer}>
                      Sign in with Google
                      <img
                        src="https://icons-for-free.com/iconfiles/png/512/app+global+google+plus+ios+media+social+icon-1320193328869704656.png"
                        className={classes.Image}
                        alt=""
                      />
                    </span>
                  </button>
                </span>
                {/* Sign In with Facebook or Google mobile */}
                <center className={classes.signInWithMobile}>
                  <a href="#a">
                    <img
                      src="https://www.facebook.com/images/fb_icon_325x325.png"
                      className={classes.Image}
                      alt=""
                    />
                  </a>
                  <a href="#a">
                    <img
                      src="https://icons-for-free.com/iconfiles/png/512/app+global+google+plus+ios+media+social+icon-1320193328869704656.png"
                      className={classes.Image}
                      alt=""
                    />
                  </a>
                </center>
                <center className={classes.joinUsContainer}>
                  Not a member?
                  <a
                    className={classes.joinUs}
                    onClick={() => {
                      dispatch(signUpHandler(!openSignUp));
                      dispatch(modalHandler(!openModal));
                      onCloseSignIn();
                    }}
                  >
                    Join Us
                  </a>
                </center>
              </form>
            </div>
          </Dialog>
          <Dialog
            open={openSignUp ? true : false}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              dispatch(signUpHandler(!openSignUp));
              onSubmitSignUp();
            }}
            classes={{ root: classes.backdrop }}
          >
            {" "}
            <div className={classes.SignInContainer}>
              <IconButton
                className={classes.closeSignIn}
                onClick={() => {
                  signUpHandler(!openSignUp);
                  onSubmitSignUp();
                }}
              >
                <CloseIcon />
              </IconButton>
              <center className={classes.joinUsContainer}>
                Already a Member?
                <a
                  className={classes.joinUs}
                  onClick={() => {
                    signUpHandler(!openSignUp);
                    modalHandler(!openModal);
                    onSubmitSignUp();
                  }}
                >
                  Sign In
                </a>
              </center>
            </div>
          </Dialog>
        </div>
      )}
      {userLocal && (
        <div
          onMouseOver={() => setUserMenu(true)}
          onMouseLeave={() => setUserMenu(false)}
        >
          <span
            className={classes.nav1Menu}
            style={{ display: "flex", alignItems: "center" }}
          >
            Hi, {userLocal.user.name}
            <PersonOutlineIcon className={classes.UserIcon} />
          </span>
          {userMenu && (
            <div className={classes.UserMenuContainer}>
              <div className={classes.UserMenuHeader}>Account</div>
              <Link to="/user/profile" style={{ textDecoration: "none" }}>
                <div className={classes.UserMenuItem}>Profile</div>
              </Link>
              <Link to="/user/order" style={{ textDecoration: "none" }}>
                <div className={classes.UserMenuItem}>Orders</div>
              </Link>
              <Link to="user/favorite" style={{ textDecoration: "none" }}>
                <div className={classes.UserMenuItem}>Favourite</div>
              </Link>
              <div className={classes.UserMenuItem}>Inbox</div>
              <div className={classes.UserMenuItem}>Events</div>
              <div className={classes.UserMenuItem}>Account Settings</div>
              <div
                className={classes.UserMenuItem}
                onClick={() => {
                  dispatch(logOut(userLocal));
                  localStorage.removeItem("user");
                  localStorage.removeItem("userFavor");
                  localStorage.removeItem("cart");
                }}
              >
                Log out
              </div>
            </div>
          )}
        </div>
      )}
    </span>
  );
};

export default SignIn;
