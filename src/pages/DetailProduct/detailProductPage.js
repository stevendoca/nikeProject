import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import Footer from "../../components/Footer/Footer";

const DetailProductPage = () => {
  const { id } = useParams();
  return (
    <React.Fragment>
      <CssBaseline />
      <ProductDetail id={id} />
      <Footer />
    </React.Fragment>
  );
};

export default DetailProductPage;
