import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiStar,
} from "react-icons/fi";

import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#101B2D] p-5">

      {/* Top */}

      <div className="flex gap-4">

        {product.mainImage?.url ? (
          <img
            src={product.mainImage.url}
            alt={product.name}
            className="h-20 w-20 rounded-2xl object-cover"
          />
        ) : product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="h-20 w-20 rounded-2xl object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 text-xs">No Img</div>
        )}

        <div className="flex-1">

          <h3 className="text-lg font-bold text-white">
            {product.name}
          </h3>

          <p className="mt-1 text-slate-400">
            {product.category?.name || "Uncategorized"}
          </p>

          <p className="mt-3 text-2xl font-bold text-sky-400">
            ₹{product.price}
          </p>

        </div>

      </div>

      {/* Status */}

      <div className="mt-5 flex items-center justify-between">

        <span
          className={`rounded-full px-4 py-2 text-sm font-medium ${product.status === "Published"
              ? "bg-green-500/20 text-green-400"
              : product.status === "Draft"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
        >
          {product.status}
        </span>

        {product.featured && (
          <div className="flex items-center gap-2 rounded-full bg-yellow-500/20 px-3 py-2 text-yellow-400">
            <FiStar />
            Featured
          </div>
        )}

      </div>

      {/* Actions */}

      <div className="mt-6 grid grid-cols-3 gap-3">

        <Link
          to={`/products/view/${product._id}`}
          className="flex items-center justify-center rounded-xl bg-sky-500/15 py-3 text-sky-400 transition hover:bg-sky-500 hover:text-white"
        >
          <FiEye />
        </Link>

        <Link
          to={`/products/edit/${product._id}`}
          className="flex items-center justify-center rounded-xl bg-yellow-500/15 py-3 text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
        >
          <FiEdit2 />
        </Link>

        <button
          onClick={() => onDelete(product)}
          className="flex items-center justify-center rounded-xl bg-red-500/15 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <FiTrash2 />
        </button>

      </div>

    </div>
  );
};

export default ProductCard;