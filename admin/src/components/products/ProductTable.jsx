import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiStar,
} from "react-icons/fi";

import ProductCard from "./ProductCard";
import DeleteModal from "../common/modal/DeleteModal";

import { productService } from "../../services/productService";

const ProductTable = ({
  search = "",
  category = "All",
  status = "All",
}) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts();
      if (res && res.products) {
        setProducts(res.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {

    return products.filter((item) => {

      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" ||
        item.category?._id === category ||
        item.category?.name === category;

      const matchStatus =
        status === "All" ||
        item.status === status;

      return (
        matchSearch &&
        matchCategory &&
        matchStatus
      );

    });

  }, [products, search, category, status]);

  const handleDeleteClick = (product) => {

    setSelectedProduct(product);

    setDeleteOpen(true);

  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await productService.deleteProduct(selectedProduct._id);
      setDeleteOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#101B2D]">

        {/* Desktop */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead className="border-b border-white/10">

              <tr className="text-left text-slate-400">

                <th className="px-6 py-5">Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Status</th>
                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : null}

              {!loading && filteredProducts.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/5"
                >

                  <td className="px-6 py-5">
                    {item.mainImage?.url ? (
                      <img
                        src={item.mainImage.url}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                    ) : item.images?.[0]?.url ? (
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 text-xs">No Img</div>
                    )}
                  </td>

                  <td className="font-semibold text-white">
                    {item.name}
                  </td>

                  <td className="text-slate-400">
                    {item.category?.name || "Uncategorized"}
                  </td>

                  <td className="font-semibold text-sky-400">
                    ₹{item.price}
                  </td>

                  <td>

                    <button
                      className={`rounded-full p-2 ${item.featured
                        ? "bg-yellow-500 text-white"
                        : "bg-white/10 text-slate-500"
                        }`}
                    >
                      <FiStar />
                    </button>

                  </td>

                  <td>

                    <span
                      className={`rounded-full px-4 py-2 text-sm ${item.status === "Published"
                        ? "bg-green-500/20 text-green-400"
                        : item.status === "Draft"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/products/view/${item._id}`}
                        className="rounded-xl bg-sky-500/20 p-3 text-sky-400 hover:bg-sky-500 hover:text-white transition"
                      >
                        <FiEye />
                      </Link>

                      <Link
                        to={`/products/edit/${item._id}`}
                        className="rounded-xl bg-yellow-500/20 p-3 text-yellow-400 hover:bg-yellow-500 hover:text-white transition"
                      >
                        <FiEdit2 />
                      </Link>

                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="rounded-xl bg-red-500/20 p-3 text-red-400 hover:bg-red-500 hover:text-white transition"
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile */}

        <div className="space-y-5 p-5 lg:hidden">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDeleteClick}
            />
          ))}

        </div>

      </div>

      <DeleteModal
        isOpen={deleteOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ProductTable;