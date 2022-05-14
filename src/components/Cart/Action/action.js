import API from "../../../Axios/API";
import { NotificationContainer, NotificationManager } from "react-notification";
import * as ActionType from "../Content/content";
import { notifyError, notifySuccess } from "../../../utils/utils";

export const createAction = ({ type, payload }) => {
  return {
    type,
    payload,
  };
};

export const postAPICart = (data, token, history) => {
  return async (dispatch) => {
    try {
      const res = await API("/cart/create", "POST", data, token);
      setTimeout(() => {
        notifySuccess("order successfull");
        localStorage.removeItem("cart");
        //back to user/order page
      }, 2000);
    } catch (e) {
      notifyError("order fail");
      console.log({ ...e });
    }
  };
};
export const postFavoriteCart = (z) => {
  return async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem("user"));
      const { token } = userLocal;
      const userFavor = JSON.parse(localStorage.getItem("userFavor"));
      if (userFavor === null) {
        const res1 = await API(
          "/users/addUpdateFavorite",
          "POST",
          { productFavorite: [] },
          token
        );
      } else {
        const res2 = await API(
          "/users/addUpdateFavorite",
          "POST",
          { productFavorite: userFavor },
          token
        );
      }
    } catch (e) {
      notifyError("add favorite fail");
      console.log({ ...e });
    }
  };
};
