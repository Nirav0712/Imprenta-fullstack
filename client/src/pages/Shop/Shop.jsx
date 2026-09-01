import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../../services/api";
import ProductCard from "../../components/product/ProductCard";
import { FiBox } from "react-icons/fi";

const Shop = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // Fetch categories to resolve ID to Name
                const catsRaw = await fetchCategories();
                let categoriesList = [];
                if (catsRaw && catsRaw.categories) {
                    categoriesList = catsRaw.categories;
                } else if (Array.isArray(catsRaw)) {
                    categoriesList = catsRaw;
                } else if (catsRaw && catsRaw.data) {
                    categoriesList = catsRaw.data;
                }

                let matchedCategory = null;
                if (categoryParam) {
                    matchedCategory = categoriesList.find(c => String(c._id) === String(categoryParam) || String(c.id) === String(categoryParam) || c.slug === categoryParam);
                    setActiveCategory(matchedCategory);
                } else {
                    setActiveCategory(null);
                }

                const params = {};
                if (categoryParam) {
                    // Send correct API param expected by the backend
                    params.category = matchedCategory ? (matchedCategory._id || matchedCategory.id) : categoryParam;
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
    }, [categoryParam]);

    return (
        <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--theme-background)' }}>
            {/* Header Banner */}
            <div className="relative pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-16 lg:pb-12 px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 overflow-hidden border-b border-white/5" style={{ backgroundColor: 'var(--theme-surface)' }}>
                <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none"></div>
                <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none"></div>

                <div className="relative max-w-[900px] mx-auto flex flex-col items-center text-center z-10 w-full">
                    {/* Category Label */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-sky-400 uppercase">
                        <FiBox size={14} className="shrink-0" />
                        <span>{activeCategory ? "Category Filter" : "Our Collection"}</span>
                    </div>

                    {/* Title */}
                    <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-white leading-[1.15] break-words max-w-full">
                        {activeCategory ? activeCategory.name : "All Products"}
                    </h1>

                    {/* Description */}
                    <div className="mt-4 text-[15px] sm:text-[17px] leading-[1.6] text-slate-400 font-medium break-words space-y-3 max-w-full lg:max-w-[750px] px-2 sm:px-0">
                        {activeCategory?.description
                            ? activeCategory.description.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                            : activeCategory
                                ? <p>{`Explore our premium range of ${activeCategory.name} products tailored to meet your high-quality packaging and printing needs.`}</p>
                                : <p>Discover our comprehensive catalog of professional printing and packaging solutions designed for businesses.</p>}
                    </div>
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
