import { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import { FiMessageCircle, FiTrash2, FiEye, FiCheck, FiX } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import InquiryDetailsModal from "./InquiryDetailsModal";

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/inquiries");
            if (res.data.success) {
                setInquiries(res.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            setLoadingStatus(id);
            const res = await axiosInstance.put(`/inquiries/${id}`, { status });
            if (res.data.success) {
                setInquiries((prev) =>
                    prev.map((item) => (item._id === id ? { ...item, status } : item))
                );
                if (selectedInquiry && selectedInquiry._id === id) {
                    setSelectedInquiry(prev => ({ ...prev, status }));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingStatus(null);
        }
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
        try {
            const res = await axiosInstance.delete(`/inquiries/${id}`);
            if (res.data.success) {
                setInquiries((prev) => prev.filter((item) => item._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-white">Product Inquiries</h1>
                <p className="mt-1 text-slate-400">Manage all price inquiries from customers.</p>
            </div>

            <div className="bg-[#101B2D] border border-white/10 rounded-[24px] overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-slate-400">Loading inquiries...</div>
                ) : inquiries.length === 0 ? (
                    <div className="p-10 text-center text-slate-400">No inquiries found.</div>
                ) : (
                    <>
                        {/* Desktop View */}
                        <div className="hidden lg:block overflow-x-auto w-full">
                            <table className="w-full text-left text-sm text-slate-400 whitespace-nowrap">
                                <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Customer</th>
                                        <th className="px-6 py-4 font-semibold">Contact</th>
                                        <th className="px-6 py-4 font-semibold">Product</th>
                                        <th className="px-6 py-4 font-semibold">Message</th>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {inquiries.map((inq) => (
                                        <tr
                                            key={inq._id}
                                            className="hover:bg-white/5 transition-colors cursor-pointer group"
                                            onClick={() => setSelectedInquiry(inq)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-white">{inq.name}</div>
                                                {inq.company && <div className="text-xs text-slate-500">{inq.company}</div>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>{inq.email}</div>
                                                {inq.phone && <div>{inq.phone}</div>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sky-400 font-medium group-hover:underline">
                                                    {inq.productId ? inq.productId.name : inq.product}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate text-slate-300" title={inq.message}>
                                                {inq.message || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-semibold">
                                                {formatDistanceToNow(new Date(inq.createdAt), { addSuffix: true })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 text-xs font-bold rounded-full border ${inq.status === "Completed"
                                                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                        : inq.status === "In Progress" || inq.status === "Contacted"
                                                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                            : inq.status === "Cancelled"
                                                                ? "bg-red-500/10 text-red-500 border-red-500/20"
                                                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                                        }`}
                                                >
                                                    {inq.status || "New"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 flex items-center justify-end gap-3 text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedInquiry(inq);
                                                    }}
                                                    className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition"
                                                    title="View Details"
                                                >
                                                    <FiEye size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteInquiry(inq._id);
                                                    }}
                                                    className="p-2 bg-red-400/5 text-red-400 hover:bg-red-400/20 rounded-xl transition"
                                                    title="Delete Inquiry"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
                        <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
                            {inquiries.map((inq) => (
                                <div key={inq._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 mr-4">
                                            <p className="text-xs font-semibold text-slate-500 mb-1">Customer</p>
                                            <p className="font-bold text-white whitespace-normal break-words">{inq.name}</p>
                                            <p className="text-sm text-slate-400 break-all">{inq.email}</p>
                                            {inq.phone && <p className="text-sm text-slate-400">{inq.phone}</p>}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs font-semibold text-slate-500 mb-1">Date</p>
                                            <p className="text-sm text-slate-300">{formatDistanceToNow(new Date(inq.createdAt), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-slate-500 mb-1">Product</p>
                                        <p className="font-bold text-sky-400 whitespace-normal break-words">{inq.productId ? inq.productId.name : inq.product}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-slate-500 mb-1">Message</p>
                                        <div className="text-sm text-slate-300 whitespace-pre-wrap break-words border border-white/5 bg-black/20 p-3 rounded-xl mt-1">
                                            {inq.message || "-"}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                        <div className="flex-1 shrink-0">
                                            <span
                                                className={`px-3 py-1 text-xs font-bold rounded-full border inline-block ${inq.status === "Completed"
                                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                    : inq.status === "In Progress" || inq.status === "Contacted"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                        : inq.status === "Cancelled"
                                                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                                                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                                    }`}
                                            >
                                                {inq.status || "New"}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setSelectedInquiry(inq)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sky-400 transition hover:bg-sky-500 hover:text-white">
                                                <FiEye size={16} />
                                            </button>
                                            <button onClick={() => deleteInquiry(inq._id)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-red-500 transition hover:bg-red-500 hover:text-white">
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <InquiryDetailsModal
                inquiry={selectedInquiry}
                onClose={() => setSelectedInquiry(null)}
                onUpdateStatus={updateStatus}
                loadingStatus={loadingStatus}
            />
        </div >
    );
};

export default Inquiries;
