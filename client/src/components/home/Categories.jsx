import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

import category1 from "../../assets/images/categories/category-1.png";
import category2 from "../../assets/images/categories/category-2.png";
import category3 from "../../assets/images/categories/category-3.png";
import category4 from "../../assets/images/categories/category-4.png";
import category5 from "../../assets/images/categories/category-5.png";
import category6 from "../../assets/images/categories/category-6.png";

import { useState, useEffect } from "react";
import { fetchCategories, fetchHomepage } from "../../services/api";

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
  const [cmsData, setCmsData] = useState(null);

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
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    const loadCMS = async () => {
      try {
        const res = await fetchHomepage();
        if (res?.data && res.data.active) {
          setCmsData(res.data);
        }
      } catch (err) {
        console.error("Failed to load CMS", err);
      }
    };
    loadCategories();
    loadCMS();
  }, []);

  return (
    <section className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
      {/* Section Heading */}
      <div className="w-full mb-7 sm:mb-9 lg:mb-10 flex items-end justify-between">
        <div>
          {cmsData?.servicesDescription && (
            <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-sky-400">
              {cmsData.servicesDescription}
            </p>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {cmsData?.servicesTitle || "Explore all categories"}
          </h2>
        </div>
      </div>

      {/* Category Slider */}
      <Swiper
        modules={[FreeMode]}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.8,
        }}
        grabCursor={true}
        centerInsufficientSlides={true}
        watchOverflow={true}
        spaceBetween={14}
        className="!overflow-visible"
        breakpoints={{
          0: {
            slidesPerView: 1.25,
            spaceBetween: 12,
          },

          480: {
            slidesPerView: 2.1,
            spaceBetween: 14,
          },

          640: {
            slidesPerView: 2.7,
            spaceBetween: 16,
          },

          768: {
            slidesPerView: 3.5,
            spaceBetween: 18,
          },

          1024: {
            slidesPerView: 4.5,
            spaceBetween: 18,
          },

          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },

          1440: {
            slidesPerView: 5.5,
            spaceBetween: 20,
          },

          1600: {
            slidesPerView: 6,
            spaceBetween: 22,
          },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={item._id || index}>
            <Link to={`/products?category=${item.slug}`} className="block group cursor-pointer">

              {/* Image Card */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-white/10
                  bg-white
                  shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-500
                  group-hover:-translate-y-1.5
                  group-hover:border-sky-400/40
                  group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.28)]
                "
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">

                  {getSrcFromMap(item.image) ? (
                    <img
                      src={getSrcFromMap(item.image)}
                      alt={item.name}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  ) : item.image && !getSrcFromMap(item.image) ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  {(!item.image || (!getSrcFromMap(item.image) && !item.image)) && (
                    <div className="h-full w-full flex items-center justify-center bg-slate-200 text-slate-500 font-semibold" style={item.image && !getSrcFromMap(item.image) ? { display: 'none' } : {}}>
                      No Image
                    </div>
                  )}

                  {/* Soft Overlay */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/20
                      via-transparent
                      to-transparent
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* Number */}
                  <div
                    className="
                      absolute
                      left-3
                      top-3
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/40
                      bg-black/30
                      text-xs
                      font-semibold
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mt-3.5 px-1">
                <h3
                  className="
                    text-sm
                    sm:text-[15px]
                    lg:text-base
                    font-semibold
                    leading-6
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-sky-400
                  "
                >
                  {item.name}
                </h3>

                {/* Small Underline */}
                <div
                  className="
                    mt-2
                    h-[2px]
                    w-0
                    rounded-full
                    bg-sky-400
                    transition-all
                    duration-500
                    group-hover:w-8
                  "
                />
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Categories;