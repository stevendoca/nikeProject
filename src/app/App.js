import "../App.css";
import DetailProduct from "../pages/DetailProduct/detailProductPage";
import HomePage from "../pages/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import NavBar from "../components/NavBar/NavBar";
import UserOrder from "../components/User/User Order/UserOrder";
import UserProfilePage from "../pages/User/UserProfile";
import ListProductFilter from "../components/ListProduct/ListProductComponent/listProductFilter";
import ListProduct from "../components/ListProduct/listProduct";
import Dashboard from "../pages/Admin/dashBoard";
import HomeTemplate from "../template/HomeTemplate";
import { ToastContainer } from "react-toastify";
import { RouteAdminPage, RouteHomePage } from "../routes/routes";
import NavSub from "../components/NavBar/NavSub";
import AdminProduct from "../pages/Admin/AdminProduct";
import AdminTemplate from "../template/AdminTemplate";
import AdminUser from "../pages/Admin/AdminUser";
import Footer from "../components/Footer/Footer";
import Product from "../pages/Admin/Product";
import ListproductMain from "../components/ListProduct/ListProductComponent/listproductMain";
import ListProductFinal from "../components/ListProduct/ListProductFinal";
import CartPage from "../pages/Cart/CartPage";
function App() {
  const showMenuAdmin = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        const ItemComponent = item.component;
        return (
          <Route
            path={item.path}
            caseSensitive={true}
            element={<ItemComponent />}
          />
        );
      });
    }
  };
  const showMenuHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        const ItemComponent = item.component;
        return (
          <Route
            path={item.path}
            caseSensitive={true}
            element={<ItemComponent />}
          />
        );
      });
    }
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBar />} path="/">
            <Route path="/" caseSensitive={true} element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/user/order" element={<UserOrder />} />
            <Route path="/userProfile" element={<UserProfilePage />} />
            <Route path="/listProduct" element={<ListProductFinal />} />
          </Route>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/user" element={<AdminUser />} />
        </Routes>
      </BrowserRouter>
      {/* <BrowserRouter>
        <Routes>
          {showMenuHome(RouteHomePage)}
          {showMenuAdmin(RouteAdminPage)}
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
