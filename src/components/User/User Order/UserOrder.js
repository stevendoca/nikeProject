import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../../Axios/API";
import {
  dataDeliverReducer,
  dataOrderReducer,
  dataProcessReducer,
  testReducer,
} from "../../../features/orderData/orderDataSlice";
import OrderStepper from "./OrderStepper";
import moment from "moment";
import { notifyError, notifySuccess } from "../../../utils/utils";

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
  const [dataProcessClick, setDataProcessClick] = useState(0);
  const [dataDeliveredClick, setDataDeliveredClick] = useState(0);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleOrderClick = (index) => {
    if (index === dataProcessClick) {
      setDataProcessClick(-1);
    } else {
      setDataProcessClick(index);
    }
  };
  const handleDeliveredClick = (index) => {
    if (index === dataDeliveredClick) {
      setDataDeliveredClick(-1);
    } else {
      setDataDeliveredClick(index);
    }
  };
  const cancelOrderAPI = async (data, token) => {
    try {
      await API(`cart/delete`, "DELETE", { _id: data }, token);
      notifySuccess("CANCEL ORDER ID" + data);
    } catch (e) {
      console.log({ ...e });
      notifyError("Fail To Cancel Order");
    }
  };
  const handleCancel = (id) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    cancelOrderAPI(id, token);
    const index = dataProcess.findIndex((item) => {
      return item._id === id;
    });
    dataProcess.splice(index, 1);
  };
  const convertDay = (date) => {
    return moment(date).format("LLLL");
  };
  // useEffect(() => {
  //   for (let i = 0; i < dataProcess.length; i++) {
  //     console.log("data Process", dataProcess[i].products);
  //   }
  // }, [dataProcess]);
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
        dispatch(dataOrderReducer(res.data));
        dispatch(dataProcessReducer(dataProcessStore));
        dispatch(dataDeliverReducer(dataDeliveredStore));
        console.log("dataProcess", dataProcess);
      } catch (e) {
        console.log("e", e);
      }
    };
    callAPI();
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>Your Order</div>
      <div>
        <div className={classes.OrderType}>Processing Order</div>
        <div>
          {dataProcess.map((item, index) => {
            return (
              <button className={classes.Order} key={index}>
                <div
                  className={classes.OrderHeader}
                  onClick={() => {
                    handleOrderClick(index);
                  }}
                >
                  <div className={classes.OrderStatus}>
                    <OrderStepper status={item.status} />
                  </div>
                  <div className={classes.OrderInfo}>ID:{item._id}</div>
                  <div className={classes.OrderInfo}>
                    Date:{convertDay(item.updatedAt)}
                  </div>
                  {item.isPayed === true ? (
                    <div className={classes.OrderInfo}>
                      <b>Payment: Paypal</b>
                    </div>
                  ) : (
                    <div className={classes.OrderInfo}>
                      <b>Payment:Ship COD</b>
                    </div>
                  )}
                  {item.status === 1 && item.isPayed !== true && (
                    <div
                      className={classes.OrderCancel}
                      onClick={() => handleCancel(item._id)}
                    >
                      Cancel Order
                    </div>
                  )}
                </div>

                {item.products.map((item1, index1) => {
                  return (
                    <div key={index1}>
                      {dataProcessClick === index && (
                        <div className={classes.OrderProduct}>
                          <a
                            href="#a"
                            className={classes.ProductImageContainer}
                          >
                            {" "}
                            <img
                              alt=""
                              className={classes.ProductImage}
                              src={item1.img}
                            />
                          </a>
                          <div className={classes.ProductDetail}>
                            <a href="#a" className={classes.ProductName}>
                              {item1.name}
                            </a>
                            <div className={classes.Price}>
                              {item1.price.toLocaleString()}
                            </div>
                            <div className={classes.SubDetail}>
                              <div>Size:{item1.size}</div>
                              <div>Quantity:{item1.quantity}</div>
                              <div>Color:{item1.color}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className={classes.OrderType}>Delivered Order</div>
        <div>
          {dataDelivered.map((item, index) => {
            return (
              <button className={classes.Order} key={index}>
                <div
                  className={classes.OrderHeader}
                  onClick={() => {
                    handleDeliveredClick(index);
                  }}
                >
                  <div className={classes.OrderStatus}>
                    <OrderStepper status={item.status} />
                  </div>
                  <div className={classes.OrderInfo}>ID:{item._id}</div>
                  <div className={classes.OrderInfo}>Date:{item.updatedAt}</div>
                </div>
                {item.products.map((item1, index1) => {
                  return (
                    <div key={index1}>
                      {dataDeliveredClick == index && (
                        <div key={index1}>
                          {dataDeliveredClick === index && (
                            <div className={classes.OrderProduct}>
                              <a
                                href="#a"
                                className={classes.ProductImageContainer}
                              >
                                <img
                                  alt=""
                                  className={classes.ProductImage}
                                  src={item1.img}
                                />
                              </a>
                              <div className={classes.ProductDetail}>
                                <a href="#a" className={classes.ProductName}>
                                  {item1.name}
                                </a>
                                <div className={classes.Price}>
                                  {item1.price.toLocaleString()}
                                </div>
                                <div className={classes.SubDetail}>
                                  <div>Size:{item1.size}</div>
                                  <div>Quantity:{item1.quantity}</div>
                                  <div>Color:{item1.color}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
