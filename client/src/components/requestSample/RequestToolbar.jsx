import { useState } from "react";
import { useTemplates } from "../../context/TemplateContext";
import {
    FiSearch,
    FiGrid,
    FiList,
    FiChevronDown,
    FiX,
    FiFilter,
} from "react-icons/fi";

import MobileFilterDrawer from "./MobileFilterDrawer";

const RequestToolbar = () => {

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const {
        search,
        setSearch,
        sort,
        setSort,
        view,
        setView,
        filteredTemplates,
        categories,
        setCategories,
        clearFilters,
    } = useTemplates();

    return (
        <section className="relative py-8">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

                {/* Breadcrumb */}

                <div className="flex flex-wrap items-center gap-2 text-sm">

                    <span className="cursor-pointer text-slate-400 transition hover:text-white">
                        Home
                    </span>

                    <span className="text-slate-600">/</span>

                    <span className="cursor-pointer text-slate-400 transition hover:text-white">
                        Products
                    </span>

                    <span className="text-slate-600">/</span>

                    <span className="font-medium text-sky-400">
                        Request Sample
                    </span>

                </div>

                {/* Toolbar */}

                <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">

                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                        {/* Search */}

                        <div className="relative flex-1">

                            <FiSearch
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                size={20}
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search templates..."
                                className="
    h-14
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/5
    pl-14
    pr-5
    text-white
    placeholder:text-slate-500
    outline-none
    transition-all
    focus:border-sky-400
    focus:bg-white/10
  "
                            />

                        </div>

                        {/* Right Buttons */}

                        <div className="flex flex-wrap items-center gap-3">

                            {/* Mobile Filter */}

                            <button
                                onClick={() => setMobileFilterOpen(true)}
                                className="
                  flex
                  xl:hidden
                  h-14
                  px-6
                  rounded-2xl
                  bg-sky-500
                  text-white
                  font-medium
                  items-center
                  gap-2
                  transition
                  hover:bg-sky-600
                "
                            >
                                <FiFilter size={18} />
                                Filters
                            </button>

                         {/* Grid / List Toggle (Desktop Only) */}

<div className="hidden lg:flex items-center gap-3">

  {/* Grid */}

  <button
    onClick={() => setView("grid")}
    className={`
      h-14
      w-14
      rounded-2xl
      border
      flex
      items-center
      justify-center
      transition

      ${
        view === "grid"
          ? "border-sky-400 bg-sky-500/15 text-sky-300"
          : "border-white/10 bg-white/5 text-slate-400 hover:border-sky-400 hover:text-white"
      }
    `}
  >
    <FiGrid size={20} />
  </button>

  {/* List */}

  <button
    onClick={() => setView("list")}
    className={`
      h-14
      w-14
      rounded-2xl
      border
      flex
      items-center
      justify-center
      transition

      ${
        view === "list"
          ? "border-sky-400 bg-sky-500/15 text-sky-300"
          : "border-white/10 bg-white/5 text-slate-400 hover:border-sky-400 hover:text-white"
      }
    `}
  >
    <FiList size={20} />
  </button>

</div>

                            {/* Sort */}

                            <div className="relative hidden xl:block">

                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="
      h-14
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-6
      pr-10
      text-white
      outline-none
      transition
      hover:border-sky-400
      focus:border-sky-400
      appearance-none
      cursor-pointer
    "
                                >
                                    <option value="latest" className="bg-[#081525]">
                                        Latest
                                    </option>

                                    <option value="price-low" className="bg-[#081525]">
                                        Price : Low → High
                                    </option>

                                    <option value="price-high" className="bg-[#081525]">
                                        Price : High → Low
                                    </option>

                                    <option value="rating" className="bg-[#081525]">
                                        Highest Rated
                                    </option>
                                </select>

                                <FiChevronDown
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Bottom */}

                    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <p className="text-slate-400">

                            <span className="font-bold text-white">

                                {filteredTemplates.length}

                            </span>

                            {" "}Premium Templates

                        </p>

                        {/* Active Filters */}

                        <div className="flex flex-wrap items-center gap-3">

                            {search && (

                                <button
                                    onClick={() => setSearch("")}
                                    className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-sky-400/20
        bg-sky-500/10
        px-4
        py-2
        text-sky-300
        transition
        hover:bg-sky-500/20
      "
                                >
                                    Search : {search}
                                    <FiX size={16} />
                                </button>

                            )}

                            {categories.map((category) => (

                                <button
                                    key={category}
                                    onClick={() =>
                                        setCategories(
                                            categories.filter((c) => c !== category)
                                        )
                                    }
                                    className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-sky-400/20
        bg-sky-500/10
        px-4
        py-2
        text-sky-300
        transition
        hover:bg-sky-500/20
      "
                                >
                                    {category}
                                    <FiX size={16} />
                                </button>

                            ))}

                            {sort !== "latest" && (

                                <button
                                    onClick={() => setSort("latest")}
                                    className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-sky-400/20
        bg-sky-500/10
        px-4
        py-2
        text-sky-300
      "
                                >
                                    Sort
                                    <FiX size={16} />
                                </button>

                            )}

                            {(search || categories.length || sort !== "latest") && (

                                <button
                                    onClick={clearFilters}
                                    className="
        rounded-full
        bg-red-500/10
        border
        border-red-400/20
        px-5
        py-2
        text-red-300
        transition
        hover:bg-red-500/20
      "
                                >
                                    Clear All
                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* Mobile Filter Drawer */}

            <MobileFilterDrawer
                open={mobileFilterOpen}
                onClose={() => setMobileFilterOpen(false)}
            />

        </section>
    );
};

export default RequestToolbar;