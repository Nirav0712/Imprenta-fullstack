import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";

import labelsProducts from "../../data/labelsProducts";
import ProductCard from "../product/ProductCard";

const LabelsPackagingProducts = () => {
  return (
    <section className="py-20 bg-transparent">

        <div className="w-full mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">


        {/* Heading */}

        <div className="mb-8">

          <h2 className="text-3xl lg:text-4xl font-bold text-white text-gray-900">
            Labels, Stickers and Packaging
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
          {labelsProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
};

export default LabelsPackagingProducts;