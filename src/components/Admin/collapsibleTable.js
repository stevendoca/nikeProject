import {
  InputBase,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../Axios/API";
import { Search } from "@mui/icons-material";
import { isLoadingListProduct } from "../../features/product/productSlice";
import ListUser from "./listUser/listUser";
import { Skeleton } from "@mui/material";
import { listUserAction } from "../../features/user/userSlice";

const useStyles = makeStyles({
  Title: {
    fontSize: 25,
  },
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
  },
  Content: {
    display: "flex",
    justifyContent: "space-between",
    backgroundImage:
      "linear-gradient(to left, #227df9 0%, #7462f9 25%, #df3ef8 50%, #7462f9 75%, #227df9 100%)",
    backgroundSize: "250% auto",
    transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
    transformOrigin: "50% 50% 0px",
    transition: "all 0.5s ease !important",
    "&:hover": {
      backgroundPosition: "right center",
    },
  },
});
const CollapsibleTable = () => {
  const [valueSearch, setValue] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.isLoading);
  useEffect(() => {
    try {
      dispatch(isLoadingListProduct(true));
      const token = JSON.parse(localStorage.getItem("user")).token;
      const getUser = async () => {
        const res = await API("users", "GET", null, token);
        dispatch(isLoadingListProduct(false));
        dispatch(listUserAction(res.data));
      };
      getUser();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const listUser = useSelector((state) => state.user.listUser);
  let listUserLazyLoad = [];
  for (let i = 0; i < 10; i++) {
    listUserLazyLoad.push({
      age: 90,
      userType: "user",
      _id: "5f82dbb68fdc3827c3f3ffed",
      email: "abcxyz@gmail.com",
      name: "abcxyz",
      productsFavorite: [],
    });
  }

  const handleSearchInput = (e) => {
    setValue(e.target.value);
  };
  const filter = () => {
    return listUser
      .filter((item) => {
        return (
          item.email
            .toLowerCase()
            .trim()
            .indexOf(valueSearch.toLocaleLowerCase().trim()) !== -1
        );
      })
      .map((row, key) => <ListUser key={key} row={row} />);
  };
  return (
    <div className={classes.Title}>
      <div className={classes.Content}>
        <div className={classes.Title}>List User</div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            onInput={(e) => {
              handleSearchInput(e);
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        {isLoading ? (
          <Table aria-label="collapsible table">
            {" "}
            <TableBody>
              {listUserLazyLoad.map((row, key) => (
                <Skeleton width="100%" key={key}>
                  <ListUser key={row.name} row={row} />
                </Skeleton>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filter()}</TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default CollapsibleTable;
