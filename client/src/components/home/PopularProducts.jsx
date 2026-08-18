import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";

import { fetchProducts } from "../../services/api";
import ProductCard from "../product/ProductCard";

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        const products = data.products || [];
        setPopularProducts(products.filter((p) => p.bestSeller));
        setError(null);
      } catch (err) {
        setError("Failed to load products.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  return (
    <section className="py-20 bg-transparent">

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">


        {/* Heading */}

        <div className="mb-8">

          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Our Most Popular Products
          </h2>

        </div>

        {/* Loading / Error States */}
        {loading && <div className="text-white">Loading products...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && !error && popularProducts.length === 0 && (
          <div className="text-slate-400">No popular products available right now.</div>
        )}

        {/* Slider */}
        {!loading && !error && popularProducts.length > 0 && (

          <Swiper
            modules={[FreeMode]}
            freeMode
            grabCursor
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },

              480: {
                slidesPerView: 1.6,
              },

              640: {
                slidesPerView: 2.2,
              },

              768: {
                slidesPerView: 3,
              },

              1024: {
                slidesPerView: 4,
              },

              1280: {
                slidesPerView: 5,
              },

              1536: {
                slidesPerView: 6,
              },
            }}
          >

            {popularProducts.map((product) => (

              <SwiperSlide key={product._id || product.id || product.slug}>

                <ProductCard product={product} />

              </SwiperSlide>

            ))}

          </Swiper>
        )}

      </div>

    </section>
  );
};

export default PopularProducts;