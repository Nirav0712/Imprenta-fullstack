import { useEffect } from "react";
import { FiX, FiMail, FiPhone, FiInfo, FiBox, FiClock, FiFileText } from "react-icons/fi";
import { format } from "date-fns";

const InquiryDetailsModal = ({ inquiry, onClose, onUpdateStatus, loadingStatus }) => {
    useEffect(() => {
        // Add escape key listener
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!inquiry) return null;

    const statuses = ["New", "Contacted", "In Progress", "Completed", "Cancelled"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            {/* Click outside to close (Optional, handled below by stopping propagation on modal) */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            ></div>

            <div
                className="relative flex flex-col bg-[#0A1220] border border-white/10 w-full max-w-[800px] max-h-[90vh] rounded-[24px] shadow-2xl overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-shrink-0 px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0C1626]">
                    <div>
                        <h2 className="text-xl font-bold text-white">Inquiry Details</h2>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-400 font-medium">
                            <span>{inquiry.product}</span>
                            {inquiry.productId?.sku && (
                                <>
                                    <span>•</span>
                                    <span>{inquiry.productId.sku}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition"
                        aria-label="Close modal"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-[#08111f]">

                    {/* Section 1: Customer Information */}
                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FiInfo size={16} /> Customer Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Name</p>
                                <p className="text-sm text-white font-medium">{inquiry.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Company</p>
                                <p className="text-sm text-white font-medium">{inquiry.company || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Email</p>
                                <a
                                    href={`mailto:${inquiry.email}`}
                                    className="text-sm text-sky-400 hover:text-sky-300 font-medium break-all flex items-center gap-2"
                                >
                                    <FiMail size={14} /> {inquiry.email || "N/A"}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Phone</p>
                                <a
                                    href={`tel:${inquiry.phone}`}
                                    className="text-sm text-sky-400 hover:text-sky-300 font-medium flex items-center gap-2"
                                >
                                    <FiPhone size={14} /> {inquiry.phone || "N/A"}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Company</p>
                                <p className="text-sm text-white">{inquiry.company}</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Product Information */}
                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FiBox size={16} /> Product Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Product</p>
                                <p className="text-sm text-white font-medium">
                                    {inquiry.productId ? inquiry.productId.name : inquiry.product}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">SKU</p>
                                <p className="text-sm text-white font-medium">{inquiry.productId?.sku || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Category</p>
                                <p className="text-sm text-white font-medium">{inquiry.productId?.category?.name || "N/A"}</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Requirements */}
                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FiFileText size={16} /> Order / Requirement
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Quantity Required</p>
                                <p className="text-sm text-white font-medium">{inquiry.quantity || "Not specified"}</p>
                            </div>
                            {/* Optional extended fields if present */}
                            {(inquiry.material || inquiry.finish || inquiry.size || inquiry.lamination || inquiry.foil || inquiry.designOption) && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4 border-b border-white/5">
                                    {inquiry.sku && <div>
                                        <p className="text-xs text-slate-500 font-semibold mb-1">SKU</p>
                                        <p className="text-sm text-white">{inquiry.sku}</p>
                                    </div>}
                                    {inquiry.size && <div>
                                        <p className="text-xs text-slate-500 font-semibold mb-1">Size</p>
                                        <p className="text-sm text-white">{inquiry.size}</p>
                                    </div>}
                                    {inquiry.material && <div>
                                        <p className="text-xs text-slate-500 font-semibold mb-1">Material</p>
                                        <p className="text-sm text-white">{inquiry.material}</p>
                                    </div>}
                                    {inquiry.lamination && <div>
                                        <p className="text-xs text-slate-500 font-semibold mb-1">Lamination/Finish</p>
                                        <p className="text-sm text-white">{inquiry.lamination}</p>
                                    </div>}
                                    {inquiry.foil && <div>
                                        <p className="text-xs text-slate-500 font-semibold mb-1">Foil</p>
                                        <p className="text-sm text-white">{inquiry.foil}</p>
                                    </div>}
                                    {inquiry.designOption && <div>
                                        <p className="text-xs text-slate-500 font-semibold mb-1">Design Need</p>
                                        <p className="text-sm text-white">{inquiry.designOption}</p>
                                    </div>}
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-2">Message / Specifications</p>
                                <div className="text-sm text-slate-300 font-medium whitespace-pre-wrap leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 custom-scrollbar max-h-40 overflow-y-auto">
                                    {inquiry.message || "No additional message provided."}
                                    {inquiry.additionalRequirements && (
                                        <>
                                            <hr className="my-2 border-white/5" />
                                            <span className="text-slate-400">Additional Req:</span><br />
                                            {inquiry.additionalRequirements}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Metadata */}
                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FiClock size={16} /> Inquiry Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Inquiry ID</p>
                                <p className="text-sm text-white font-mono break-all">{inquiry._id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Submitted Date</p>
                                <p className="text-sm text-white font-medium">
                                    {format(new Date(inquiry.createdAt), "dd MMM yyyy, h:mm a")}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold mb-1">Status</p>
                                <select
                                    value={inquiry.status || "New"}
                                    onChange={(e) => onUpdateStatus(inquiry._id, e.target.value)}
                                    disabled={loadingStatus === inquiry._id}
                                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-sm font-semibold text-white outline-none focus:border-sky-500 w-full max-w-[150px] cursor-pointer"
                                >
                                    {statuses.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="flex-shrink-0 p-4 border-t border-white/10 bg-[#0C1626] flex items-center justify-end gap-3">
                    {inquiry.status !== "Contacted" && inquiry.status !== "Completed" && (
                        <button
                            onClick={() => onUpdateStatus(inquiry._id, "Contacted")}
                            disabled={loadingStatus === inquiry._id}
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 transition shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                        >
                            {loadingStatus === inquiry._id ? "Updating..." : "Mark as Contacted"}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}

export default InquiryDetailsModal;
