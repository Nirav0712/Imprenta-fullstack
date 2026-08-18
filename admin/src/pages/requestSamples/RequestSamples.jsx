import { useState, useEffect, useMemo } from "react";
import { FiTrash2, FiSearch, FiEye, FiX } from "react-icons/fi";
import { inquiryService } from "../../services/inquiryService";
import DeleteModal from "../../components/common/modal/DeleteModal";

const RequestSamples = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const res = await inquiryService.getInquiries();
            if (res?.data) setInquiries(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await inquiryService.updateInquiryStatus(id, status);
            fetchInquiries();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!selectedInquiry) return;
        try {
            await inquiryService.deleteInquiry(selectedInquiry._id);
            setDeleteOpen(false);
            fetchInquiries();
        } catch (error) {
            alert("Failed to delete request");
        }
    };

    const filteredInquiries = useMemo(() => {
        return inquiries.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [inquiries, search]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Sample Requests</h1>
                    <p className="mt-2 text-slate-400">Manage incoming product sample and quote requests.</p>
                </div>
            </div>

            <div className="flex items-center rounded-2xl border border-white/10 bg-[#101B2D] p-4">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 focus-within:border-sky-500 transition">
                    <FiSearch className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by Name or Email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#101B2D]">
                {/* Desktop view */}
                <div className="hidden lg:block overflow-x-auto w-full">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="border-b border-white/10 bg-[#08111F]/50">
                            <tr className="text-left text-sm font-semibold text-slate-400">
                                <th className="px-6 py-5 whitespace-nowrap">Customer</th>
                                <th className="px-6 py-5 whitespace-nowrap">Product/Subject</th>
                                <th className="px-6 py-5 whitespace-nowrap max-w-sm">Message</th>
                                <th className="px-6 py-5 whitespace-nowrap">Date</th>
                                <th className="px-6 py-5 whitespace-nowrap">Status</th>
                                <th className="px-6 py-5 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <tr><td colSpan={6} className="py-16 text-center text-slate-500">Loading requests...</td></tr>}
                            {!loading && filteredInquiries.length === 0 && <tr><td colSpan={6} className="py-16 text-center text-slate-500">No requests found.</td></tr>}
                            {!loading && filteredInquiries.map((inq) => (
                                <tr key={inq._id} className="border-b border-white/5 hover:bg-white/5 transition text-sm">
                                    <td className="px-6 py-5 text-slate-300">
                                        <div className="font-semibold text-white">{inq.name}</div>
                                        <div className="text-xs text-slate-500">{inq.email}</div>
                                        <div className="text-xs text-slate-500">{inq.phone}</div>
                                    </td>
                                    <td className="px-6 py-5 font-semibold text-sky-400">{inq.product || "General Query"}</td>
                                    <td className="px-6 py-5 text-slate-400 max-w-xs truncate">{inq.message}</td>
                                    <td className="px-6 py-5 text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={inq.status}
                                            onChange={(e) => updateStatus(inq._id, e.target.value)}
                                            className={`rounded-full px-3 py-1 font-semibold outline-none ${inq.status === "New" ? "bg-sky-500/20 text-sky-500" :
                                                inq.status === "Completed" ? "bg-green-500/20 text-green-500" :
                                                    "bg-yellow-500/20 text-yellow-500"
                                                }`}
                                        >
                                            <option value="New" className="bg-[#101B2D]">New</option>
                                            <option value="Contacted" className="bg-[#101B2D]">Contacted</option>
                                            <option value="In Progress" className="bg-[#101B2D]">In Progress</option>
                                            <option value="Completed" className="bg-[#101B2D]">Completed</option>
                                            <option value="Cancelled" className="bg-[#101B2D]">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex gap-2">
                                            <button onClick={() => { setSelectedInquiry(inq); setViewOpen(true); }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 transition hover:bg-sky-500 hover:text-white">
                                                <FiEye size={18} />
                                            </button>
                                            <button onClick={() => { setSelectedInquiry(inq); setDeleteOpen(true); }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white">
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards View */}
                <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
                    {loading && <div className="py-10 text-center text-slate-500">Loading requests...</div>}
                    {!loading && filteredInquiries.length === 0 && <div className="py-10 text-center text-slate-500">No requests found.</div>}
                    {!loading && filteredInquiries.map((inq) => (
                        <div key={inq._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
                            <div className="mb-3 flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500">Customer</p>
                                    <p className="font-bold text-white whitespace-normal">{inq.name}</p>
                                    <p className="text-sm text-slate-300 break-all">{inq.email}</p>
                                    <p className="text-sm text-slate-300">{inq.phone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-slate-500">Date</p>
                                    <p className="text-sm text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="text-xs font-semibold text-slate-500">Product/Subject</p>
                                <p className="font-bold text-sky-400 whitespace-normal">{inq.product || "General Query"}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-xs font-semibold text-slate-500">Message</p>
                                <p className="text-sm text-slate-300 whitespace-pre-wrap break-words border border-white/5 bg-black/20 p-3 rounded-xl mt-1">{inq.message || "-"}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                <div className="flex-1 mr-4">
                                    <select
                                        value={inq.status}
                                        onChange={(e) => updateStatus(inq._id, e.target.value)}
                                        className={`w-full rounded-full px-3 py-2 text-xs font-semibold outline-none ${inq.status === "New" ? "bg-sky-500/20 text-sky-500" :
                                            inq.status === "Completed" ? "bg-green-500/20 text-green-500" :
                                                "bg-yellow-500/20 text-yellow-500"
                                            }`}
                                    >
                                        <option value="New" className="bg-[#101B2D]">New</option>
                                        <option value="Contacted" className="bg-[#101B2D]">Contacted</option>
                                        <option value="In Progress" className="bg-[#101B2D]">In Progress</option>
                                        <option value="Completed" className="bg-[#101B2D]">Completed</option>
                                        <option value="Cancelled" className="bg-[#101B2D]">Cancelled</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => { setSelectedInquiry(inq); setViewOpen(true); }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-sky-400 transition hover:bg-sky-500 hover:text-white">
                                        <FiEye size={16} />
                                    </button>
                                    <button onClick={() => { setSelectedInquiry(inq); setDeleteOpen(true); }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-red-500 transition hover:bg-red-500 hover:text-white">
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DeleteModal
                isOpen={deleteOpen}
                title="Delete Request"
                message={`Are you sure you want to delete the request from "${selectedInquiry?.name}"?`}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />

            {/* View Details Modal */}
            {
                viewOpen && selectedInquiry && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/10 bg-[#0B1423] shadow-2xl">
                            <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
                                <h3 className="text-2xl font-black text-white">Request Details</h3>
                                <button onClick={() => setViewOpen(false)} className="rounded-xl bg-white/5 p-3 text-slate-400 hover:bg-white/10 hover:text-white transition">
                                    <FiX size={20} />
                                </button>
                            </div>
                            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-sky-400 border-b border-white/10 pb-2">Customer Info</h4>
                                        <div className="text-sm">
                                            <p className="text-slate-400 mb-1">Name: <span className="text-white ml-2">{selectedInquiry.name}</span></p>
                                            <p className="text-slate-400 mb-1">Company: <span className="text-white ml-2">{selectedInquiry.company || "N/A"}</span></p>
                                            <p className="text-slate-400 mb-1">Email: <span className="text-white ml-2">{selectedInquiry.email}</span></p>
                                            <p className="text-slate-400 mb-1">Phone: <span className="text-white ml-2">{selectedInquiry.phone || "N/A"}</span></p>
                                            <p className="text-slate-400 mb-1">GST: <span className="text-white ml-2">{selectedInquiry.gst || "N/A"}</span></p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-sky-400 border-b border-white/10 pb-2">Specifications</h4>
                                        <div className="text-sm">
                                            <p className="text-slate-400 mb-1">Product: <span className="text-white ml-2 font-semibold">{selectedInquiry.product}</span></p>
                                            <p className="text-slate-400 mb-1">Quantity: <span className="text-white ml-2">{selectedInquiry.quantity || "N/A"}</span></p>
                                            <p className="text-slate-400 mb-1">Material: <span className="text-white ml-2">{selectedInquiry.material || "N/A"}</span></p>
                                            <p className="text-slate-400 mb-1">Finish: <span className="text-white ml-2">{selectedInquiry.finish || "N/A"}</span></p>
                                            <p className="text-slate-400 mb-1">Printing: <span className="text-white ml-2">{selectedInquiry.printing || "N/A"}</span></p>
                                            <p className="text-slate-400 mb-1">Size: <span className="text-white ml-2">{selectedInquiry.size || "N/A"}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-sky-400 border-b border-white/10 pb-2">Address & Notes</h4>
                                    <div className="text-sm">
                                        <p className="text-slate-400 mb-2">City/State: <span className="text-white ml-2">{selectedInquiry.city || "N/A"}, {selectedInquiry.state || "N/A"}</span></p>
                                        <p className="text-slate-400 mb-4">Address: <span className="text-white ml-2 block mt-1 bg-white/5 p-3 rounded-xl">{selectedInquiry.address || "N/A"}</span></p>
                                        <p className="text-slate-400">Notes / Message: <span className="text-white ml-2 block mt-1 bg-white/5 p-3 rounded-xl whitespace-pre-wrap">{selectedInquiry.message || "No notes provided."}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default RequestSamples;
