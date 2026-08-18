import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { fetchProducts } from "../../services/api";
import ProductCard from "../product/ProductCard";

const CategoryProductSection = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const res = await fetchProducts({ categorySlug: category.slug });
                if (res?.products) {
                    // Limit to 4 products for the homepage
                    setProducts(res.products.slice(0, 4));
                }
            } catch (err) {
                console.error(`Failed to load products for ${category.name}`, err);
            } finally {
                setLoading(false);
            }
        };
        if (category?.slug) {
            loadProducts();
        }
    }, [category]);

    if (loading) {
        return (
            <section className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 py-10 opacity-50">
                <div className="mb-6 h-8 w-64 bg-white/10 rounded animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="h-[320px] bg-white/5 border border-white/10 rounded-[22px] animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    const hasProducts = products && products.length > 0;

    return (
        <section className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 py-12 lg:py-16 border-t border-white/5">
            <div className="w-full mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-3xl">
                    <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                        {category.name}
                    </h2>
                    {category.description && (
                        <p className="mt-3 text-slate-400 text-lg">
                            {category.description}
                        </p>
                    )}
                </div>
                <Link
                    to={`/products?category=${category.slug}`}
                    className="group inline-flex items-center gap-2 font-semibold text-sky-400 transition-colors hover:text-sky-300"
                >
                    View All <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {hasProducts ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id || product._id} product={product} hidePrice={true} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-10 lg:p-14 rounded-[22px] border border-dashed border-white/10 bg-white/5 text-center">
                    <h3 className="text-xl font-bold text-slate-300 mb-2">New Products Coming Soon</h3>
                    <p className="text-slate-500 max-w-md">Our premium {category.name} are currently being updated. Check back soon or contact us for immediate requirements.</p>
                </div>
            )}
        </section>
    );
};

export default CategoryProductSection;
