import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import API from "../../Axios/API";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginBottom: 100,
  },
  Title: {
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
  Detail: {
    width: "100%",
    marginTop: "10px",
    padding: "18px 14px",
    fontSize: 18,
  },
  Form: {
    width: "50%",
  },
}));
const CreateUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const age = [];
  for (let i = 0; i < 100; i++) {
    age.push(i + 1);
  }
  const listAge = age.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const createUserAPI = (data) => {
    return async (dispatch) => {
      try {
        const res = await API("users/create", "POST", data);
        console.log("res", res);
      } catch (e) {
        console.log({ ...e });
      }
    };
  };
  const onSubmit = (data) => {
    let form = document.getElementById("AdminFormCreateUser");
    form.reset();
    createUserAPI(data);
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panella-content"
          id="panella-header"
        >
          <Typography>Create User</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form
            method="POST"
            className={classes.Form}
            id="AdminFormCreateUser"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className={classes.inputContainer}>
              <div>Email:</div>
              <input
                type="text"
                className={classes.Detail}
                placeholder="Email"
                name="email"
                style={{ borderColor: errors.email && "red" }}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
              />
              {errors.email && (
                <p className={classes.inputValid}>
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
                ref={register({
                  required: true,
                  pattern: {
                    value: /^.{8,}$/i,
                  },
                })}
              />
              {errors.password && (
                <p className={classes.inputValid}>
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
                ref={register({
                  required: true,
                  pattern: {
                    value: /^.{8,}$/i,
                  },
                })}
              />
              {errors.name && (
                <p className={classes.inputValid}>Please enter a valid valid</p>
              )}
            </p>
            <p className={classes.inputContainer}>
              <div>listAge:</div>
              <select
                className={classes.Detail}
                name="age"
                ref={register({ required: true })}
              >
                <option value="">Age</option>
                {listAge}
              </select>
            </p>
            <button className={classes.ButtonSubmit}>Create User</button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CreateUser;
