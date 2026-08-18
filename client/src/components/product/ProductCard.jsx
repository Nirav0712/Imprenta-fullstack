import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import InquiryModal from "./InquiryModal";

const ProductCard = ({ product, hidePrice = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInquireClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="group block cursor-pointer"
      >

        {/* Card */}
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sky-400">

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-20 rounded-full bg-sky-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
              {product.badge}
            </div>
          )}

          {/* Image */}
          <div className="aspect-[1/1] overflow-hidden">

            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105 bg-white"
              />
            ) : null}
            <div className="h-full w-full bg-white/5 flex items-center justify-center text-slate-500 font-semibold text-sm border border-white/10" style={{ display: product.image ? 'none' : 'flex' }}>
              No Image
            </div>

          </div>

        </div>

        {/* Content */}

        <div className="mt-4 px-1">

          <h3 className="line-clamp-2 text-[18px] font-semibold text-white transition duration-300 group-hover:text-sky-400">
            {product.title}
          </h3>

          {product.showPrice !== false ? (
            !hidePrice && (
              <>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold text-sky-400">
                  {product.salePrice ? (
                    <>
                      <span className="text-slate-400 line-through text-sm">{product.price}</span>
                      <span>{product.salePrice}</span>
                    </>
                  ) : (
                    <span>{product.price}</span>
                  )}
                </p>
              </>
            )
          ) : (
            <div className="mt-4">
              <button
                onClick={handleInquireClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-sky-500 hover:text-white"
              >
                Inquire for Price
              </button>
            </div>
          )}

          {hidePrice && product.showPrice !== false && (
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors group-hover:text-sky-400">
              Explore Product <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </div>
          )}

        </div>

      </Link>
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
    </>
  );
};

export default ProductCard;