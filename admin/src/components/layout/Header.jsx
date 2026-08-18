import {
  FiBell,
  FiSearch,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import NotificationBell from "./NotificationBell";

const Header = ({
  setSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 h-20 border-b border-white/10 bg-[#101B2D]/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">


        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            onClick={() => setSidebarOpen(true)}
            className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-xl
      border
      border-white/10
      bg-white/5
      text-white
      hover:bg-sky-500/20
      lg:hidden
    "
          >
            <FiMenu size={24} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-white">

              Dashboard

            </h1>

            <p className="mt-1 text-sm text-slate-400">

              Welcome back, Admin 👋

            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="hidden lg:flex items-center rounded-xl border border-white/10 bg-white/5 px-4 h-12">

            <FiSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="ml-3 bg-transparent outline-none text-white placeholder:text-slate-500"
            />

          </div>

          {/* Notification */}

          <NotificationBell />

          {/* Profile */}

          <button
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
            "
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
              <FiUser />
            </div>

            <div className="hidden md:block text-left">
              <p className="text-white font-medium">
                Admin
              </p>

              <p className="text-xs text-slate-400">
                Super Admin
              </p>
            </div>

          </button>

        </div>

      </div>
    </header>
  );
};

export default Header;