import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import api from "../../services/api";

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        companyName: "",
        address: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",
        gstNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [orderInfo, setOrderInfo] = useState(null);

    const subtotal = getCartTotal();
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        try {
            setLoading(true);
            setError(null);

            const payload = {
                ...formData,
                items: cartItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: Number(item.quantity)
                }))
            };

            const response = await api.post("/orders", payload);

            if (response.data && response.data.success) {
                setOrderInfo(response.data.data);
                setSuccess(true);
                clearCart();
            } else {
                throw new Error(response.data.message || "Failed to create order");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (success && orderInfo) {
        return (
            <section className="min-h-screen py-24 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <FiCheckCircle size={40} className="text-green-400" />
                </div>
                <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--theme-heading)' }}>Order Submitted!</h1>
                <p className="text-slate-300 mb-8 max-w-lg">
                    Thank you for your order. Your order ID is <span className="font-bold text-sky-400">{orderInfo.orderId}</span>.
                    Our team will review your order format shortly.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 w-full max-w-lg mb-10 text-left backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--theme-heading)' }}>Order Summary</h3>
                    <ul className="space-y-3 mb-6 pb-6 border-b border-white/10 text-sm text-slate-300">
                        <li className="flex justify-between"><span>Date:</span> <span className="text-white">{new Date(orderInfo.createdAt).toLocaleDateString()}</span></li>
                        <li className="flex justify-between"><span>Total Amount:</span> <span className="font-bold" style={{ color: 'var(--theme-accent)' }}>₹{(orderInfo.totalAmount * 1.18).toLocaleString()}</span></li>
                    </ul>
                    <p className="text-sm text-slate-400 text-center">Our team will process your order shortly and contact you regarding shipping and delivery.</p>
                </div>
                <Link to="/products" className="rounded-xl px-8 py-4 font-semibold shadow-lg transition-all hover:opacity-90 hover:scale-[1.02]" style={{ backgroundColor: 'var(--theme-button)', color: 'var(--theme-heading)' }}>
                    Continue Shopping
                </Link>
            </section>
        );
    }

    if (cartItems.length === 0 && !success) {
        return (
            <section className="min-h-screen py-24 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-heading)' }}>Cart is Empty</h2>
                    <button onClick={() => navigate('/cart')} className="text-sky-400 hover:text-sky-300">Go back</button>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-24">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-10" style={{ color: 'var(--theme-heading)' }}>Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form id="checkout-form" onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl space-y-6" style={{ backgroundColor: 'var(--theme-surface)' }}>

                            <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--theme-heading)' }}>Billing Details</h2>

                            {error && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
                                    {error}
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Full Name *</label>
                                    <input required name="customerName" value={formData.customerName} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Company Name</label>
                                    <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address *</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number *</label>
                                    <input required name="phone" value={formData.phone} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Street Address *</label>
                                <input required name="address" value={formData.address} onChange={handleChange} type="text" className="w-full mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" placeholder="House number and street name" />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Town / City *</label>
                                    <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">State *</label>
                                    <input required name="state" value={formData.state} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Country / Region *</label>
                                    <input required name="country" value={formData.country} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Postal Code *</label>
                                    <input required name="postalCode" value={formData.postalCode} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">GST Number (Optional)</label>
                                <input name="gstNumber" value={formData.gstNumber} onChange={handleChange} type="text" className="w-full mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-sky-400 transition" placeholder="GSTIN..." />
                            </div>

                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-3xl border border-white/10 p-6 lg:p-8 sticky top-32" style={{ backgroundColor: 'var(--theme-surface)' }}>
                            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--theme-heading)' }}>Your Order</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                                {cartItems.map(item => (
                                    <div key={item.productId} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-300 pr-4">{item.name} <span className="text-slate-500">x {item.quantity}</span></span>
                                        <span className="font-semibold text-white shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 text-slate-300">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>GST (18%)</span>
                                    <span>₹{tax.toLocaleString()}</span>
                                </div>

                                <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-xl font-bold" style={{ color: 'var(--theme-heading)' }}>Total</span>
                                    <span className="text-2xl font-black" style={{ color: 'var(--theme-accent)' }}>
                                        ₹{total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-sm text-slate-400 mb-6">Payment processing will begin after order confirmation. We will contact you regarding next steps.</p>
                                <button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl py-4 font-bold transition hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
                                    style={{ backgroundColor: 'var(--theme-button)', color: 'var(--theme-heading)' }}
                                >
                                    {loading ? "Processing..." : "Place Order"}
                                    {!loading && <FiArrowRight />}
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Checkout;
