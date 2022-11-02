import { Accordion, AccordionSummary, makeStyles } from "@material-ui/core";
import Typography from "@mui/material/Typography";

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { listUserAction } from "../../features/user/userSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";

const useStyles = makeStyles({
  container: {
    marginBottom: 100,
  },
  title: {
    fontSize: 18,
  },
  form: {
    width: "50%",
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputValid: {
    color: "#fe000",
  },
  buttonSubmit: {
    outline: "none",
    lineHeight: "24",
    fontSize: 16,
    cursor: "pointer",
    padding: "7px 28px",
    backgroundColor: "white",
    borderRadius: 30,
    border: "1px solid #757575",
    marginTop: 15,
  },
  detail: {
    width: "100%",
    marginTop: "10px",
    padding: "18px 14px",
    fontSize: 18,
  },
});
const CreateUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    let form = document.getElementById("AdminFormCreateUser");
    form.requestFullscreen();
    dispatch(listUserAction(data));
  };
  const age = [];
  for (let i = 1; i < 101; i++) {
    age.push(i);
  }
  const listAge = age.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className={classes.container}>
      <Accordion>
        <AccordionSummary
          expandicon={<ExpandMoreIcon />}
          aria-controls="panella-content"
        >
          <div className={classes.title}>Create userAccount</div>
        </AccordionSummary>
        <AccordionDetails>
          <form
            method="POST"
            className={classes.form}
            id="AdminFormCreateUser"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.inputContainer}>
              <div>Email</div>
              <input
                type="text"
                placeholder="Email"
                className={classes.input}
                name="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className={classes.inputContainer}>
              <div>password</div>
              <input
                type="password"
                placeholder="Password"
                className={classes.input}
                name="password"
                {...register("password", { required: true })}
              />
            </div>
            <div className={classes.inputContainer}>
              <div>Age:</div>
              <select
                className={classes.detail}
                name="age"
                {...register("age", { required: true })}
              >
                <option value="">select your age</option>
                {listAge}
              </select>
            </div>
            <button className={classes.buttonSubmit} type="submit">
              Create User
            </button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CreateUser;
