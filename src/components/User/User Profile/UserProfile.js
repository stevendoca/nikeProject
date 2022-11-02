import { Hidden, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../Axios/API";
import { fetch_API_login } from "../../../features/navBar/navBarSlice,";
import { notifyError, notifySuccess } from "../../../utils/utils";

const useStyles = makeStyles({
  Container: {
    padding: "40px 48px",
    fontSize: 16,
    minHeight: 500,
  },
  Title: {
    fontSize: 24,
    marginBottom: 36,
  },
  Setting: {
    width: 266,
    paddingRight: 24,
    float: "left",
  },
  SettingItem: {
    lineHeight: 1.75,
    cursor: "pointer",
  },
  SettingItemIcon: {
    paddingRight: 20,
    width: 26,
  },
  AccountContainer: {
    marginLeft: 406,
    // [theme.breakpoints.down("sm")]: {
    //     marginLeft: 0
    // },
  },
  AccountDetail: {
    width: 415,
    // [theme.breakpoints.down("sm")]: {
    //     width: '100%',
    // },
  },
  Detail: {
    width: "100%",
    marginTop: "10px",
    padding: "18px 14px",
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputValid: {
    color: "#fe0000",
  },
  ButtonSubmit: {
    outline: "none",
    lineHeight: "24px",
    fontSize: 16,
    cursor: "pointer",
    padding: "7px 28px",
    backgroundColor: "white",
    borderRadius: 30,
    border: "1px solid #757575",
    marginTop: 15,
  },
});
const UserProfile = () => {
  const userLocal = useSelector((state) => state.navBar.userLocal);
  const [ageSelect, setAgeSelect] = useState(
    userLocal ? userLocal.user.age : null
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAgeSelect = (event) => {
    setAgeSelect(event.target.value);
  };
  const age = [];
  for (var i = 0; i < 100; i++) {
    age.push(i + 1);
  }
  const listAge = age.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const updateProfileAPI = async (data, token) => {
    try {
      await API(`users/update`, "PUT", data, token);
      const dataLogin = {
        email: data.email,
        password: data.password,
      };
      const resLogin = await API("users/login", "POST", dataLogin);
      dispatch(fetch_API_login(resLogin.data));
      localStorage.setItem("user", JSON.stringify(resLogin.data));
      notifySuccess("update profile success");
    } catch (e) {
      console.log(e);
      notifyError("fail to update profile");
    }
  };
  const onSubmit = (data) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    updateProfileAPI(data, token);
  };
  return (
    <div className={classes.Container}>
      <Hidden smDown>
        <div className={classes.Title}>Settings</div>
      </Hidden>
      <div>
        <Hidden smDown>
          <div className={classes.Setting}>
            <div className={classes.SettingItem}>
              <img
                src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/accountDetails.svg"
                className={classes.SettingItemIcon}
                alt="account detail"
              />
              Account Details
            </div>
            <div className={classes.SettingItem}>
              <img
                src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/paymentMethods.svg"
                className={classes.SettingItemIcon}
                alt="payment method"
              />
              Payment Method
            </div>
            <div className={classes.SettingItem}>
              <img
                src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/deliveryAddresses.svg"
                className={classes.SettingItemIcon}
                alt="delivery addresses"
              />
              Delivery Addresses
            </div>
            <div className={classes.SettingItem}>
              <img
                src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/shopPreferences.svg"
                className={classes.SettingItemIcon}
                alt="shop reference"
              />
              Shop Reference
            </div>
            <div className={classes.SettingItem}>
              <img
                src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/communicationPreferences.svg"
                className={classes.SettingItemIcon}
                alt="communication preference"
              />
              Communication Reference
            </div>
            <div className={classes.SettingItem}>
              <img
                src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/linkedAccounts.svg"
                className={classes.SettingItemIcon}
              />
              Linked Accounts
            </div>
          </div>
        </Hidden>
        <div className={classes.AccountContainer}>
          {userLocal && (
            <div className={classes.AccountDetail}>
              {" "}
              <form
                id="formUserProfile"
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
              >
                <div className={classes.Title}>Account Detail</div>
                <p className={classes.inputContainer}>
                  <div>Email:</div>
                  <input
                    type="text"
                    className={classes.Detail}
                    placeholder="Email"
                    name="email"
                    defaultValue={userLocal.user.email}
                    style={{ borderColor: errors?.email && "red" }}
                    {...register(
                      "email",
                      { required: true }
                      // pattern: {
                      //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      // },
                    )}
                  />
                  {errors?.email && (
                    <p className={classes.inputValid}>
                      {" "}
                      Please enter a valid email address
                    </p>
                  )}
                </p>
                <p className={classes.inputContainer}>
                  <div>Password:</div>
                  <input
                    type="password"
                    className={classes.Detail}
                    placeholder="Password"
                    name="password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {errors?.password && (
                    <p className={classes.inputValid}>
                      {" "}
                      Please enter a valid password
                    </p>
                  )}
                </p>
                <p className={classes.inputContainer}>
                  <div>Name:</div>
                  <input
                    type="text"
                    className={classes.Detail}
                    placeholder="Name"
                    name="name"
                    defaultValue={userLocal.user.name}
                    {...register("name", {
                      required: true,
                    })}
                  />
                  {errors?.name && (
                    <p className={classes.inputValid}>
                      Please enter a valid name
                    </p>
                  )}
                </p>
                <p className={classes.inputContainer}>
                  <div>Age:</div>
                  <select
                    className={classes.Detail}
                    name="age"
                    defaultValue={ageSelect}
                    {...register("age", { required: true })}
                  >
                    {listAge}
                  </select>
                </p>
                <button className={classes.ButtonSubmit} type="submit">
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
