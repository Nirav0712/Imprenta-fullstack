import { useEffect, useState } from "react";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { productService } from "../../services/productService";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getProduct(id);
        if (res && res.product) {
          setProduct(res.product);
        }
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-slate-400 py-10 px-8">Loading product details...</div>;
  }

  return (
    <div className="space-y-8">

      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
      >
        <FiArrowLeft />
        Back to Products
      </Link>

      <div className="rounded-3xl border border-white/10 bg-[#101B2D] p-10">

        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-black text-white">
            {product.name}
          </h1>
          <Link to={`/products/edit/${id}`} className="bg-yellow-500/20 text-yellow-500 px-5 py-2 rounded-xl font-semibold flex items-center gap-2">
            <FiEdit /> Edit
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-slate-400 uppercase tracking-widest text-xs font-semibold mb-1">Category</p>
            <p className="text-white text-lg">{product.category?.name}</p>

            <p className="text-slate-400 uppercase tracking-widest text-xs font-semibold mt-6 mb-1">Price</p>
            <p className="text-sky-400 text-2xl font-bold bg-sky-500/10 inline-block px-4 py-1 rounded-xl">₹{product.price}</p>

            <p className="text-slate-400 uppercase tracking-widest text-xs font-semibold mt-6 mb-2">Description</p>
            <p className="text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl">{product.description || "No description provided."}</p>
          </div>

          <div>
            {product.mainImage?.url || product.images?.[0]?.url ? (
              <img src={product.mainImage?.url || product.images[0].url} alt={product.name} className="w-full max-w-sm rounded-3xl border border-white/10" />
            ) : (
              <div className="w-full h-48 max-w-sm rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-500">No Image</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ViewProduct;