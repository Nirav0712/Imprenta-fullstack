import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";

import logo from "../../assets/logo/logo.png";

import {
  FiSearch,
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

  return (
    <>
     <header className="sticky top-0 z-50 w-full border-b border-white/10 shadow-xl bg-gradient-to-r from-[#142850] via-[#0F1F38] to-[#0D4A5A]">
     {/* Mobile Premium Glass Glow */}

<div className="absolute -top-20 -left-16 h-60 w-60 rounded-full bg-[#3B82F6]/10 blur-[110px] lg:hidden"></div>

<div className="absolute top-0 right-[-70px] h-56 w-56 rounded-full bg-[#06B6D4]/8 blur-[120px] lg:hidden"></div>

<div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#2563EB]/6 blur-[140px] lg:hidden"></div>

<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-white/[0.015] via-transparent to-transparent lg:hidden"></div>
        <div className="relative w-full h-20 px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center">

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

          {/* Search */}
         <div className="hidden md:flex flex-1 justify-center px-6 lg:px-10">
  <SearchBar />
</div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-10 ml-auto">

            {/* Help */}
          <button
  type="button"
  onClick={() => (window.location.href = "tel:+919427061888")}
  className="flex items-center gap-3 cursor-pointer"
>
  <FiHelpCircle size={22} />

  <div className="leading-tight text-left">
    <p className="text-[11px] uppercase tracking-wider text-slate-300">
      Need Help?
    </p>

    <p className="text-[15px] font-semibold text-white">
      +91 94270 61888
    </p>
  </div>
</button>

            {/* Favorites */}
          <button className="flex items-center gap-2 text-white hover:text-sky-300 transition">

              <FiHeart size={22} />

              <span className="font-medium text-white">
                Favorites
              </span>

            </button>

            {/* Sign In */}
         <Link
  to="/login"
  className="h-12 px-7 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium flex items-center gap-2 transition shadow-sm hover:shadow-md"
>
  <FiUser size={19} />
  Sign In
</Link>

            {/* Cart */}
           <button className="flex items-center gap-3 text-white hover:text-sky-300 transition">

              <div className="relative">

                <FiShoppingCart size={24} />

                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
                  0
                </span>

              </div>

              <span className="font-medium">
                Cart
              </span>

            </button>

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

           <button className="relative text-white hover:text-sky-300 transition">

              <FiShoppingCart size={22} />

              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">
                0
              </span>

            </button>

          </div>

        </div>
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
  className={`fixed top-0 left-0 h-screen w-full max-w-[480px] bg-gradient-to-b from-[#142850] via-[#0F1F38] to-[#0D4A5A] z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:hidden ${
    mobileMenu ? "translate-x-0" : "-translate-x-full"
  }`}
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

    Welcome to Imprenta

  </h3>

  <p className="mt-3 text-center leading-7 text-slate-400">

    Sign in to manage your orders,
    wishlist and request samples.

  </p>

  {/* Button */}

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

  

</div>

 <div className="mt-8 space-y-3">

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
      <FiHeart className="text-sky-400" />
      Favorites
    </span>

    →
  </button>

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

  <div className="space-y-2">

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

    <Link
      to="/about"
      onClick={() => setMobileMenu(false)}
      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10"
    >
      <div className="flex items-center gap-4">
        <FiInfo className="text-sky-400" size={20} />
        <span>About Us</span>
      </div>

      <FiChevronRight className="text-slate-500 group-hover:translate-x-1 transition" />
    </Link>

    <Link
      to="/request-sample"
      onClick={() => setMobileMenu(false)}
      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10"
    >
      <div className="flex items-center gap-4">
        <FiFileText className="text-sky-400" size={20} />
        <span>Request Sample</span>
      </div>

      <FiChevronRight className="text-slate-500 group-hover:translate-x-1 transition" />
    </Link>

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