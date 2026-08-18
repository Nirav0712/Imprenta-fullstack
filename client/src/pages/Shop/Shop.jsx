import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../services/api";
import ProductCard from "../../components/product/ProductCard";
import { FiBox } from "react-icons/fi";

const Shop = () => {
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get("category");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const params = {};
                if (categorySlug) {
                    params.categorySlug = categorySlug;
                }

                const res = await fetchProducts(params);
                if (res?.products) {
                    setProducts(res.products);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Failed to fetch products for shop", err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [categorySlug]);

    return (
        <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--theme-background)' }}>
            {/* Header Banner */}
            <div className="relative pt-32 pb-20 px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 overflow-hidden border-b border-white/5" style={{ backgroundColor: 'var(--theme-surface)' }}>
                <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none"></div>
                <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none"></div>

                <div className="relative max-w-4xl">
                    <p className="text-sky-400 font-semibold tracking-[3px] uppercase text-sm mb-4 flex items-center gap-2">
                        <FiBox />
                        {categorySlug ? "Category Filter" : "Our Collection"}
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white capitalize">
                        {categorySlug ? categorySlug.replace(/-/g, " ") : "All Products"}
                    </h1>
                    <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-2xl">
                        {categorySlug
                            ? `Explore our premium range of ${categorySlug.replace(/-/g, " ")} products tailored to meet your high-quality packaging and printing needs.`
                            : "Discover our comprehensive catalog of professional printing and packaging solutions designed for businesses."}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 pt-12">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="h-96 rounded-[22px] bg-white/5 border border-white/10 animate-pulse"></div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id || product._id} product={product} hidePrice={true} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-[30px] border-dashed">
                        <FiBox className="text-6xl text-slate-600 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
                        <p className="text-slate-400 max-w-md">
                            We couldn't find any products in this category. They might be out of stock or currently being updated.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
