import Cart from "../components/Cart/Cart";
import ListProduct from "../components/ListProduct/listProduct";
import UserOrder from "../components/User/User Order/UserOrder";
import DashBoard from "../pages/Admin/adminDashboard";
import AdminProduct from "../pages/Admin/AdminProduct";
import AdminUser from "../pages/Admin/AdminUser";
import DetailProductPage from "../pages/DetailProduct/detailProductPage";
import HomePage from "../pages/Home/home";
import UserProfilePage from "../pages/User/UserProfile";

export const RouteHomePage = [
  { path: "/", exact: true, component: <HomePage /> },
  { path: "/listProduct", exact: false, component: <ListProduct /> },
  { path: "/detailProduct:id", exact: false, component: <DetailProductPage /> },
  { path: "/cart", exact: false, component: <Cart /> },
  { path: "/admin", exact: true, component: <DashBoard /> },
  { path: "/order", exact: false, component: <UserOrder /> },
  { path: "/userProfile", exact: false, component: <UserProfilePage /> },
];
export const RouteAdminPage = [
  { path: "admin", exact: true, component: DashBoard },
  { path: "admin/product", exact: true, component: AdminProduct },
  { path: "admin/user", exact: false, componen: AdminUser },
];
