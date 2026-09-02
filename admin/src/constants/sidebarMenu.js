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
  FiMonitor,
  FiTrendingUp,
} from "react-icons/fi";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: FiGrid,
    path: "/dashboard",
  },
  {
    title: "Website Management",
    icon: FiMonitor,
    children: [
      {
        title: "Homepage CMS",
        icon: FiHome,
        path: "/homepage",
      },
      {
        title: "Home Slider CMS",
        icon: FiLayout,
        path: "/hero-slider",
      },
      {
        title: "Theme Customization",
        icon: FiLayout,
        path: "/theme-customization",
      },
      {
        title: "Blog",
        icon: FiFileText,
        path: "/blogs",
      },
    ]
  },
  {
    title: "Catalog Management",
    icon: FiBox,
    children: [
      {
        title: "Categories",
        icon: FiLayers,
        path: "/categories",
      },
      {
        title: "Products",
        icon: FiBox,
        path: "/products",
      },
    ]
  },
  {
    title: "Sales & Enquiries",
    icon: FiTrendingUp,
    children: [
      {
        title: "Orders",
        icon: FiShoppingBag,
        path: "/orders",
      },
      {
        title: "Inquiries",
        icon: FiMessageCircle,
        path: "/inquiries",
      },
      {
        title: "Request Samples",
        icon: FiFileText,
        path: "/request-sample",
      },
    ]
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
    title: "Settings",
    icon: FiSettings,
    path: "/settings",
  },
];