import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { sidebarMenu } from "../../constants/sidebarMenu";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    // Automatically expand groups that contain the currently active route
    const currentPath = location.pathname;
    const initialExpanded = {};

    sidebarMenu.forEach((item) => {
      if (item.children) {
        const isActiveChild = item.children.some(child => currentPath.startsWith(child.path));
        if (isActiveChild) {
          initialExpanded[item.title] = true;
        }
      }
    });

    setExpandedGroups(prev => ({ ...prev, ...initialExpanded }));
  }, [location.pathname]);

  const toggleGroup = (title) => {
    setExpandedGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-white/10
          bg-[#0C1626]
          transition-transform
          duration-300
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 p-8 shrink-0">
          <div>
            <h1 className="text-4xl font-black text-sky-400">
              Imprenta
            </h1>

            <p className="mt-2 text-slate-400">
              Admin Dashboard
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-white hover:bg-white/10 lg:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-5 py-8" style={{ scrollbarWidth: 'thin' }}>
          {sidebarMenu.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              const isExpanded = expandedGroups[item.title];
              const isGroupActive = item.children.some(child => location.pathname.startsWith(child.path));

              return (
                <div key={item.title} className="mb-2">
                  <button
                    onClick={() => toggleGroup(item.title)}
                    className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 ${isGroupActive && !isExpanded ? "bg-white/5 text-sky-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={22} className={isGroupActive ? "text-sky-400" : ""} />
                      <span className={`font-medium ${isGroupActive ? "text-white" : ""}`}>{item.title}</span>
                    </div>
                    {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="flex flex-col gap-1 pl-12 pr-2 py-2">
                      {item.children.map(child => {
                        const ChildIcon = child.icon;

                        return (
                          <NavLink
                            key={child.title}
                            to={child.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${isActive
                                ? "bg-sky-500 text-white shadow-lg"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                              }`
                            }
                          >
                            <ChildIcon size={18} />
                            <span className="font-medium text-sm">
                              {child.title}
                            </span>
                          </NavLink>
                        )
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-5 py-4 mb-2 transition-all duration-300 ${isActive
                    ? "bg-sky-500 text-white shadow-lg"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;