import "../App.css";
import DetailProduct from "../pages/DetailProduct/detailProductPage";
import HomePage from "../pages/Home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import NavBar from "../components/NavBar/NavBar";
import UserOrder from "../components/User/User Order/UserOrder";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBar />} path="/">
            <Route path="/" caseSensitive={true} element={<HomePage />} />
            <Route path="/detailProduct/:id" element={<DetailProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user/order" element={<UserOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
