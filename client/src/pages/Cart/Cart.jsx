import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <section className="min-h-screen py-24 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <FiTrash2 size={32} className="text-slate-400" />
                </div>
                <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--theme-heading)' }}>Your Cart is Empty</h1>
                <p className="text-slate-400 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our premium packaging products!</p>
                <Link to="/products" className="rounded-xl px-8 py-4 font-semibold shadow-lg transition-all hover:opacity-90 hover:scale-[1.02]" style={{ backgroundColor: 'var(--theme-button)', color: 'var(--theme-heading)' }}>
                    Explore Products
                </Link>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-24">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-10" style={{ color: 'var(--theme-heading)' }}>Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.cartItemId || item.productId || item._id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl border border-white/10 backdrop-blur-xl" style={{ backgroundColor: 'var(--theme-surface)' }}>
                                <div className="w-full sm:w-32 h-32 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <span className="text-slate-500 text-sm">No Image</span>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold" style={{ color: 'var(--theme-heading)' }}>{item.name}</h3>
                                            {item.configuration && Object.keys(item.configuration).length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                    {Object.entries(item.configuration).map(([key, val]) => (
                                                        <div key={key} className="text-xs text-slate-400">
                                                            <span className="uppercase tracking-widest font-semibold">{key}: </span>
                                                            <span className="text-slate-300">{val}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={() => removeFromCart(item.cartItemId || item._id)} className="text-slate-400 hover:text-red-400 transition">
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center rounded-xl border border-white/10 bg-black/20 p-1">
                                            <button onClick={() => updateQuantity(item.cartItemId || item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white disabled:opacity-30" disabled={item.quantity <= 1}>
                                                <FiMinus />
                                            </button>
                                            <span className="w-10 text-center font-medium text-white">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartItemId || item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white">
                                                <FiPlus />
                                            </button>
                                        </div>

                                        <div className="text-xl font-bold" style={{ color: 'var(--theme-accent)' }}>
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-3xl border border-white/10 p-6 lg:p-8 sticky top-32" style={{ backgroundColor: 'var(--theme-surface)' }}>
                            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--theme-heading)' }}>Order Summary</h2>

                            <div className="space-y-4 text-slate-300">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>₹{getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax (18% GST)</span>
                                    <span>₹{(getCartTotal() * 0.18).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>

                                <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-xl font-bold" style={{ color: 'var(--theme-heading)' }}>Total</span>
                                    <span className="text-2xl font-black" style={{ color: 'var(--theme-accent)' }}>
                                        ₹{(getCartTotal() * 1.18).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-slate-400 mt-4 text-center">Taxes calculated securely at checkout. GST invoice will be provided.</p>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full mt-8 flex items-center justify-center gap-2 rounded-xl py-4 font-bold transition hover:opacity-90 hover:scale-[1.02]"
                                style={{ backgroundColor: 'var(--theme-button)', color: 'var(--theme-heading)' }}
                            >
                                Proceed to Checkout
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Cart;
