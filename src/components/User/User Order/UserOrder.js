import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../../Axios/API";
import {
  dataDeliverReducer,
  dataOrderReducer,
  dataProcessReducer,
} from "../../../features/orderData/orderDataSlice";
import OrderStepper from "./OrderStepper";

const useStyles = makeStyles({
  Container: {
    padding: "40px 48px",
    fontSize: 16,
    minHeight: 500,
  },
  Title: {
    fontSize: 24,
    backgroundColor: "black",
    color: "white",
    fontWeight: 500,
    padding: "20px",
  },
  OrderType: {
    padding: "20px 0",
    fontSize: 22,
    fontWeight: 500,
    borderBottom: "1px #cccccc solid",
  },
  Order: {
    backgroundColor: "white",
    outline: 0,
    border: 0,
    textAlign: "left",
    margin: "15px 0 0 0",
    width: 700,

    padding: "10px 0 10px 10px",
    // border: '1px #cccccc solid',
    overflow: "auto",
    borderRadius: 5,
    boxShadow:
      "0 1px 2px 2px rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)",
  },
  OrderHeader: {
    cursor: "pointer",
  },
  OrderStatus: {
    float: "right",
    marginBottom: 0,
  },
  OrderInfo: {
    paddingBottom: 10,
  },
  OrderProduct: {
    width: "70%",

    clear: "both",
    padding: "24px 0",
    margin: "15px auto 0",
    borderTop: "1px #cccccc solid",
  },
  ProductImageContainer: {
    paddingRight: 16,
    float: "left",
  },
  ProductImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    // [theme.breakpoints.down('xs')]: {
    //     width: 110,
    //     height: 110,
    // },
  },
  ProductDetail: {
    lineHeight: 1.75,
  },
  ProductName: {
    textDecoration: "none",
    color: "black",
  },
  Price: {
    float: "right",
  },
  SubDetail: {
    color: "#757575",
  },
  OrderCancel: {
    color: "#757575",
  },
});
const UserOrder = () => {
  const dataOrder = useSelector((state) => state.orderData.dataOrder);
  const dataProcess = useSelector((state) => state.orderData.dataProcess);
  const dataDelivered = useSelector((state) => state.orderData.dataDelivered);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const callAPI = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const res = await API(`cart`, "GET", null, token);
        let dataProcessStore = [];
        let dataDeliveredStore = [];
        for (let i = res.data.length - 1; i >= 0; i--) {
          if (res.data[i].status === 1 || res.data[i].status === 2) {
            dataProcessStore.push(res.data[i]);
          } else if (res.data[i].status === 3) {
            dataDeliveredStore.push(res.data[i]);
          }
        }
        dataOrderReducer(res.data);
        dataProcessReducer(dataProcessStore);
        dataDeliverReducer(dataDeliveredStore);
      } catch (e) {
        console.log("e", e);
      }
    };
    callAPI();
  }, []);

  return <div>UserOrder</div>;
};

export default UserOrder;
