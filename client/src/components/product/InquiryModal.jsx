import React, { useState } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { submitInquiry } from "../../services/api";

const InquiryModal = ({ isOpen, onClose, product }) => {
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        companyName: "",
        quantity: "",
        message: "",
    });

    const [status, setStatus] = useState("idle");

    if (!isOpen || !product) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            await submitInquiry({
                name: formData.customerName,
                email: formData.email,
                phone: formData.phone,
                company: formData.companyName,
                quantity: formData.quantity,
                message: formData.message,
                productId: product._id || product.id || null,
                product: product.sku ? `${product.title || product.name} (SKU: ${product.sku})` : (product.title || product.name),
            });
            setStatus("success");
        } catch (error) {
            console.error("Inquiry submission failed:", error);
            setStatus("error");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-[#101B2D] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-fadeUp relative p-8">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-white"
                >
                    <FiX size={24} />
                </button>

                {status === "success" ? (
                    <div className="text-center py-10 flex flex-col items-center">
                        <FiCheckCircle size={64} className="text-green-500 mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Thank you!</h2>
                        <p className="text-slate-400">
                            Your inquiry has been submitted successfully. Our team will contact you shortly.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-8 bg-sky-500 hover:bg-sky-600 text-white font-medium px-8 py-3 rounded-xl transition"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white">Inquire for Price</h2>
                            <p className="text-slate-400 mt-2 text-sm">
                                Fill out the form below to get a custom quote for <span className="font-semibold text-sky-400">{product.title || product.name}</span>.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Customer Name *</label>
                                    <input required type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white hover:border-sky-500 focus:border-sky-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Email *</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white hover:border-sky-500 focus:border-sky-500 focus:outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Phone Number *</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white hover:border-sky-500 focus:border-sky-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Company Name</label>
                                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white hover:border-sky-500 focus:border-sky-500 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Quantity Required</label>
                                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white hover:border-sky-500 focus:border-sky-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white hover:border-sky-500 focus:border-sky-500 focus:outline-none resize-none"></textarea>
                            </div>

                            {status === "error" && <p className="text-red-400 text-sm">Failed to send inquiry. Please try again.</p>}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full mt-4 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white font-bold h-12 rounded-xl transition flex items-center justify-center"
                            >
                                {status === "loading" ? "Sending..." : "Send Inquiry"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default InquiryModal;
