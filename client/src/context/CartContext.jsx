import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { fetchCart, saveCart } from "../services/api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartLoading, setCartLoading] = useState(true);

    // Fetch initial cart
    useEffect(() => {
        const loadCart = async () => {
            if (user) {
                try {
                    const res = await fetchCart();
                    if (res.success) {
                        setCartItems(res.cart || []);
                    }
                } catch (error) {
                    console.error("Cart retrieval error", error);
                    setCartItems([]);
                }
            } else {
                setCartItems([]); // Enforce empty cart for guests!
            }
            setCartLoading(false);
        };
        loadCart();
    }, [user]);

    // Save cart to backend whenever it changes
    const syncCart = async (newCart) => {
        setCartItems(newCart);
        if (user) {
            try {
                await saveCart(newCart);
            } catch (error) {
                console.error("Cart sync error", error);
            }
        }
    };

    const generateCartItemId = (product) => {
        if (!product.configuration || Object.keys(product.configuration).length === 0) return product._id;
        const configString = Object.entries(product.configuration)
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([k, v]) => `${k}:${v}`)
            .join('|');
        return `${product._id}|${configString}`;
    };

    const addToCart = (product) => {
        if (!user) return; // Prevent guests from modifying state

        const newCart = [...cartItems];
        const cartItemId = product.cartItemId || generateCartItemId(product);
        const existingIndex = newCart.findIndex(item => (item.cartItemId || item._id) === cartItemId);

        if (existingIndex !== -1) {
            newCart[existingIndex] = {
                ...newCart[existingIndex],
                quantity: newCart[existingIndex].quantity + product.quantity
            };
        } else {
            newCart.push({ ...product, cartItemId });
        }

        syncCart(newCart);
    };

    const updateQuantity = (identifier, newQuantity) => {
        if (!user || newQuantity < 1) return;
        const newCart = cartItems.map(item => (item.cartItemId || item._id) === identifier ? { ...item, quantity: newQuantity } : item);
        syncCart(newCart);
    };

    const removeFromCart = (identifier) => {
        if (!user) return;
        const newCart = cartItems.filter(item => (item.cartItemId || item._id) !== identifier);
        syncCart(newCart);
    };

    const clearCart = () => {
        syncCart([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const numericPrice = typeof item.price === "string" ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
            return total + (numericPrice * item.quantity);
        }, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, cartLoading, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
