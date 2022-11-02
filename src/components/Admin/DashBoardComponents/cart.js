import { makeStyles } from "@mui/material";
import { Alert } from "@mui/material";
import moment from "moment";
// import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import API from "../../../Axios/API";
import { notifyError, notifySuccess } from "../../../utils/utils";

const useStyles = makeStyles({
  datePicker: {
    width: 150,
  },
});
const Cart = () => {
  const [change, setChange] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: "Order ID", field: "_id", editable: "never" },
      {
        title: "Create At",
        field: "createdAt",
        editable: "never",
        render: (rowData) => {
          return <p>{moment(rowData.createdAt).format("LL")}</p>;
        },
      },
      {
        title: "Product",
        field: "products",
        editable: "never",
        render: (carts) =>
          carts.products.map((item) => {
            return (
              <div>
                <h5>
                  {item.name} [ Quantity:{item.quantity}, Size: {item.size}]
                </h5>
                <img
                  src={item.img}
                  style={{ width: 100, borderRadius: "50%" }}
                />
              </div>
            );
          }),
      },
      {
        title: "Status",
        field: "status",
        type: "numeric",
        editable: "never",
        render: (rowData) => {
          return (
            <div>
              {rowData.status === 1 && (
                <Alert severity="warning">Pending Order</Alert>
              )}
              {rowData.status === 2 && (
                <Alert severity="info">Delivery Order</Alert>
              )}
              {rowData.status === 3 && (
                <Alert severity="success">Payment Success</Alert>
              )}
            </div>
          );
        },
        validate: (rowData) => rowData.status >= 1 && rowData.status <= 3,
      },
      {
        title: "Payment",
        field: "isPayed",
        type: "boolean",
        editable: "never",
        render: (rowData) => {
          if (rowData.isPayed === true) {
            return (
              <Alert variant="outlined" severity="success">
                Paid (Paypal)
              </Alert>
            );
          } else if (rowData.isPayed === false && rowData.status === 3) {
            return (
              <Alert variant="outlined" severity="info">
                Paid (COD)
              </Alert>
            );
          } else if (rowData.isPayed === false) {
            return (
              <Alert variant="outlined" severity="warning">
                No Payment
              </Alert>
            );
          }
        },
      },
    ],
    data: [],
  });
  const classes = useStyles();
  const adminLocal = JSON.parse(localStorage.getItem("user"));
  const { token } = adminLocal;
  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await API(`cart/showAdmin`, "GET", null, token);
        setState((prev) => {
          return { ...prev, data: res.data };
        });
      } catch (e) {
        console.log(e);
      }
    };
    callAPI();
  }, [change]);
  const handleDeleteCart = async (cart) => {
    try {
      await API(`cart/delete`, "DELETE", { _id: cart._id }, token);
      notifySuccess("Delete Successfully");
    } catch (e) {
      notifyError("delete fail");
    }
  };
  const updateStatus = async (cart, notify) => {
    try {
      const res = await API(
        `cart/updateStatus/${cart._id}`,
        "PUT",
        { status: notify },
        token
      );
      notifySuccess("Update successfully");
    } catch (e) {
      notifyError("Update Fail");
    }
  };
  return (
    <div>
      {/* <MaterialTable
        title="Manager Order"
        columns={state.columns}
        data={state.data}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 15, 20, 25],
          emptyRowsWhenPaging: false,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  if (oldData.status === 3) {
                    notifyError("Payment success can not update");
                  } else if (oldData.status === 1) {
                    updateStatus(newData, (newData.status = 2));
                    setState((prev) => {
                      const data = [...prev.data];
                      data[data.indexOd(oldData)] = newData;
                      return { ...prev, data };
                    });
                  } else if (oldData.status === 2) {
                    updateStatus(newData, (newData.status = 3));
                    setState((prev) => {
                      const data = [...prev.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prev, data };
                    });
                  }
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                handleDeleteCart(oldData);
                setState((prev) => {
                  const data = [...prev.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prev, data };
                });
              }, 600);
            }),
        }}
      /> */}
    </div>
  );
};

export default Cart;
