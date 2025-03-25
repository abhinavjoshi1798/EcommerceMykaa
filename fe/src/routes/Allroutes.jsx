import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import AllProducts from "../pages/AllProducts";
import SingleProduct from "../pages/SingleProduct";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";
import Modal from "../pages/Modal";
import App2 from "../pages/Alert";
import Toast from "../pages/Toast";
import ProductsUi from "../components/AdminDashboardComponents/ProductsUi";
import UsersUi from "../components/AdminDashboardComponents/UsersUi";
import OrdersUi from "../components/AdminDashboardComponents/OrdersUi";
import EditProduct from "../components/AdminDashboardComponents/EditProduct";
import PrivateAdminRoute from "../components/PrivateAdminRoutes";
import PrivateRoute from "../components/PrivateRoute"
import Payment from "../pages/Payment";
import AdminNotFound from "../pages/AdminNotFound";

const Allroutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<SignUp />} />
      

      {/* Private Route */}
      <Route path={"/categories"} element={<PrivateRoute><Categories /></PrivateRoute>  } />
      <Route path={"/allproducts"} element={<PrivateRoute>
        <AllProducts />

      </PrivateRoute>        } />
      <Route path={"/allproduct/:id"} element={<PrivateRoute><SingleProduct /></PrivateRoute>   } />
      <Route path={"/cart"} element={<PrivateRoute><Cart /></PrivateRoute>    } />
      <Route path={"/payment"} element={<PrivateRoute>
        <Payment />
        </PrivateRoute>
         } />

      <Route
        path={"/admindashboard/*"}
        element={
          <PrivateAdminRoute>
          <AdminDashboard>
            <Routes>
              <Route path={"/products"} element={<ProductsUi />} />
              <Route path={"/Users"} element={<UsersUi />} />
              <Route path={"/Orders"} element={<OrdersUi />} />
              <Route path={"/products/edit/:id"} element={<EditProduct />} />
            </Routes>
          </AdminDashboard>
          </PrivateAdminRoute>
        }
      />

      <Route path={"/modal"} element={<Modal />} />
      <Route path={"/alert"} element={<App2 />} />
      <Route path={"/toast"} element={<Toast />} />


      <Route path={"*"} element={<NotFound />} />
      <Route path={"/adminonly"} element={<AdminNotFound />} />

    </Routes>
  );
};

export default Allroutes;
