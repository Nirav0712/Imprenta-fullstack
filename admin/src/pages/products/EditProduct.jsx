import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import ProductForm from "../../components/products/form/ProductForm";
import { productService } from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getProduct(id);
        if (res && res.product) {
          // Map backend fields to frontend format
          const mappedData = {
            ...res.product,
            productName: res.product.name,
            regularPrice: res.product.price,
            category: res.product.category?._id || res.product.category,
          };
          setProduct(mappedData);
        }
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-slate-400 py-10">Loading product data...</div>;
  }

  if (!product) {
    return <div className="text-red-400 py-10">Product not found.</div>;
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
          >
            <FiArrowLeft />
            Back to Products
          </Link>

          <h1 className="mt-4 text-4xl font-black text-white">
            Edit Product
          </h1>

          <p className="mt-2 text-slate-400">
            Update your product information.
          </p>

        </div>

      </div>

      <ProductForm isEdit={true} initialData={product} productId={id} />

    </div>
  );
};

export default EditProduct;