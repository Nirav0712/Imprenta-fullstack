import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchCategories } from "../../services/api";

import category1 from "../../assets/images/categories/category-1.png";
import category2 from "../../assets/images/categories/category-2.png";
import category3 from "../../assets/images/categories/category-3.png";
import category4 from "../../assets/images/categories/category-4.png";
import category5 from "../../assets/images/categories/category-5.png";
import category6 from "../../assets/images/categories/category-6.png";

const imageMap = {
  "category-1.png": category1,
  "category-2.png": category2,
  "category-3.png": category3,
  "category-4.png": category4,
  "category-5.png": category5,
  "category-6.png": category6,
};

const getSrcFromMap = (path) => {
  if (!path) return null;
  const filename = path.split(/[\\/]/).pop();
  return imageMap[filename] || null;
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        let dbCategories = [];
        if (Array.isArray(res)) {
          dbCategories = res;
        } else if (res && res.categories) {
          dbCategories = res.categories;
        }

        // Filter only active categories
        const activeCategories = dbCategories.filter(cat => cat.status === "active");
        setCategories(activeCategories);

        if (activeCategories.length > 0) {
          setActiveCategory(activeCategories[0]);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (isHovering || categories.length === 0) return;

    const timer = setInterval(() => {
      setActiveCategory((current) => {
        if (!current) return categories[0];
        const currentIndex = categories.findIndex(
          (c) => c._id === current._id || c.slug === current.slug
        );
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 4500); // 4.5 seconds per slide

    return () => clearInterval(timer);
  }, [categories, isHovering]);

  useEffect(() => {
    if (activeCategory && scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeBtn && window.innerWidth < 1024) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeCategory]);

  return (
    <section
      className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 pt-12 pb-16"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
    >

      {/* Section Heading */}
      <div className="text-center mb-10 lg:mb-14">
        <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-sky-400">
          WHAT WE OFFER
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Our Services
        </h2>
      </div>

      {/* Category Pills Slider */}
      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth items-center justify-start lg:justify-center gap-3 sm:gap-4 lg:gap-3 xl:gap-5 mb-12 w-full pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map(cat => (
          <button
            key={cat._id || cat.slug}
            data-active={activeCategory?._id === cat._id}
            onMouseEnter={() => window.innerWidth >= 1024 && setActiveCategory(cat)}
            onClick={() => setActiveCategory(cat)}
            className={`snap-center whitespace-nowrap shrink-0 px-5 py-2.5 sm:px-6 sm:py-3 lg:px-5 lg:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 border shadow-lg ${activeCategory?._id === cat._id
              ? 'bg-sky-500 border-sky-400 text-white shadow-sky-500/30 scale-105'
              : 'bg-white/5 border-white/10 text-slate-300 backdrop-blur-md hover:bg-white/10 hover:border-sky-400/50 hover:text-white'
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Preview Area */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)] group bg-[#0a1526]">
        {categories.map(cat => (
          <div
            key={cat._id || cat.slug}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeCategory?._id === (cat._id || cat.slug) ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Image Source resolution */}
            {(() => {
              const mappedSrc = getSrcFromMap(cat.image);
              const finalSrc = mappedSrc || cat.image;
              if (finalSrc) {
                return (
                  <img
                    src={finalSrc}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                );
              }
              return <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Image Available</div>;
            })()}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/60 to-transparent"></div>

            {/* Content Block */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 lg:p-14 flex flex-col md:flex-row md:items-end justify-between gap-6 transform transition-all duration-700 translate-y-0 opacity-100">
              <div className="flex-1 max-w-3xl">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">{cat.name}</h3>
                {cat.description && (
                  <p className="text-slate-300 lg:text-lg leading-relaxed line-clamp-2 md:line-clamp-3">
                    {cat.description}
                  </p>
                )}
              </div>
              <Link
                to={`/products?category=${cat.slug}`}
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
              >
                Explore Products <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Categories;