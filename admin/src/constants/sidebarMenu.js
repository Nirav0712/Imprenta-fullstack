import {
  FiGrid,
  FiBox,
  FiLayers,
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiMail,
  FiSettings,
  FiFileText,
  FiLayout,
  FiMessageCircle,
} from "react-icons/fi";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: FiGrid,
    path: "/dashboard",
  },
  {
    title: "Products",
    icon: FiBox,
    path: "/products",
  },
  {
    title: "Categories",
    icon: FiLayers,
    path: "/categories",
  },
  {
    title: "Homepage CMS",
    icon: FiHome,
    path: "/homepage",
  },
  {
    title: "Hero Slider CMS",
    icon: FiLayout,
    path: "/hero-slider",
  },
  {
    title: "Orders",
    icon: FiShoppingBag,
    path: "/orders",
  },
  {
    title: "Request Sample",
    icon: FiFileText,
    path: "/request-sample",
  },
  {
    title: "Contact",
    icon: FiMail,
    path: "/contact",
  },
  {
    title: "Users",
    icon: FiUsers,
    path: "/users",
  },
  {
    title: "Theme Customization",
    icon: FiLayout,
    path: "/theme-customization",
  },
  {
    title: "Inquiries",
    icon: FiMessageCircle,
    path: "/inquiries",
  },
  {
    title: "Settings",
    icon: FiSettings,
    path: "/settings",
  },
];