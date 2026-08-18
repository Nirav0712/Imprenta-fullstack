import { useState, useEffect } from "react";
import { fetchCategories } from "../../services/api";
import CategoryProductSection from "./CategoryProductSection";

const CategoryProductShowcase = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetchCategories();
                let dbCategories = [];
                if (Array.isArray(res)) {
                    dbCategories = res;
                } else if (res && res.categories) {
                    dbCategories = res.categories;
                }

                // Only active categories mapped
                const activeCategories = dbCategories.filter(cat => cat.status === "active");
                setCategories(activeCategories);
            } catch (err) {
                console.error("Failed to load categories for showcase", err);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    if (loading) {
        return null; // The internal sections have their own skeletons anyway, or we wait silently
    }

    return (
        <div className="flex flex-col gap-4">
            {categories.map((category) => (
                <CategoryProductSection key={category._id || category.slug} category={category} />
            ))}
        </div>
    );
};

export default CategoryProductShowcase;
