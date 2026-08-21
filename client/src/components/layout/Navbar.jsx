import { useState, useEffect } from "react";
import { fetchCategories, fetchProducts } from "../../services/api";
import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

import logo from "../../assets/logo/logo.png";

import {
  FiSearch,
  FiChevronDown,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiHelpCircle,
  FiChevronRight,
  FiHome,
  FiBox,
  FiFileText,
  FiPhone,
  FiInfo,
} from "react-icons/fi";

const categories = [
  "View All",
  "Visiting Cards",
  "Stationery, Letterheads & Notebooks",
  "Stamps and Ink",
  "Signs, Posters & Marketing Materials",
  "Labels, Stickers & Packaging",
  "Clothing, Caps & Bags",
  "Mugs, Albums & Gifts",
  "Pens",
  "Drinkware",
  "Custom Polo T-shirts",
  "Umbrellas & Rainwear",
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});

  const toggleMobileDropdown = (name) => {
    setMobileDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        let cats = [];
        if (data && data.categories) {
          cats = data.categories.slice(0, 8);
        } else if (Array.isArray(data)) {
          cats = data.slice(0, 8);
        } else if (data && data.data) {
          cats = data.data.slice(0, 8);
        }
        setCategoriesList(cats);
        if (cats.length > 0) setActiveCategory(cats[0]);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const catId = activeCategory?._id || activeCategory?.id;
    if (!catId || categoryProducts[catId]) return;
    let isMounted = true;
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetchProducts({ category: catId, limit: 12 });
        if (isMounted) {
          const prods = res.products || res.data || [];
          setCategoryProducts(prev => ({ ...prev, [catId]: prods }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchCategoryProducts();
    return () => { isMounted = false; };
  }, [activeCategory, categoryProducts]);

  const { cartItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 shadow-xl" style={{ backgroundColor: 'var(--theme-surface)' }}>
        {/* Mobile Premium Glass Glow */}

        <div className="absolute -top-20 -left-16 h-60 w-60 rounded-full bg-[#3B82F6]/10 blur-[110px] lg:hidden"></div>

        <div className="absolute top-0 right-[-70px] h-56 w-56 rounded-full bg-[#06B6D4]/8 blur-[120px] lg:hidden"></div>

        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#2563EB]/6 blur-[140px] lg:hidden"></div>

        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-white/[0.015] via-transparent to-transparent lg:hidden"></div>
        <div className="relative w-full h-20 px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 flex items-center">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(true)}
            className="
    lg:hidden
    mr-4
    relative
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-2xl
    border
    border-white/10
    bg-white/5
    backdrop-blur-xl
    text-white
    transition-all
    duration-300
    hover:border-sky-400/40
    hover:bg-sky-500/10
    active:scale-95
  "
          >

            {/* Glow */}

            <span
              className="
      absolute
      inset-0
      rounded-2xl
      bg-sky-500/10
      blur-xl
    "
            />

            <FiMenu
              size={24}
              className="relative z-10"
            />

          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0 cursor-pointer"
          >

            {/* Logo */}
            {/* 
  <div className="text-[46px] font-black text-sky-500 mr-2 leading-none">
    V
  </div>
  */}

            <div className="flex items-center">
              <img
                src={logo}
                alt="Imprenta"
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain"
              />
            </div>

          </Link>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-10 relative">
            <Link to="/" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Home</Link>

            {/* Company Dropdown */}
            <div
              className="relative group h-full py-6"
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-slate-300 group-hover:text-sky-400 transition-colors">
                Company <FiChevronDown />
              </button>

              <div
                className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${activeDropdown === "company" ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                  }`}
              >
                <div className="p-3">
                  <Link to="/about" className="block px-4 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-all font-medium">Who We Are</Link>
                  <Link to="/process" className="block px-4 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-all font-medium">Our Process</Link>
                  <Link to="/team" className="block px-4 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-all font-medium">Our Team</Link>
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div
              className="relative group h-full py-6"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-slate-300 group-hover:text-sky-400 transition-colors">
                Our Services <FiChevronDown />
              </button>

              <div
                className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${activeDropdown === "services" ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                  } flex z-50`}
              >
                {/* Left Side (Categories) */}
                <div className="w-1/3 bg-slate-50 p-4 border-r border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Categories</h3>
                  <div className="space-y-1 h-[280px] overflow-y-auto custom-scrollbar pr-2">
                    {categoriesList.map(cat => (
                      <button
                        key={cat._id || cat.id}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => window.location.href = `/products?category=${cat._id || cat.id}`}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory?._id === (cat._id || cat.id) ? "bg-sky-500 text-white shadow-md" : "text-slate-600 hover:bg-white hover:shadow-sm"
                          }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side (Products) */}
                <div className="w-2/3 p-6 bg-white min-h-[300px]">
                  {activeCategory && (
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{activeCategory.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {categoryProducts[activeCategory._id || activeCategory.id] ? categoryProducts[activeCategory._id || activeCategory.id].length : "..."} Products Available
                        </p>
                      </div>
                      <Link to={`/products?category=${activeCategory._id || activeCategory.id}`} className="text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1">
                        View All <FiChevronRight />
                      </Link>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {(!activeCategory || !categoryProducts[activeCategory?._id || activeCategory?.id]) ? (
                      <div className="col-span-2 flex justify-center py-10 opacity-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                      </div>
                    ) : (
                      categoryProducts[activeCategory?._id || activeCategory?.id].slice(0, 4).map(prod => (
                        <Link to={`/product/${prod.slug || prod.id}`} key={prod._id || prod.id} className="group block border border-slate-100 rounded-xl p-3 hover:border-sky-200 hover:shadow-lg transition-all">
                          <div className="h-24 bg-slate-50 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                            {prod.image && <img src={prod.image} alt={prod.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />}
                          </div>
                          <h4 className="text-sm font-semibold text-slate-700 truncate">{prod.title}</h4>
                          <span className="text-xs font-medium text-sky-500">{prod.price}</span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Dropdown */}
            <div
              className="relative group h-full py-6"
              onMouseEnter={() => setActiveDropdown("blog")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-slate-300 group-hover:text-sky-400 transition-colors">
                Blog <FiChevronDown />
              </button>

              <div
                className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${activeDropdown === "blog" ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                  }`}
              >
                <div className="p-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Latest Insights</h3>
                  <div className="space-y-4">
                    <Link to="/blog" className="flex gap-4 group/item">
                      <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0"></div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 group-hover/item:text-sky-500 transition-colors line-clamp-2">Latest Trends in Custom Packaging for 2026</h4>
                        <span className="text-xs text-slate-400 mt-1 block">2 days ago</span>
                      </div>
                    </Link>
                    <Link to="/blog" className="flex gap-4 group/item">
                      <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0"></div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 group-hover/item:text-sky-500 transition-colors line-clamp-2">How to Choose the Right Paper Stock for Business Cards</h4>
                        <span className="text-xs text-slate-400 mt-1 block">5 days ago</span>
                      </div>
                    </Link>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <Link to="/blog" className="text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors">View All Articles</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/contact" className="text-[15px] font-medium text-slate-300 hover:text-sky-400 transition-colors">Contact Us</Link>
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-10 ml-auto">

            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-3 text-white hover:text-sky-300 transition cursor-pointer"
            >
              <FiSearch size={24} />
              <span className="font-medium">
                Search
              </span>
            </button>

            {/* Favorites */}
            {/* <button className="flex items-center gap-2 text-white hover:text-sky-300 transition">

              <FiHeart size={22} />

              <span className="font-medium text-white">
                Favorites
              </span>

            </button> */}

            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className="h-12 px-5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-medium flex items-center gap-2 transition"
                >
                  <FiUser size={19} />
                  Hi, {user.name.split(' ')[0]}
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0F1F38] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/profile" className="block px-5 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition rounded-t-xl">
                    My Profile
                  </Link>
                  <Link to="/my-orders" className="block px-5 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition border-t border-white/5">
                    My Orders
                  </Link>
                  <button onClick={logout} className="w-full text-left px-5 py-3 text-sm text-red-400 hover:bg-white/5 transition border-t border-white/5 rounded-b-xl flex items-center gap-2">
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="h-12 px-7 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium flex items-center gap-2 transition shadow-sm hover:shadow-md"
              >
                <FiUser size={19} />
                Sign In
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="flex items-center gap-3 text-white hover:text-sky-300 transition">
              <div className="relative">
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-medium">
                Cart
              </span>
            </Link>

          </div>

          {/* Tablet & Mobile Icons */}
          <div className="flex lg:hidden items-center gap-5 ml-auto">


            {/* mobile search button */}
            <button
              onClick={() => setMobileMenu(true)}
              className="text-white hover:text-sky-300 transition"
            >
              <FiSearch size={22} />
            </button>

            <Link to="/cart" className="relative text-white hover:text-sky-300 transition">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>

        {/* Desktop Search Dropdown */}
        {showSearch && (
          <div className="hidden lg:flex w-full bg-[#10213D]/95 backdrop-blur-xl border-t border-white/10 p-5 justify-center shadow-xl absolute top-[80px] left-0 z-40 transition-all duration-300">
            <SearchBar />
          </div>
        )}
      </header>

      {/* Overlay */}
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-full max-w-[480px] z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:hidden ${mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ backgroundColor: 'var(--theme-surface)' }}
      >
        {/* Drawer Header */}

        <div
          className="
    sticky
    top-0
    z-20
    border-b
    border-white/10
    bg-[#10213D]/90
    backdrop-blur-2xl
  "
        >

          <div className="flex items-center justify-between px-5 py-5">

            {/* Logo */}

            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
            >
              <h2 className="text-3xl font-black tracking-tight text-white">

                imprenta

              </h2>
            </Link>

            {/* Close */}

            <button
              onClick={() => setMobileMenu(false)}
              className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/5
        text-white
        transition-all
        duration-300
        hover:border-sky-400
        hover:bg-sky-500/10
      "
            >

              <FiX size={22} />

            </button>

          </div>

        </div>


        {/* Search */}
        <div className="px-5 py-6 text-white">

          <div className="mb-6">
            <SearchBar />
          </div>


          <div
            className="
    rounded-[28px]
    border
    border-white/10
    bg-white/5
    p-6
    backdrop-blur-xl
  "
          >

            {/* Avatar */}

            <div
              className="
      mx-auto
      flex
      h-20
      w-20
      items-center
      justify-center
      rounded-full
      bg-sky-500/10
      text-sky-400
    "
            >
              <FiUser size={34} />
            </div>

            {/* Title */}

            <h3 className="mt-6 text-center text-2xl font-bold text-white">
              {isAuthenticated ? `Hi, ${user.name.split(" ")[0]}` : "Welcome to Imprenta"}
            </h3>

            <p className="mt-3 text-center leading-7 text-slate-400">
              {isAuthenticated ? "Manage your orders, wishlist and profile settings." : "Sign in to manage your orders, wishlist and request samples."}
            </p>

            {/* Button */}

            {isAuthenticated ? (
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenu(false)}
                  className="flex h-12 items-center justify-center rounded-2xl bg-sky-500/10 font-semibold text-sky-400 border border-sky-500/20"
                >
                  My Profile
                </Link>
                <Link
                  to="/my-orders"
                  onClick={() => setMobileMenu(false)}
                  className="flex h-12 items-center justify-center rounded-2xl bg-sky-500/10 font-semibold text-sky-400 border border-sky-500/20"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenu(false); }}
                  className="mt-2 flex h-12 items-center justify-center gap-2 rounded-2xl bg-red-500/10 font-semibold text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="
        mt-7
        flex
        h-12
        items-center
        justify-center
        rounded-2xl
        bg-sky-500
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-sky-600
      "
              >
                Sign In
              </Link>
            )}



          </div>

          <div className="mt-8 space-y-3">

            {/* <button
              className="
      flex
      w-full
      items-center
      justify-between
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-5
      py-4
      transition
      hover:border-sky-400
      hover:bg-white/10
    "
            >
              <span className="flex items-center gap-3">
                <FiHeart className="text-sky-400" />
                Favorites
              </span>

              →
            </button> */}

            <button
              className="
      flex
      w-full
      items-center
      justify-between
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-5
      py-4
      transition
      hover:border-sky-400
      hover:bg-white/10
    "
            >
              <span className="flex items-center gap-3">
                <FiHelpCircle className="text-sky-400" />
                Need Help?
              </span>

              →
            </button>

            <div className="mt-10">

              <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[3px] text-slate-500">
                Navigation
              </p>

              <div className="space-y-4">

                <Link
                  to="/"
                  onClick={() => setMobileMenu(false)}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10"
                >
                  <div className="flex items-center gap-4">
                    <FiHome className="text-sky-400" size={20} />
                    <span>Home</span>
                  </div>

                  <FiChevronRight className="text-slate-500 group-hover:translate-x-1 transition" />
                </Link>

                {/* Mobile Company Accordion */}
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleMobileDropdown("company")}
                    className="w-full group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-sky-500/10"
                  >
                    <div className="flex items-center gap-4">
                      <FiInfo className="text-sky-400" size={20} />
                      <span>Company</span>
                    </div>
                    <FiChevronDown className={`text-slate-500 transition-transform duration-300 ${mobileDropdowns.company ? "rotate-180" : ""}`} />
                  </button>
                  {mobileDropdowns.company && (
                    <div className="px-5 pb-4 pt-1 space-y-2 border-t border-white/5 bg-black/20">
                      <Link to="/about" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">Who We Are</Link>
                      <Link to="/process" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">Our Process</Link>
                      <Link to="/team" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">Our Team</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Services Accordion */}
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleMobileDropdown("services")}
                    className="w-full group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-sky-500/10"
                  >
                    <div className="flex items-center gap-4">
                      <FiBox className="text-sky-400" size={20} />
                      <span>Our Services</span>
                    </div>
                    <FiChevronDown className={`text-slate-500 transition-transform duration-300 ${mobileDropdowns.services ? "rotate-180" : ""}`} />
                  </button>
                  {mobileDropdowns.services && (
                    <div className="px-5 pb-4 pt-1 space-y-2 border-t border-white/5 bg-black/20 max-h-64 overflow-y-auto">
                      {categoriesList.map(cat => (
                        <Link key={cat._id || cat.id} to={`/products?category=${cat._id || cat.id}`} onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">{cat.name}</Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Blog Accordion */}
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleMobileDropdown("blog")}
                    className="w-full group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-sky-500/10"
                  >
                    <div className="flex items-center gap-4">
                      <FiFileText className="text-sky-400" size={20} />
                      <span>Blog</span>
                    </div>
                    <FiChevronDown className={`text-slate-500 transition-transform duration-300 ${mobileDropdowns.blog ? "rotate-180" : ""}`} />
                  </button>
                  {mobileDropdowns.blog && (
                    <div className="px-5 pb-4 pt-1 space-y-2 border-t border-white/5 bg-black/20">
                      <Link to="/blog" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-slate-300 hover:text-sky-400">View All Blog Posts</Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenu(false)}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10"
                >
                  <div className="flex items-center gap-4">
                    <FiPhone className="text-sky-400" size={20} />
                    <span>Contact Us</span>
                  </div>

                  <FiChevronRight className="text-slate-500 group-hover:translate-x-1 transition" />
                </Link>

              </div>

            </div>

            <div className="mt-10">

              <div
                className="
      overflow-hidden
      rounded-[28px]
      border
      border-sky-400/20
      bg-gradient-to-br
      from-sky-500/15
      to-cyan-500/10
      p-6
      backdrop-blur-xl
    "
              >

                <p className="text-sm uppercase tracking-[3px] text-sky-300">
                  Need Assistance?
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  Talk to our Experts
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Our printing specialists are available to help you choose the perfect product.
                </p>

                <a
                  href="tel:+912522669393"
                  onClick={() => setMobileMenu(false)}
                  className="
    mt-6
    flex
    h-12
    items-center
    justify-center
    rounded-2xl
    bg-sky-500
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-sky-600
    active:scale-95
  "
                >
                  <FiPhone className="mr-2" size={18} />
                  Call Now
                </a>

              </div>

            </div>

          </div>
          {/* 
  <div className="pt-5 space-y-7">

    {categories.map((item, index) => (
      <p
        key={index}
        className={`cursor-pointer ${
          index === 0 ? "font-bold" : ""
        }`}
      >
        {item}
      </p>
    ))}

  </div> */}

        </div>

        {/* Navigation */}
        {/* <nav className="px-5">

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            Home
          </button>

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            Products
          </button>

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            Categories
          </button>

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            Business Cards
          </button>

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            Flyers
          </button>

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            Banners
          </button>

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            My Orders
          </button>

          <button className="w-full text-left py-4 border-b hover:text-sky-600 transition">
            Wishlist
          </button>

        </nav> */}

        {/* Bottom Section */}


      </aside>

    </>
  );
};

export default Navbar;