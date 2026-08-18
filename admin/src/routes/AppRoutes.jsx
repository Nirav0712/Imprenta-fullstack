import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import Products from "../pages/products/Products";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";
import ViewProduct from "../pages/products/ViewProduct";

import Categories from "../pages/categories/Categories";

import HomepageCMS from "../pages/homepage/HomepageCMS";
import Orders from "../pages/orders/Orders";
import RequestSamples from "../pages/requestSamples/RequestSamples";
import Contact from "../pages/contact/Contact";
import Users from "../pages/users/Users";
import ThemeCustomization from "../pages/theme/ThemeCustomization";
import Settings from "../pages/settings/Settings";
import Notifications from "../pages/notifications/Notifications";
import Inquiries from "../pages/inquiries/Inquiries";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Redirect */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Protected */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/add"
            element={<AddProduct />}
          />

          <Route
            path="/products/edit/:id"
            element={<EditProduct />}
          />

          <Route
            path="/products/view/:id"
            element={<ViewProduct />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/homepage"
            element={<HomepageCMS />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/request-sample"
            element={<RequestSamples />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/theme-customization"
            element={<ThemeCustomization />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/inquiries"
            element={<Inquiries />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;