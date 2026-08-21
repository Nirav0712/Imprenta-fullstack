import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";

import ProductCard from "../product/ProductCard";
import newArrivalsProducts from "../../data/newArrivalsProducts";

const NewArrivalsProducts = () => {
  return (
  <section className="py-20 bg-transparent">
     <div className="w-full mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">


        <div className="mb-8">

          <h2 className="text-3xl lg:text-4xl text-white font-bold text-gray-900">
            New Arrivals
          </h2>

        </div>

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

          {newArrivalsProducts.map((product) => (

            <SwiperSlide key={product.id}>

              <ProductCard product={product} />

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
};

export default NewArrivalsProducts;