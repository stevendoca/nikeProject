import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { REGISTER } from "redux-persist";
import API from "../../../Axios/API";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  imgFavorite: {
    height: 100,
  },
  modifyUser: {
    cursor: "pointer",
    fontSize: 16,
    "&:hover": {
      color: "red",
    },
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
    width: 350,
  },
});
const updateUserAPI = async (data, id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    await API("users/updateAdmin" + id, "PUT", data, token);
    alert("Update user success");
    window.location.reload();
  } catch (e) {
    console.log({ ...e });
    alert(e.response.data.e);
  }
};
const deleteUserAPI = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    await API("users/delete", "DELETE", { _id: data }, token);
    alert("Delete user success");
    window.location.reload();
  } catch (e) {
    alert(e.response.data.e);
    console.log({ ...e });
  }
};
const ListUser = (props) => {
  const { row } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    id: "",
    name: "",
    email: "",
    age: null,
  });
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const age = [];
  for (let i = 1; i < 101; i++) {
    age.push(i);
  }
  const listAge = age.map((item, key) => {
    <option key={key} value={item}>
      {key}
    </option>;
  });
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const onSubmit = (data) => {
    dispatch(updateUserAPI(data, dataUpdate.id));
  };
  const handleDeleteUser = (data) => {
    dispatch(deleteUserAPI(data));
  };
  const capitalizeFirstLetter = (string) => {
    let splitString = string.toLowerCase().split(" ");
    splitString[0].toUpperCase();
    return splitString.join(" ");
  };
  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((open) => !open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.age}</TableCell>
        <TableCell align="left">{row.userType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingBottom: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div>
                <div
                  className={classes.modifyUser}
                  onClick={() => {
                    setDataUpdate({
                      id: row._id,
                      name: row.name,
                      email: row.email,
                      age: row.age,
                    });
                    setOpenDialog(!openDialog);
                  }}
                >
                  Update users
                </div>
                <div
                  className={classes.modifyUser}
                  onClick={() => {
                    handleDeleteUser(row._id);
                  }}
                >
                  Delete users
                </div>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ marginTop: 10 }}
              >
                {capitalizeFirstLetter(row.name)}'s favourite products
              </Typography>
              <Table size="small" aira-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Product Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productsFavorite.map((favoriteRow, key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        <img
                          src={favoriteRow.img}
                          className={classes.imgFavorite}
                        />
                      </TableCell>
                      <TableCell>{favoriteRow.name}</TableCell>
                      <TableCell align="right">
                        {favoriteRow.price.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update User</DialogTitle>
        <form
          method="POST"
          className={classes.Form}
          id="AdminFormDeleteUser"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
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
            <div className={classes.inputContainer}>
              <div>name:</div>
              <input
                type="text"
                placeholder="name"
                className={classes.detail}
                name="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className={classes.inputContainer}>
              {" "}
              <div>Age:</div>{" "}
              <select
                className={classes.detail}
                name="age"
                {...register("age", { required: true })}
              >
                <option value="">Select Age</option>
                {listAge}
              </select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleCloseDialog}
              color="primary"
              autoFocus
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default ListUser;
