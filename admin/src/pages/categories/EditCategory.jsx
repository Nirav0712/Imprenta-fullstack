import { FiArrowLeft, FiEdit2, FiImage } from "react-icons/fi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryForm from "../../components/categories/CategoryForm";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Linked Products State
    const [linkedProducts, setLinkedProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const res = await categoryService.getCategory(id);
                if (res.success && res.category) {
                    setInitialData(res.category);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        const fetchProducts = async () => {
            try {
                const res = await productService.getProducts({ category: id });
                if (res.success && Array.isArray(res.products)) {
                    setLinkedProducts(res.products);
                }
            } catch (err) {
                console.error("Failed to load associated products", err);
            } finally {
                setProductsLoading(false);
            }
        };

        if (id) {
            fetchCat();
            fetchProducts();
        }
    }, [id]);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    if (error || !initialData) {
        return <div className="text-white">Failed to load category details.</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <Link
                        to="/categories"
                        className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
                    >
                        <FiArrowLeft />
                        Back to Categories
                    </Link>
                    <h1 className="mt-4 text-4xl font-black text-white">Edit Category</h1>
                    <p className="mt-2 text-slate-400">Manage category information and product configurator mapping.</p>
                </div>
            </div>

            <CategoryForm isEdit={true} initialData={initialData} categoryId={id} />

            {/* Linked Products Section */}
            <div className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8 mt-8">
                <h2 className="text-2xl font-bold text-white mb-2">Products in This Category</h2>
                <p className="text-sm text-slate-400 mb-6">These products automatically inherit this category's configurator settings.</p>

                {productsLoading ? (
                    <div className="py-8 text-center text-slate-500">Loading products...</div>
                ) : linkedProducts.length === 0 ? (
                    <div className="py-10 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center text-slate-500">
                        <p className="font-semibold">No products are currently assigned to this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {linkedProducts.map((product) => (
                            <div key={product._id} className="flex items-start gap-4 p-4 bg-[#08111F] rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-sm">
                                <div className="w-16 h-16 shrink-0 bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
                                    {product.mainImage?.url || product.images?.[0]?.url ? (
                                        <img src={product.mainImage?.url || product.images?.[0]?.url} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <FiImage size={24} className="text-slate-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white text-base truncate" title={product.name}>{product.name}</h3>
                                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                        {product.sku && <span className="bg-white/5 px-2 py-0.5 rounded">SKU: {product.sku}</span>}
                                        <span className={product.status === 'Published' ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>{product.status}</span>
                                    </div>
                                    <p className="text-sky-400 font-bold mt-2 text-sm">{product.price ? `₹${product.price}` : 'Price not set'}</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/products/edit/${product._id}`)}
                                    className="shrink-0 p-2 bg-white/5 text-slate-400 hover:text-white hover:bg-sky-500 hover:border-transparent border border-white/10 rounded-lg transition"
                                    title="Edit Product"
                                >
                                    <FiEdit2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditCategory;
