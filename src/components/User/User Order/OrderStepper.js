import {
  makeStyles,
  withStyles,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import clsx from "clsx";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 15,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 10,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 42,
    height: 42,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});
const ColorLibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const icons = {
    1: <ShoppingCartIcon />,
    2: <LocalShippingIcon />,
    3: <DoneOutlineIcon />,
  };
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};
const useStyles = makeStyles({
  root: {
    width: 350,
  },
  stepperContainer: {
    padding: 0,
  },
  stepLabel: {},
});
function getSteps() {
  return ["Confirm", "Delivering", "Delivered"];
}
const OrderStepper = (props) => {
  const clasess = useStyles();
  const [activeStep, setActiveStep] = useState(props.status - 1);
  const steps = getSteps();
  return (
    <div className={clasess.root}>
      <Stepper
        className={clasess.stepperContainer}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              className={clasess.stepLabel}
              StepIconComponent={ColorLibStepIcon}
            ></StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderStepper;
