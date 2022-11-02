import { ThemeProvider, createTheme } from "@mui/material";
import { Dialog, Slide, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../../Axios/API";
import {
  fetchAPIListProduct,
  isLoadingListProduct,
} from "../../features/product/productSlice";
import MaterialTable from "material-table";
import EditProduct from "./EditProduct";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AdminProduct = () => {
  const defaultMaterialTheme = createTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [getId, setGetId] = useState(null);
  const [item, setItem] = useState(null);
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.isLoading);
  const data = useSelector((state) => state.product.data);
  /////////////weir
  let token = JSON.parse(localStorage.getItem("user"));
  const userLocal = JSON.parse(localStorage.getItem("user"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickOpen = (rowData) => {
    setItem(rowData);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeRowPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const getIdUser = async () => {
    try {
      const res = await API(
        `users/get_id`,
        "POST",
        { email: userLocal.user.email },
        token
      );
      setGetId(res.data);
    } catch (e) {
      console.log({ ...e });
    }
  };
  const row = data
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item) => {
      return (
        <TableRow>
          <TableCell>
            <img src={item.img} style={{ width: "50px" }} />
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.typeProduct}</TableCell>
          <TableCell>{item.gender}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>
            <EditIcon
              onClick={{ handleClickOpen }}
              style={{ cursor: "pointer" }}
            />
            <DeleteIcon style={{ cursor: "pointer" }} />
          </TableCell>
        </TableRow>
      );
    });
  useEffect(() => {
    const callAPI = async () => {
      try {
        dispatch(isLoadingListProduct(true));
        const res = await API("product", "GET");
        const addedData = JSON.parse(JSON.stringify(res.data));
        setProduct(addedData);
        dispatch(fetchAPIListProduct(res.data));
        dispatch(isLoadingListProduct(true));
      } catch (e) {
        console.log({ ...e });
      }
    };
    callAPI();
    getIdUser();
  }, []);
  return (
    <div style={{ maxWidth: "100%" }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={[
            {
              title: "Image",
              field: "img",
              render: (rowData) => (
                <img src={rowData.img} style={{ width: 50 }} />
              ),
            },
            { title: "Name", field: "name" },
            { title: "Type", field: "typeProduct" },
            { title: "gender", field: "gender" },
            { title: "Price", field: "price" },
          ]}
          data={product}
          actions={[
            {
              icon: () => <EditIcon />,
              tooltip: "Edit",
              onClick: (event, rowData) => {
                handleClickOpen(rowData);
              },
            },
          ]}
          title="List Product"
        />
      </ThemeProvider>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <EditProduct
          item={item}
          handleClose={handleClose}
          product={product}
          getID={getId}
          token={token}
        />
      </Dialog>
    </div>
  );
};

export default AdminProduct;
