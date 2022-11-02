import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import * as action from "../../components/ListProduct/module/Action/action";
import Maincomponent from "../../components/maincomponent";
import {
  fetchAPIListProduct,
  isLoadingListProduct,
} from "../../features/product/productSlice";
import API from "../../Axios/API";
import Footer from "../../components/Footer/Footer";
const HomePage = () => {
  const dispatch = useDispatch();
  const getProductAPIHandler = async (gender, typeProduct) => {
    try {
      dispatch(isLoadingListProduct, true);
      const res = await API(
        `product/?gender=${gender}&typeProduct=${typeProduct}`,
        "GET"
      );

      dispatch(fetchAPIListProduct(res.data));
      dispatch(isLoadingListProduct(false));
      localStorage.setItem(
        "GenderAndTypeProduct",
        JSON.stringify({ gender: gender, typeProduct: typeProduct })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductAPIHandler("male", "shoes");
  }, []);
  return (
    <React.Fragment>
      <Maincomponent />
    </React.Fragment>
  );
};
export default HomePage;
