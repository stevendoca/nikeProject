import React from "react";
import Cart from "../../components/Cart/Cart";
import ContainerCustom from "../../components/common/ContainerCustom";
import ScrollProducts from "../../components/common/ScrollProducts";
import Title from "../../components/common/Title";

const CartPage = () => {
  return (
    <div>
      <Cart />
      <ContainerCustom mgt={true} mgb={true}>
        <Title title="You Might Also Like" />
        <ScrollProducts />
      </ContainerCustom>
    </div>
  );
};

export default CartPage;
