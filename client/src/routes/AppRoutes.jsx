import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import RequestSample from "../pages/RequestSample/RequestSample";
import RequestWizard from "../pages/RequestWizard/RequestWizard";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/Profile/Profile";
import MyOrders from "../pages/Profile/MyOrders";
import Process from "../pages/Process/Process";
import Team from "../pages/Team/Team";
import Blog from "../pages/Blog/Blog";
import BlogDetails from "../pages/Blog/BlogDetails";
import PrivacyPolicy from "../pages/Legal/PrivacyPolicy";
import Terms from "../pages/Legal/Terms";

import PageTransition from "../components/common/PageTransition";
import ScrollToTop from "../components/common/ScrollToTop";

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">

        <Routes
          location={location}
          key={location.pathname}
        >

          <Route
            path="/"
            element={
              <MainLayout>
                <PageTransition>
                  <Home />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/about"
            element={
              <MainLayout>
                <PageTransition>
                  <About />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/process"
            element={
              <MainLayout>
                <PageTransition>
                  <Process />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/team"
            element={
              <MainLayout>
                <PageTransition>
                  <Team />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/blog"
            element={
              <MainLayout>
                <PageTransition>
                  <Blog />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/blog/:id"
            element={
              <MainLayout>
                <PageTransition>
                  <BlogDetails />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <MainLayout>
                <PageTransition>
                  <Contact />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/request-sample"
            element={
              <MainLayout>
                <PageTransition>
                  <RequestSample />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/request-wizard"
            element={
              <MainLayout>
                <PageTransition>
                  <RequestWizard />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/product/:id"
            element={
              <MainLayout>
                <PageTransition>
                  <ProductDetails />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/products"
            element={
              <MainLayout>
                <PageTransition>
                  <Shop />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/cart"
            element={
              <MainLayout>
                <PageTransition>
                  <Cart />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/checkout"
            element={
              <MainLayout>
                <PageTransition>
                  <Checkout />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <MainLayout>
                <PageTransition>
                  <Profile />
                </PageTransition>
              </MainLayout>
            }
          />
          <Route
            path="/my-orders"
            element={
              <MainLayout>
                <PageTransition>
                  <MyOrders />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />

          <Route
            path="/signup"
            element={
              <PageTransition>
                <Signup />
              </PageTransition>
            }
          />

          <Route
            path="/privacy-policy"
            element={
              <MainLayout>
                <PageTransition>
                  <PrivacyPolicy />
                </PageTransition>
              </MainLayout>
            }
          />

          <Route
            path="/terms"
            element={
              <MainLayout>
                <PageTransition>
                  <Terms />
                </PageTransition>
              </MainLayout>
            }
          />

        </Routes>

      </AnimatePresence>
    </>
  );

};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRoutes;