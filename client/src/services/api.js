import axios from "axios";

// Use environment variable with fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Helper for image URLs
const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    // Remove backend api part from API_URL base
    // Example: "http://localhost:5000/api" -> "http://localhost:5000"
    const BASE_URL = API_URL.replace(/\/api$/, "");
    return `${BASE_URL}/${imagePath.replace(/\\/g, "/")}`;
};

// Mapper logic
const mapProduct = (p) => ({
    ...p,
    id: p.slug,
    title: p.name,
    image: getImageUrl(p.mainImage?.url || p.images?.[0]?.url),
    price: "₹" + p.price,
    salePrice: p.salePrice ? "₹" + p.salePrice : null,
    discount: p.discount,
    showPrice: p.showPrice,
});

// Products
export const fetchProducts = async (params = {}) => {
    const response = await api.get("/products", { params });
    if (response.data?.products) {
        return { ...response.data, products: response.data.products.map(mapProduct) };
    }
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    if (response.data?.product) {
        return { ...response.data, product: mapProduct(response.data.product) };
    }
    return response.data;
};

export const fetchProductBySlug = async (slug) => {
    const response = await api.get(`/products/slug/${slug}`);
    if (response.data?.product) {
        return { ...response.data, product: mapProduct(response.data.product) };
    }
    return response.data;
};

const mapCategory = (c) => ({
    ...c,
    image: getImageUrl(c.image)
});

// Categories
export const fetchCategories = async () => {
    const response = await api.get("/categories");
    // Ensure we handle both scenarios where response is array or wrapped
    let parsedCategories = response.data;
    if (Array.isArray(response.data)) {
        parsedCategories = response.data.map(mapCategory);
    } else if (response.data?.categories) {
        parsedCategories = {
            ...response.data,
            categories: response.data.categories.map(mapCategory)
        };
    } else if (response.data?.data) { // some standard setups nest in 'data'
        if (Array.isArray(response.data.data)) {
            parsedCategories = {
                ...response.data,
                data: response.data.data.map(mapCategory)
            };
        }
    }
    return parsedCategories;
};

// Submitting Forms
export const submitContact = async (contactData) => {
    const response = await api.post("/contact", contactData);
    return response.data;
};

export const submitInquiry = async (inquiryData) => {
    const response = await api.post("/inquiries", inquiryData);
    return response.data;
};

// CMS & Settings
export const fetchHomepage = async () => {
    const response = await api.get("/homepage");
    return response.data;
};

export const fetchOrders = async () => (await api.get("/orders")).data;
export const fetchOrderById = async (id) => (await api.get(`/orders/${id}`)).data;

// USER CART
export const fetchCart = async () => (await api.get("/auth/cart")).data;
export const saveCart = async (cart) => (await api.put("/auth/cart", { cart })).data;

export const fetchSettings = async () => {
    const response = await api.get("/settings");
    return response.data;
};

export default api;
