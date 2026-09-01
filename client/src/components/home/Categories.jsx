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
          (c) => (c._id && current._id && c._id === current._id) ||
            (c.id && current.id && c.id === current.id) ||
            (c.slug && current.slug && c.slug === current.slug)
        );
        const nextIndex = (currentIndex >= 0 ? currentIndex + 1 : 1) % categories.length;
        return categories[nextIndex];
      });
    }, 4500); // 4.5 seconds per slide

    return () => clearInterval(timer);
  }, [categories, isHovering]);



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

      <div
        ref={scrollContainerRef}
        className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-3 xl:gap-5 mb-12 w-full"
      >
        {categories.map(cat => {
          const isActive = (activeCategory?._id && activeCategory._id === cat._id) ||
            (activeCategory?.id && activeCategory.id === cat.id) ||
            (activeCategory?.slug && activeCategory.slug === cat.slug);
          return (
            <button
              key={cat._id || cat.id || cat.slug}
              data-active={isActive}
              onMouseEnter={() => window.innerWidth >= 1024 && setActiveCategory(cat)}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-center whitespace-normal break-words px-3 py-2.5 sm:px-4 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 border shadow-lg flex items-center justify-center min-h-[48px] ${isActive
                ? 'bg-sky-500 border-sky-400 text-white shadow-sky-500/30 scale-105'
                : 'bg-white/5 border-white/10 text-slate-300 backdrop-blur-md hover:bg-white/10 hover:border-sky-400/50 hover:text-white'
                }`}
            >
              <span className="line-clamp-2">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Preview Area */}
      <div className="relative w-full min-h-[550px] sm:min-h-[500px] lg:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-[#0a1526]/80 backdrop-blur-xl group flex">
        {categories.map((cat, index) => {
          const isActive = (activeCategory?._id && activeCategory._id === cat._id) ||
            (activeCategory?.id && activeCategory.id === cat.id) ||
            (activeCategory?.slug && activeCategory.slug === cat.slug);

          // Front-end friendly copy enhancements based on category name
          const categoryName = cat.name?.toLowerCase() || '';
          let frontendFeatures = [];

          if (categoryName.includes('shrink')) {
            frontendFeatures = ["360° Custom Branding", "Tamper-Evident Security", "Vibrant Print Quality", "Conforms to Any Shape"];
          } else if (categoryName.includes('mono carton') || categoryName.includes('carton')) {
            frontendFeatures = ["Premium Die-Cut Precision", "Sustainable Materials", "High-Durability Finish", "Custom Embellishments"];
          } else if (categoryName.includes('tube')) {
            frontendFeatures = ["Leak-Proof Sealing", "Gloss & Matte Finishes", "Food-Grade Compliant", "Multi-Layer Protection"];
          } else if (categoryName.includes('label') || categoryName.includes('sticker')) {
            frontendFeatures = ["Water-Resistant Coating", "Strong Adhesive Bond", "UV Protected Inks", "Roll or Sheet Formats"];
          } else if (categoryName.includes('pouch') || categoryName.includes('flexible')) {
            frontendFeatures = ["High Barrier Protection", "Resealable Zippers", "Stand-Up Capabilities", "Extended Shelf Life"];
          } else {
            frontendFeatures = ["Premium Quality Output", "Customizable Dimensions", "Fast Turnaround Time", "Dedicated Support"];
          }

          const defaultDesc = `Discover our premium ${cat.name} packaging solutions designed to elevate your brand presence and ensure structural integrity. Crafted with precision and state-of-the-art technology to meet your exact specifications.`;

          return (
            <div
              key={cat._id || cat.id || cat.slug || index}
              className={`absolute inset-0 flex flex-col-reverse lg:flex-row transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              {/* Left Side: Content */}
              <div className="w-full lg:w-[55%] flex flex-col justify-center p-6 sm:p-10 lg:p-14 z-20 bg-[#0a1526] lg:bg-transparent lg:bg-gradient-to-r lg:from-[#0a1526] lg:via-[#0a1526]/95 lg:to-transparent">
                <div className={`transform transition-all duration-700 ease-out delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <div className="mb-4 inline-flex items-center">
                    <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-300 backdrop-blur-xl uppercase tracking-wider">
                      Product Showcase
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-slate-300 sm:text-lg leading-relaxed mb-8 max-w-xl line-clamp-3">
                    {cat.description || defaultDesc}
                  </p>

                  {/* Features / Supporting Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-lg">
                    {frontendFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/20 border border-sky-400/30">
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                        </div>
                        <span className="text-sm flex-1 sm:text-base text-slate-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="inline-flex items-center gap-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white px-7 py-3.5 font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(56,189,248,0.4)] border border-sky-400/50 group/btn"
                  >
                    <span>Explore Product</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Side: Image */}
              <div
                className={`relative w-full lg:w-[45%] h-[280px] sm:h-[400px] lg:h-full shrink-0 overflow-hidden transform transition-all duration-[1000ms] ease-out origin-right ${isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
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
                        className="w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    );
                  }
                  return <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Image Available</div>;
                })()}

                {/* Depth / Shadows overlay for image */}
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-[#0a1526]/40 pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1526] to-transparent lg:hidden pointer-events-none"></div>
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a1526] to-transparent hidden lg:block pointer-events-none"></div>
                <div className="absolute inset-0 lg:border-l border-white/10 pointer-events-none"></div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default Categories;